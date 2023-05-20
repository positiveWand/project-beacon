import { useState } from "react";
import WaitingButton from "./WaitingButton";

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

export default function ControlBar({mapStore}) {
    const [loading, setLoading] = useState(false);
    const [syncTimestamp, setSyncTimestamp] = useState(dateFormat(new Date()));

    function handleSearchSubmit(event) {
        console.log("검색 양식 제출됨");
        event.preventDefault();
        let targetName = event.target.name.value;
        let targetState = event.target.state.value;

        let allBeacons = mapStore.getBeacons();
        let filteredBeacons = allBeacons.filter( aBeacon => {
            return aBeacon.name.includes(targetName) && (aBeacon.state == targetState);
        });
        console.log(targetName, targetState);
        console.log(filteredBeacons);
        mapStore.setVisibleBeacons(filteredBeacons);
        mapStore.updateMap();
    }

    function handleFetchButtonClick(event) {
        setLoading(true);
        setTimeout(() => {
            setSyncTimestamp(dateFormat(new Date()));
            setLoading(false);
        }, 3500);
    }

    return (
        <div className="container">
            <h3>검색</h3>
            <form action="#" role="search" onSubmit={handleSearchSubmit}>
                <input type="search" name="name" id="" placeholder="항로표지 이름..."/>
                <select name="state" id="">
                    <option value="low">낮음</option>
                    <option value="medium">중간</option>
                    <option value="high">높음</option>
                </select>
                <input type="submit" value="검색" />
            </form>
            <div>
                <WaitingButton defaultText="업데이트" waitingText="업데이트 중" clickHandler={handleFetchButtonClick} waiting={loading} spacing={["me-2"]}/>
                <span>업데이트 일자: {syncTimestamp}</span>
            </div>
        </div>
    );
}