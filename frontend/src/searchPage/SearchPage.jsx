import { useSyncExternalStore } from "react";
import Header from './Header'
import MapContainer from './MapContainer';
import ControlBar from './ControlBar';
import {MapStore} from './MapStore';
import BoxList from './BoxList';
import { MapStoreContext } from './MapStoreContext'

const mapStore = new MapStore();

function useVisibleBeacons(mapStore) {
    function subscribe(callback) {
        let theListener = mapStore.addEventListener("update", e => {
            callback();
        });
        
        return () => {
            mapStore.removeEventListener(theListener);
        };
    }
    return useSyncExternalStore(
        subscribe,
        () => {
            return mapStore.getVisibleBeacons();
        },
    )
}

export default function SearchPage() {
    const visibleBeacons = useVisibleBeacons(mapStore);

    const navTarget = [
        {name: "홈", to: "link1 링크 URL", active: false},
        {name: "탐색", to: "link2 링크 URL", active: true},
    ];

    return (
        <div className="d-flex flex-column overflow-y-auto">
            <Header title="B.M.S" navTargets={navTarget}></Header>
            <MapStoreContext.Provider value={mapStore}>
                <ControlBar gridFraction={[1.5, 4]}/>
                <div className="flex-grow-1 flex-shirnk-1 overflow-y-auto" style={{display: "grid", gridTemplateColumns: "1.5fr 4fr"}}>
                    <BoxList content={visibleBeacons.map(aBeacon => MapStore.toContentObject(aBeacon))}/>
                    <MapContainer/>
                </div>
            </MapStoreContext.Provider>
        </div>
    );
}