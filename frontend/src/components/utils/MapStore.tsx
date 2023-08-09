import { BeaconState, BeaconModel, MapEvent, MapEventObject, MapEventHandler, MapEventListener, Coordinate } from './UtilType.ts'
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
    #markers: Map<number, naver.maps.Marker>;
    #infoWindows: Map<number, naver.maps.InfoWindow>;

    #unionFilters: Map<string, BeaconFilter>;
    #intersectionFilters: Map<string, BeaconFilter>;

    #eventListeners: MapEventListener[];

    constructor() {
        this.#beacons = [];
        this.#visibleBeacons = [];
        this.#markers = new Map();
        this.#infoWindows = new Map();

        this.#unionFilters = new Map();
        this.#intersectionFilters = new Map();

        this.#eventListeners = [];
    }

    init() {
        let defaultCenter = new naver.maps.LatLng(37.3784357, 126.594079)
        const options = {
            center: defaultCenter,
            zoom: 12,
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

    update(beacons: BeaconModel[]) {
        this.#visibleBeacons = beacons;
        console.log(this.#visibleBeacons)

        for(let aBeacon of this.#visibleBeacons) {
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
                case undefined:
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

            let aInfoWindow = new naver.maps.InfoWindow({
                content: renderToStaticMarkup(
                    <InformationWindow model={aBeacon}/>
                ),
                borderWidth: 0,
                backgroundColor: 'transparent',
            })

            this.#infoWindows.set(aBeacon.id, aInfoWindow)

            naver.maps.Event.addListener(aMarker, 'click', () => {
                if(aInfoWindow.getMap() || !this.#map) {
                    aInfoWindow.close()
                    return
                }
                aInfoWindow.open(this.#map, aMarker)
                let closeButton = document.querySelector('div.infowindow header a');
                closeButton?.addEventListener('click', () => {
                    aInfoWindow.close()
                })

                let detailButton = document.querySelector('div.infowindow > button')
                detailButton?.addEventListener('click', () => {
                    location.href = DETAIL_PAGE_URL+'?id='+aBeacon.id
                })

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
        this.#infoWindows.forEach((aInfoWindow, id) => {
            if (!this.#visibleBeacons.find(aBeacon => { return aBeacon.id == id; })) {
                if(!aInfoWindow) {
                    return;
                }
                aInfoWindow.setMap(null);
                this.#infoWindows.delete(id);
            }
        });

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

    showInfowindow(id: number) {
        this.closeAllInfowindow();
        const targetMarker = this.#markers.get(id);
        const targetInfowindow = this.#infoWindows.get(id);
        targetInfowindow!.open(this.#map!, targetMarker);
        let targetElement = document.querySelector("div.infowindow header a");
        targetElement!.addEventListener("click", () => {
            console.log("info window close button clicked");
            targetInfowindow!.close();
        });

        targetElement = document.querySelector("div.infowindow > button");
        targetElement!.addEventListener("click", () => {
            console.log("info window detail button clicked");
            console.log(DETAIL_PAGE_URL+"?id=" + id);
            location.href = DETAIL_PAGE_URL+"?id=" + id;
        });
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
        this.addUnionFilter('undefined', (aBeacon: BeaconModel) => {
            return aBeacon.state == undefined;
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