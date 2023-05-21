import { useState, useContext } from "react";
import WaitingButton from "./WaitingButton";
import ToggleButtonGroup from "./ToggleButtonGroup";
import KeywordSearchBar from "./KeywordSearchBar";
import SelectSearchBar from "./SelectSearchBar";
import { MapStoreContext } from "./MapStoreContext";

function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export default function ControlBar({gridFraction}) {
    const [loading, setLoading] = useState(false);
    const [syncTimestamp, setSyncTimestamp] = useState(dateFormat(new Date()));
    const mapStore = useContext(MapStoreContext);

    function handleKeywordSearchSubmit(event) {
        console.log("검색 양식 제출됨");
        event.preventDefault();
        const keyword = event.target.name.value+"";

        console.log(keyword);

        mapStore.addMinusFilter("keyword", aBeacon => {
            console.log(aBeacon, aBeacon.name.includes(keyword));
            return aBeacon.name.includes(keyword);
        });
        console.log("dfdf");
        mapStore.filterBeacons();
    }

    function handleFetchButtonClick(event) {
        setLoading(true);
        setTimeout(() => {
            setSyncTimestamp(dateFormat(new Date()));
            setLoading(false);
        }, 3500);
    }

    return (
        <div style={{display: "grid", gridTemplateColumns: gridFraction.join("fr ") + "fr"}} className="border-bottom border-2">
            <KeywordSearchBar handler={handleKeywordSearchSubmit} styleClass={["p-3 border-end border-2"]}/>
            <div className="d-flex justify-content-between flex-fill p-3">
                <SelectSearchBar/>
                <div className="d-flex align-items-center">
                    <WaitingButton defaultText="업데이트" waitingText="업데이트 중" clickHandler={handleFetchButtonClick} waiting={loading} spacing={["me-2"]}/>
                    <span>업데이트 일자: {syncTimestamp}</span>
                </div>
            </div>
        </div>
    );
}