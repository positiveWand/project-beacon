import { BeaconState, BeaconModel, MapEvent, MapEventObject, MapEventHandler, MapEventListener, Coordinate, Session } from './UtilType.ts'
import { DETAIL_PAGE_URL } from '../../route.ts';
import { renderToStaticMarkup } from 'react-dom/server';
import GRAY_MARKER_IMG from '/src/assets/searchpage/marker_gray.png'
import BLUE_MARKER_IMG from '/src/assets/searchpage/marker_blue.png'
import GREEN_MARKER_IMG from '/src/assets/searchpage/marker_green.png'
import YELLOW_MARKER_IMG from '/src/assets/searchpage/marker_yellow.png'
import RED_MARKER_IMG from '/src/assets/searchpage/marker_red.png'
import InformationWindow from '../InformationWindow.tsx';

type BeaconFilter = (aBeacon: BeaconModel) => boolean

class MapStore {
    #map: naver.maps.Map | undefined;
    #beacons: BeaconModel[];
    #visibleBeacons: BeaconModel[];
    #favorites: string[];
    #markers: Map<string, naver.maps.Marker>;
    #infoWindows: Map<string, naver.maps.InfoWindow>;

    #unionFilters: Map<string, BeaconFilter>;
    #intersectionFilters: Map<string, BeaconFilter>;

    #session: Session;
    #eventListeners: MapEventListener[];

    constructor() {
        this.#beacons = [];
        this.#visibleBeacons = [];
        this.#favorites = [];
        this.#markers = new Map();
        this.#infoWindows = new Map();

        this.#unionFilters = new Map();
        this.#intersectionFilters = new Map();

        this.#session = null;
        this.#eventListeners = [];
    }

    init() {
        let defaultCenter = new naver.maps.LatLng(33.3804067, 126.5582004)
        const options = {
            center: defaultCenter,
            zoom: 10,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        }
        this.#map = new naver.maps.Map('map', options)

        this.initFilters()
    }

    destroy() {
        if(!this.#map) {
            return false
        }
        this.#map.destroy()
        this.#map = undefined
        return true
    }

    getBeacons() {
        return JSON.parse(JSON.stringify(this.#beacons));
    }

    setBeacons(newBeacons: BeaconModel[]) {
        this.#beacons = [...newBeacons];
        this.update(this.filteredBeacons());
    }

    getVisibleBeacons() {
        return this.#visibleBeacons
    }

    setFavorites(newFavorites: string[]) {
        this.#favorites = [...newFavorites];
    }

    setSession(newSession: Session) {
        this.#session = newSession;
    }
    resetSession() {
        this.#session = null;
    }

    update(beacons: BeaconModel[]) {
        this.#visibleBeacons = beacons;
        console.log(this.#visibleBeacons)

        for(let aBeacon of this.#visibleBeacons) {
            console.log(aBeacon)
            if(this.#markers.get(aBeacon.id)) {
                continue
            }

            let img_url:string
            switch (aBeacon.state) {
                case 'high':
                    img_url = RED_MARKER_IMG
                    break;
                case 'medium':
                    img_url = YELLOW_MARKER_IMG
                    break;
                case 'low':
                    img_url = GREEN_MARKER_IMG
                    break;
                default:
                    img_url = GRAY_MARKER_IMG
                    break;
            }

            let aMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(aBeacon.coordinate.lat, aBeacon.coordinate.lng),
                map: this.#map,
                icon: {
                    url: img_url,
                    scaledSize: new naver.maps.Size(50,50)
                }
            })

            this.#markers.set(aBeacon.id, aMarker)

            naver.maps.Event.addListener(aMarker, 'click', () => {
                this.showInfowindow(aBeacon.id)
            })
        }

        this.#markers.forEach((aMarker, id) => {
            if(!this.#visibleBeacons.find(aBeacon => aBeacon.id == id)) {
                if(!aMarker) {
                    return
                }
                aMarker.setMap(null);
                this.#markers.delete(id)
            }
        })
        console.log(this.#markers)

        this.#triggerEvent("update", {name: 'update', target: {}});
    }

    moveAndZoomTo(coord: Coordinate, zoom: number) {
        const location = new naver.maps.LatLng(coord.lat, coord.lng);
        this.#map!.morph(location, zoom);
    }

    closeAllInfowindow() {
        for (const aInfowindow of this.#infoWindows.values()) {
            if(!aInfowindow) {
                continue;
            }
            aInfowindow.close();
        }
    }

    async showInfowindow(id: string) {
        this.closeAllInfowindow();
        let aInfoWindow;
        console.log('session',this.#session)
        if(this.#session) {
            console.log('logged in')
            let isFavorite = await fetch('/beacon/favorites?id='+id, {
                method: 'GET',
                credentials: "include",
            })
            .then(result => {
                return result.text();
            })
            .then(result => {
                console.log("favorites: " +  result)
                if(result == 'true') {
                    return true;
                } else {
                    return false;
                }
            })
            aInfoWindow = new naver.maps.InfoWindow({
                content: renderToStaticMarkup(
                    <InformationWindow model={this.#beacons.find(element => element.id == id)} isFavorite={isFavorite}/>
                ),
                borderWidth: 0,
                backgroundColor: 'transparent',
            });
        } else {
            aInfoWindow = new naver.maps.InfoWindow({
                content: renderToStaticMarkup(
                    <InformationWindow model={this.#beacons.find(element => element.id == id)}/>
                ),
                borderWidth: 0,
                backgroundColor: 'transparent',
            });
        }

        this.#infoWindows.set(id, aInfoWindow)

        const targetMarker = this.#markers.get(id);
        const targetInfowindow = this.#infoWindows.get(id);
        targetInfowindow!.open(this.#map!, targetMarker);

        if(this.#session) {
            let filledStar = document.querySelector('div.infowindow a.star-filled') as HTMLElement;
            let unfilledStar = document.querySelector('div.infowindow a.star-unfilled') as HTMLElement;
            filledStar.addEventListener('click', () => {
                // 즐겨찾기 삭제
                fetch('/beacon/favorites', {
                    method: 'DELETE',
                    body: JSON.stringify({beacon_id: id}),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => {
                    return result.text();
                })
                .then(result => {
                    console.log(result)
                    if(result == 'true') {
                        alert('즐겨찾기 삭제 성공!!')
                        this.#favorites = this.#favorites.filter(element => element != id)
                        unfilledStar.hidden = false;
                        filledStar.hidden = true;
                    } else {
                        alert('즐겨찾기 삭제 실패!!')
                    }
                })
                // alert('즐겨찾기 삭제 성공!!')
                // this.#favorites = this.#favorites.filter(element => element != id)
                // unfilledStar.hidden = false;
                // filledStar.hidden = true;
            });
            unfilledStar.addEventListener('click', () => {
                // 즐겨찾기 추가
                fetch('/beacon/favorites', {
                    method: 'POST',
                    body: JSON.stringify({beacon_id: id}),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => {
                    return result.text();
                })
                .then(result => {
                    console.log(result)
                    if(result == 'true') {
                        alert('즐겨찾기 추가 성공!!')
                        this.#favorites = [...this.#favorites, id]
                        unfilledStar.hidden = true;
                        filledStar.hidden = false;
                    } else {
                        alert('즐겨찾기 추가 실패!!')
                    }
                })
                // alert('즐겨찾기 추가 성공!!')
                // this.#favorites = [...this.#favorites, id]
                // unfilledStar.hidden = true;
                // filledStar.hidden = false;
            });
        }

        let closeButton = document.querySelector("div.infowindow a.close-button");
        closeButton!.addEventListener("click", () => {
            console.log("info window close button clicked");
            targetInfowindow!.close();
        });

        let detailButton = document.querySelector("div.infowindow > button");
        detailButton!.addEventListener("click", () => {
            console.log("info window detail button clicked");
            console.log(DETAIL_PAGE_URL+"?id=" + id);
            location.href = DETAIL_PAGE_URL+"?id=" + id;
        });
    }

    isFavorite(id: string) {
        console.log(id)
        console.log(this.#favorites.find(element => element == id))
        return this.#favorites.find(element => element == id) != undefined
    }


    addUnionFilter(name: string, newFilter: BeaconFilter) {
        this.#unionFilters.set(name, newFilter)
        this.update(this.filteredBeacons())
    }
    removeUnionFilter(name: string) {
        this.#unionFilters.delete(name)
        this.update(this.filteredBeacons())
    }
    addIntersectionFilter(name: string, newFilter: BeaconFilter) {
        this.#intersectionFilters.set(name, newFilter)
        this.update(this.filteredBeacons())
    }
    removeIntersectionFilter(name: string) {
        this.#intersectionFilters.delete(name)
        this.update(this.filteredBeacons())
    }
    initFilters() {
        this.#unionFilters = new Map()
        this.addUnionFilter('unknown', (aBeacon: BeaconModel) => {
            return aBeacon.state == undefined || aBeacon.state == null;
        })
        this.addUnionFilter('low', (aBeacon: BeaconModel) => {
            return aBeacon.state == 'low';
        })
        this.addUnionFilter('medium', (aBeacon: BeaconModel) => {
            return aBeacon.state == 'medium';
        })
        this.addUnionFilter('high', (aBeacon: BeaconModel) => {
            return aBeacon.state == 'high';
        })
        this.#intersectionFilters = new Map()
        this.update(this.filteredBeacons())
    }

    filteredBeacons() {
        let result: BeaconModel[] = []

        this.#beacons.map((aBeacon: BeaconModel) => {
            let cmp = false

            for(const test of this.#unionFilters.values()) {
                cmp = cmp || test(aBeacon)
            }

            if(cmp) {
                result.push(aBeacon)
            }
        })

        result = result.filter((aBeacon: BeaconModel) => {
            let cmp = true

            for(const test of this.#intersectionFilters.values()) {
                cmp = cmp && test(aBeacon)
            }

            return cmp
        })

        return result
    }


    #triggerEvent(targetEvent: MapEvent, object: MapEventObject) {
        for(let {event, handler} of this.#eventListeners) {
            if(event == targetEvent) {
                handler(object);
            }
        }
    }

    addEventListener(targetEvent: MapEvent, aHandler: MapEventHandler) {
        let newListener: MapEventListener = {
            event: targetEvent,
            handler: aHandler
        }
        this.#eventListeners.push(newListener)

        return newListener
    }

    removeEventListener(targetListener: MapEventListener) {
        this.#eventListeners = this.#eventListeners.filter((l: MapEventListener) => {
            return l !== targetListener
        });
    }
}

export default MapStore