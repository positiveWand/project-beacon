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
    #infowindows;

    #center;
    #eventListeners;

    #beacons;
    #visibleBeacons;

    constructor() {
        this.#markers = [];
        this.#infowindows = [];
        this.#center = {
            lat: -1,
            lng: -1,
        };
        this.#eventListeners = [];

        this.#beacons = [];
        this.#visibleBeacons = [];
    }

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
    }
    destory() {
        this.#map.destroy();
        this.#map = null;
    }

    removeAllMarkers() {
        for(const aMarker of this.#markers) {
            aMarker.marker.setMap(null);
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

            this.#markers.push({id: aBeacon.id, marker: aMarker});

            let contentObject = MapStore.toContentObject(aBeacon);

            let contentString = renderToStaticMarkup((
                <InformationWindow info={contentObject}/>
            ));

            let aInfoWindow = new naver.maps.InfoWindow({
                content: contentString,
            });

            this.#infowindows.push({id: aBeacon.id, infowindow: aInfoWindow});

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

        this.triggerEvent("update", {});
    }

    moveAndZoomTo(coord, zoom) {
        const location = new naver.maps.LatLng(coord.lat, coord.lng);
        this.#map.morph(location, zoom);
    }

    closeAllInfowindow() {
        this.#infowindows.map(aPair => {
            aPair.infowindow.close();
        });
    }

    showInfowindow(id) {
        this.closeAllInfowindow();
        const targetMarker = this.#markers.find(aPair => {
            return aPair.id == id;
        });
        const targetInfowindow = this.#infowindows.find(aPair => {
            return aPair.id == id;
        });
        targetInfowindow.infowindow.open(this.#map, targetMarker.marker);
        let targetElement = document.querySelector("div.infowindow header a");
        targetElement.addEventListener("click", () => {
            console.log("info window close button clicked");
            targetInfowindow.infowindow.close();
        });

        targetElement = document.querySelector("div.infowindow > button");
        targetElement.addEventListener("click", () => {
            console.log("info window detail button clicked");
        });
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
    setVisibleBeacons(newBeacons) {
        this.#visibleBeacons = [...newBeacons];
        this.updateMap();
    }
    resetVisibleBeacons() {
        this.#visibleBeacons = [...this.#beacons];
        this.updateMap();
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