import { renderToStaticMarkup } from 'react-dom/server';
import InformationWindow from "./InformationWindow";

const BLUE_MARKER_PATH = "/src/assets/searchPage/marker_blue.png";
const GREEN_MARKER_PATH = "/src/assets/searchPage/marker_green.png";
const YELLOW_MARKER_PATH = "/src/assets/searchPage/marker_yellow.png";
const RED_MARKER_PATH = "/src/assets/searchPage/marker_red.png";
const STATE_THRESHOLD = [70, 30, 0];
const STATE_COLOR = [RED_MARKER_PATH, YELLOW_MARKER_PATH, GREEN_MARKER_PATH];
const { naver } = window;

class MapStore {
    #map; // 지도 객체
    #markers; // 지도 상에 위치한 마커들: 맵
    #infowindows; // 정보창들: 맵

    #beacons; // 비콘 객체들: 배열
    #visibleBeacons; // 지도 상에 출력된 비콘 객체들: 배열

    #unionFilters; // 합집합 필터들: 맵
    #intersectionFilters; // 교집합 필터들: 맵

    #center; // 지도의 중심
    #eventListeners; // 이벤트 리스너들: 배열

    constructor() {
        this.#map = undefined;
        this.#markers = new Map();
        this.#infowindows = new Map();

        this.#beacons = [];
        this.#visibleBeacons = [];

        this.#unionFilters = new Map();
        this.#intersectionFilters = new Map();

        this.#center = {
            lat: -1,
            lng: -1,
        };
        this.#eventListeners = [];
    }

    // 지도 초기화
    initialize() {
        const location = new naver.maps.LatLng(37.3784357, 126.594079);
        const mapOptions = {
            center: location,
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        this.#map = new naver.maps.Map("map", mapOptions);

        naver.maps.Event.addListener(this.#map, "drag", e => {
            this.setCenter({
                lat: this.#map.getCenter().lat(),
                lng: this.#map.getCenter().lng(),
            });
        });

        this.addUnionFilter("low", aBeacon => {
            return aBeacon.state == "low";
        });
        this.addUnionFilter("medium", aBeacon => {
            return aBeacon.state == "medium";
        });
        this.addUnionFilter("high", aBeacon => {
            return aBeacon.state == "high";
        });
    }
    // 지도 삭제
    destory() {
        this.#map.destroy();
        this.#map = undefined;
    }

    removeAllMarkers() {
        for (const aMarker of this.#markers.values()) {
            aMarker.setMap(null);
        }
        this.#markers = new Map();
    }

    closeAllInfowindow() {
        for (const aInfowindow of this.#infowindows.values()) {
            if(!aInfowindow) {
                continue;
            }
            aInfowindow.close();
        }
    }

    showInfowindow(id) {
        this.closeAllInfowindow();
        const targetMarker = this.#markers.get(id);
        const targetInfowindow = this.#infowindows.get(id);
        targetInfowindow.open(this.#map, targetMarker);
        let targetElement = document.querySelector("div.infowindow header a");
        targetElement.addEventListener("click", () => {
            console.log("info window close button clicked");
            targetInfowindow.close();
        });

        targetElement = document.querySelector("div.infowindow > button");
        targetElement.addEventListener("click", () => {
            console.log("info window detail button clicked");
        });
    }

    updateMap(beacons) {
        let beacon_color = null;
        console.log(beacons);
        this.#visibleBeacons = beacons;

        for(let aBeacon of beacons) {
            if(this.#markers.get(aBeacon.id)) {
                continue;
            }

            console.log(aBeacon);

            for(let i = 0; i < STATE_THRESHOLD.length; i++) {
                if(STATE_THRESHOLD[i] <= aBeacon.failure_prob) {
                    beacon_color = STATE_COLOR[i];
                    break;
                }
            }
            let aMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(aBeacon.coordinate.lat, aBeacon.coordinate.lng),
                map: this.#map,
                icon: {
                    url: beacon_color,
                    scaledSize: new naver.maps.Size(50,50),
                }
            });

            this.#markers.set(aBeacon.id, aMarker);

            let contentObject = MapStore.toContentObject(aBeacon);

            let contentString = renderToStaticMarkup((
                <InformationWindow info={contentObject}/>
            ));

            let aInfoWindow = new naver.maps.InfoWindow({
                content: contentString,

                borderWidth: 0,
                backgroundColor: 'transparent',
            });

            this.#infowindows.set(aBeacon.id, aInfoWindow);

            naver.maps.Event.addListener(aMarker, 'click', () => {
                if(aInfoWindow.getMap()) {
                    aInfoWindow.close();
                } else {
                    aInfoWindow.open(this.#map, aMarker);
                    let targetElement = document.querySelector("div.infowindow header a");
                    targetElement.addEventListener("click", () => {
                        console.log("info window close button clicked");
                        aInfoWindow.close();
                    });

                    targetElement = document.querySelector("div.infowindow > button");
                    targetElement.addEventListener("click", () => {
                        console.log("info window detail button clicked");
                        console.log("/src/detailPage/?id="+aBeacon.id);
                        location.href = "/src/detailPage/?id="+aBeacon.id;
                    });
                }
            });
        }

        this.#markers.forEach((aMarker, id) => {
            if (!beacons.find(aBeacon => { return aBeacon.id == id; })) {
                if(!aMarker) {
                    return;
                }
                aMarker.setMap(null);
                this.#markers.delete(id);
            }
        });
        this.#infowindows.forEach((aInfowindow, id) => {
            if (!beacons.find(aBeacon => { return aBeacon.id == id; })) {
                if(!aInfowindow) {
                    return;
                }
                aInfowindow.setMap(null);
                this.#infowindows.delete(id);
            }
        });

        this.triggerEvent("update", {});
    }

    moveAndZoomTo(coord, zoom) {
        const location = new naver.maps.LatLng(coord.lat, coord.lng);
        this.#map.morph(location, zoom);
    }

    addUnionFilter(name, newFilter) {
        this.#unionFilters.set(name, newFilter);
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    deleteUnionFilter(name) {
        this.#unionFilters.delete(name);
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    addIntersectionFilter(name, newFilter) {
        this.#intersectionFilters.set(name, newFilter);
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    deleteIntersectionFilter(name) {
        this.#intersectionFilters.delete(name);
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    clearFilters() {
        this.#unionFilters = new Map();
        this.addUnionFilter("low", aBeacon => {
            return aBeacon.state == "low";
        });
        this.addUnionFilter("medium", aBeacon => {
            return aBeacon.state == "medium";
        });
        this.addUnionFilter("high", aBeacon => {
            return aBeacon.state == "high";
        });
        this.#intersectionFilters = new Map();
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    filteredBeacons(beacons) {
        let filtered = [];

        beacons.map(aBeacon => {
            let result = false;

            for (const test of this.#unionFilters.values()) {
                result = result || test(aBeacon);
            }

            if (result) {
                filtered.push(aBeacon);
            }
        });

        filtered = filtered.filter(aBeacon => {
            let result = true;

            for (const test of this.#intersectionFilters.values()) {
                result = result && test(aBeacon);
            }
            console.log(result);
            return result;
        });

        return filtered;
    }

    setMap(newMap) {
        this.#map = newMap;
    }

    getCenter() {
        return this.#center;
    }
    setCenter(newCenter) {
        if(this.#center.lat == newCenter.lat && this.#center.lng == newCenter.lng) {
            return;
        }

        this.#center = {
            lat: newCenter.lat,
            lng: newCenter.lng,
        }

        this.triggerEvent("centerchange", {});
    }

    getBeacons() {
        return this.#beacons;
    }
    setBeacons(newBeacons) {
        this.#beacons = [...newBeacons];
        this.updateMap(this.filteredBeacons(this.#beacons));
    }
    addBeacons(aBeacon) {
        if(!aBeacon) {
            return false;
        }
        this.#beacons.push(aBeacon);
        return true;
    }

    getVisibleBeacons() {
        return this.#visibleBeacons;
    }

    static toContentObject(aBeacon) {
        return {
            id: aBeacon.id,
            name: aBeacon.name,
            content: {
                lat: aBeacon.coordinate.lat,
                lng: aBeacon.coordinate.lng,
                state: aBeacon.state,
                failure_prob: aBeacon.failure_prob,
            }
        }
    }


    triggerEvent(event, object) {
        for(let {targetEvent, handler} of this.#eventListeners) {
            if(targetEvent == event) {
                handler(object);
            }
        }
    }

    addEventListener(targetEvent, aHandler) {
        let newListener = {
            targetEvent: targetEvent,
            handler: aHandler
        }
        this.#eventListeners.push(newListener)

        return newListener;
    }

    removeEventListener(aListener) {
        this.#eventListeners = this.#eventListeners.filter(l => l !== aListener);
    }
}

export { MapStore };