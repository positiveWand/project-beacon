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
    #map;
    #markers;

    #center;
    #eventListeners;

    #beacons;
    #visibleBeacons;

    constructor() {
        this.#markers = [];
        this.#center = {
            lat: -1,
            lng: -1,
        };
        this.#eventListeners = [];

        this.#beacons = [];
    }

    removeAllMarkers() {
        for(const aMarker of this.#markers) {
            aMarker.setMap(null);
        }
        this.#markers = [];
    }

    updateMap() {
        const beacons = this.getVisibleBeacons();
        let beacon_color = null;

        this.removeAllMarkers();

        for(let aBeacon of beacons) {
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

            this.#markers.push(aMarker);

            let contentObject = MapStore.toContentObject(aBeacon);

            let contentString = renderToStaticMarkup((
                <InformationWindow info={contentObject}/>
            ));

            let aInfoWindow = new naver.maps.InfoWindow({
                content: contentString,
            });

            naver.maps.Event.addListener(aMarker, 'click', () => {
                console.log(aBeacon);
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
                    });
                }
            });
        }
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

        this.handleEvent("centerchange", {});
    }

    getBeacons() {
        return [...this.#beacons];
    }
    setBeacons(newBeacons) {
        this.#beacons = newBeacons;
    }
    addBeacons(aBeacon) {
        if(!aBeacon) {
            return false;
        }
        this.#beacons.push(aBeacon);
        return true;
    }

    getVisibleBeacons() {
        return [...this.#visibleBeacons];
    }
    setVisibleBeacons(newBeacons) {
        this.#visibleBeacons = newBeacons;
        this.updateMap();
    }
    resetVisibleBeacons() {
        this.#visibleBeacons = [...this.#beacons];
        this.updateMap();
    }

    static toContentObject(aBeacon) {
        return {
            title: aBeacon.name,
            content: {
                lat: aBeacon.coordinate.lat,
                lng: aBeacon.coordinate.lng,
                state: aBeacon.state,
                failure_prob: aBeacon.failure_prob,
            }
        }
    }


    handleEvent(event, object) {
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