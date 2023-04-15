import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MapStore } from "./MapStore";

const mapStore = new MapStore();

function useMapCenter() {
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

export default function MapContainer() {
    const mapElement = useRef(null);
    const mapObject = useRef(null);
    const mapCoordinate = useMapCenter();

    useEffect(() => {
        const { naver } = window;

        const location = new naver.maps.LatLng(37.5656, 126.9769);
        const mapOptions = {
            center: location,
            zoom: 17,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        mapObject.current = new naver.maps.Map("map", mapOptions);
        new naver.maps.Marker({
            position: location,
            map: mapObject.current
        });

        naver.maps.Event.addListener(mapObject.current, "drag", e => {
            mapStore.setCenter({
                lat: mapObject.current.getCenter().lat(),
                lng: mapObject.current.getCenter().lng(),
            });
        })
    }, []);

    let currentLat;
    let currentLng;

    if(mapCoordinate) {
        currentLat = mapCoordinate.lat;
        currentLng = mapCoordinate.lng;
    }

    return (
        <>
            <div>위도:{currentLat}, 경도:{currentLng}</div>
            <div id="map" ref={mapElement} style={{ minHeight: '600px' }}></div>
        </>
    );
}