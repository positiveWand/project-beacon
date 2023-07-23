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
        fetch('/beacon/all')
        .then(result => result.json())
        .then(beacon_list => {
            console.log("hi")
            console.log(beacon_list)
            mapStore.setBeacons(
                beacon_list
            );
            setLoading(false);
        });
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