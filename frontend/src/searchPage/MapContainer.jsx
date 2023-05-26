import { useEffect, useRef, useState, useSyncExternalStore, useContext } from "react";
import { MapStoreContext } from "./MapStoreContext";

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

export default function MapContainer({loading, setLoading}) {
    const mapStore = useContext(MapStoreContext);
    const mapElement = useRef(null);
    const mapCoordinate = useMapCenter(mapStore);

    function fetchMapBeacons() {
        // Map Beacons 요청
        setLoading(true);
        setTimeout(() => {
            mapStore.setBeacons([
                {
                    id: 0,
                    name: "항로표지0",
                    coordinate: {
                        lat: 37.3784357,
                        lng: 126.594079,
                    },
                    state: "low",
                    failure_prob: 20,
                },
                {
                    id: 1,
                    name: "항로표지1",
                    coordinate: {
                        lat: 37.3767306,
                        lng: 126.5805178,
                    },
                    state: "medium",
                    failure_prob: 50,
                },
                {
                    id: 2,
                    name: "항로표지2",
                    coordinate: {
                        lat: 37.3639067,
                        lng: 126.5882425,
                    },
                    state: "high",
                    failure_prob: 90,
                },
                {
                    id: 3,
                    name: "항로표지3",
                    coordinate: {
                        lat: 37.3825279,
                        lng: 126.5803461,
                    },
                    state: "high",
                    failure_prob: 99,
                },
                {
                    id: 4,
                    name: "항로표지4",
                    coordinate: {
                        lat: 37.3822551,
                        lng: 126.5607767,
                    },
                    state: "medium",
                    failure_prob: 55,
                },
                {
                    id: 5,
                    name: "항로표지5",
                    coordinate: {
                        lat: 37.33368,
                        lng: 126.5467005,
                    },
                    state: "low",
                    failure_prob: 10,
                },
                {
                    id: 6,
                    name: "항로표지6",
                    coordinate: {
                        lat: 37.3983488,
                        lng: 126.5206079,
                    },
                    state: "low",
                    failure_prob: 20,
                },
                {
                    id: 7,
                    name: "항로표지7",
                    coordinate: {
                        lat: 37.3568799,
                        lng: 126.5418939,
                    },
                    state: "medium",
                    failure_prob: 60,
                },
                {
                    id: 8,
                    name: "항로표지8",
                    coordinate: {
                        lat: 37.3369557,
                        lng: 126.5607767,
                    },
                    state: "high",
                    failure_prob: 90,
                },
            ]);

            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        mapStore.initialize();
        fetchMapBeacons();
        return () => {
            mapStore.destory();
        }
    }, []);

    let currentLat;
    let currentLng;

    if(mapCoordinate) {
        currentLat = mapCoordinate.lat;
        currentLng = mapCoordinate.lng;
    }

    let mapEventTestElement = <div>위도:{currentLat}, 경도:{currentLng}, 로딩 중:{loading.toString()}</div>;
    mapEventTestElement = null;

    return (
        <>
            {mapEventTestElement}
            <div id="map" ref={mapElement} style={{ minHeight: '600px' }}></div>
        </>
    );
}