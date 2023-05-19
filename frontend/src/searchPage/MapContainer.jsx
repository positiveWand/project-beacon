import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const { naver } = window;

function useMapCenter(mapStore) {
    function subscribe(callback) {
        let theListener = mapStore.addEventListener("centerchange", e => {
            callback();
        });
        
        return () => {
            mapStore.removeEventListener(theListener);
        };
    }
    return useSyncExternalStore(
        subscribe,
        () => {
            return mapStore.getCenter();
        },
    )
}

export default function MapContainer({mapStore}) {
    const [loading, setLoading] = useState(false);
    const mapElement = useRef(null);
    const mapObject = useRef(null);
    const mapCoordinate = useMapCenter(mapStore);

    function updateMapScreen() {
        mapStore.updateMap();

        setLoading(false);
    }

    function fetchMapBeacons() {
        // Map Beacons 요청
        setLoading(true);
        setTimeout(() => {
            mapStore.setBeacons([
                {
                    id: 0,
                    name: "abcd",
                    coordinate: {
                        lat: 37.3784357,
                        lng: 126.594079,
                    },
                    state: "low",
                    failure_prob: 20,
                },
                {
                    id: 1,
                    name: "defg",
                    coordinate: {
                        lat: 37.3767306,
                        lng: 126.5805178,
                    },
                    state: "medium",
                    failure_prob: 50,
                },
                {
                    id: 2,
                    name: "ghij",
                    coordinate: {
                        lat: 37.3639067,
                        lng: 126.5882425,
                    },
                    state: "high",
                    failure_prob: 90,
                },
            ]);

            mapStore.setVisibleBeacons(mapStore.getBeacons());

            // Map 화면 갱신
            updateMapScreen();
        }, 2000);
    }

    useEffect(() => {
        const location = new naver.maps.LatLng(37.3784357, 126.594079);
        const mapOptions = {
            center: location,
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        mapObject.current = new naver.maps.Map("map", mapOptions);

        naver.maps.Event.addListener(mapObject.current, "drag", e => {
            mapStore.setCenter({
                lat: mapObject.current.getCenter().lat(),
                lng: mapObject.current.getCenter().lng(),
            });
        });

        mapStore.setMap(mapObject.current);

        fetchMapBeacons();
        return () => {
            mapObject.current.destroy();
            mapObject.current = null;
        }
    }, []);

    let currentLat;
    let currentLng;

    if(mapCoordinate) {
        currentLat = mapCoordinate.lat;
        currentLng = mapCoordinate.lng;
    }

    return (
        <>
            <div>위도:{currentLat}, 경도:{currentLng}, 로딩 중:{loading.toString()}</div>
            <div id="map" ref={mapElement} style={{ minHeight: '600px' }}></div>
        </>
    );
}