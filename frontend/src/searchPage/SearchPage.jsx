import { useSyncExternalStore, useState } from "react";
import Header from './Header'
import MapContainer from './MapContainer';
import ControlBar from './ControlBar';
import {MapStore} from './MapStore';
import BoxList from './BoxList';
import { MapStoreContext } from './MapStoreContext'
import {MAIN_PAGE, SEARCH_PAGE, LOGIN_PAGE, SIGNUP_PAGE} from "/src/route"

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
    const [fetchLoading, setFetchLoading] = useState(false);

    const navTarget = [
        {name: "홈", to: MAIN_PAGE, active: false},
        {name: "탐색", to: SEARCH_PAGE, active: true},
    ];

    function handleToLoginButton() {
        console.log("[메인페이지] 로그인 버튼 클릭");
        location.href = LOGIN_PAGE;
    }
    function handleToSignupButton() {
        console.log("[메인페이지] 회원가입 버튼 클릭");
        location.href = SIGNUP_PAGE;
    }

    function handleItemClick(event) {
        console.log(event.currentTarget.querySelector("div > span").innerText);
        const targetKey = parseInt(event.currentTarget.querySelector("div > span").innerText);
        const targetBeacon = mapStore.getBeacons().find(aBeacon => {
            return aBeacon.id == targetKey;
        });
        mapStore.moveAndZoomTo(targetBeacon.coordinate, 12);
        mapStore.showInfowindow(targetKey);
    }

    return (
        <div className="d-flex flex-column overflow-y-auto">
            <Header title="B.M.S" navTargets={navTarget} toLoginHandler={handleToLoginButton} toSignupHandler={handleToSignupButton} />
            <MapStoreContext.Provider value={mapStore}>
                <ControlBar gridFraction={[1.5, 4]} fetchLoading={fetchLoading} setFetchLoading={setFetchLoading}/>
                <div className="flex-grow-1 flex-shirnk-1 overflow-y-auto" style={{display: "grid", gridTemplateColumns: "1.5fr 4fr"}}>
                    <BoxList content={visibleBeacons.map(aBeacon => MapStore.toContentObject(aBeacon))} itemClickHandler={handleItemClick} styleClass={["border-end", "border-2"]}/>
                    <MapContainer loading={fetchLoading} setLoading={setFetchLoading}/>
                </div>
            </MapStoreContext.Provider>
        </div>
    );
}