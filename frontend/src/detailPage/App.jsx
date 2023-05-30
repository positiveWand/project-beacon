//import logo from "./logo.svg";
import "./App.css";
import Rechart from "./Rechart";
//import Pie from "./Pie";
import Niddle from "./Niddle.jsx";
import dolphin from "./asset/dolphin.jpg"
import { Table } from "react-bootstrap";
import WhyError from "./WhyError.jsx";
import IsError from "./IsError.jsx";
import { useState, useEffect } from 'react';
import { testdata } from "./Test";
import back_arrow_img from "/src/assets/undo.png";
import {SEARCH_PAGE} from "/src/route";

function App() {
  const [beaconName, setBeaconName] = useState("-");
  const [beaconID, setBeaconID] = useState("-");
  const [beaconCoord, setBeaconCoord] = useState({lat: "-", lng: "-"});
  const [prob, setProb] = useState(34);

  function fetchBeaconInfo(beaconID) {
    const targetBeacon = testdata[beaconID];
    console.log(targetBeacon);

    setBeaconName(targetBeacon.name);
    setBeaconID(targetBeacon.id);
    setBeaconCoord({lat: targetBeacon.coordinate.lat, lng: targetBeacon.coordinate.lng});
    setProb(targetBeacon.failure_prob);
  }

  useEffect(()=>{
    const receivedRaw = location.href.split("?")[1].split("#")[0];
    const receivedObject = {};
    receivedRaw.split("&").map(aItem => {
      const split = aItem.split("=");
      receivedObject[split[0]] = split[1];
      return;
    });
    console.log(receivedObject);

    fetchBeaconInfo(receivedObject["id"]);
  }, []);

  return (
    <div className="App d-flex flex-column">
      <div class="border-bottom border-3">
        <a href={SEARCH_PAGE} className="d-inline-flex align-items-center m-3">
          <img src={back_arrow_img} alt="탐색 페이지로 돌아가기" width="10%" className="border p-2 rounded-2 border-3 border-black"/>
        </a>
      </div>
      <div class="d-flex flex-column align-items-center m-4">
        <h2 className="text-bg-primary rounded-3 fw-bold me-auto p-2">항로표지 상세정보</h2>
        <div className="w-100 p-4 d-flex justify-content-center dashboard-content">
          <div className="d-flex justify-content-center beacon-info">
            <div>
              <h6>이름</h6>
              <p>{beaconName}</p>
            </div>
            <div>
              <h6>번호</h6>
              <p>{beaconID}</p>
            </div>
            <div>
              <h6>위도</h6>
              <p>{beaconCoord.lat}</p>
            </div>
            <div>
              <h6>경도</h6>
              <p>{beaconCoord.lng}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center m-4">
        <h2 className="text-bg-primary rounded-3 fw-bold me-auto p-2">상태분석</h2>
        <div className="w-100" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
          <div className="dashboard-content me-1 d-flex flex-column align-items-center p-3">
            <h3 className="fw-bold">고장 확률</h3>
            <Niddle value={prob}/>
            <p className="fw-bold fs-5">{prob+"%"}</p>
            {
              {prob}.prob > 70 ?
              <p className="fw-bold fs-5">심각한 위험</p> :
              <p className="fw-bold fs-5">주시 필요</p>
            }
          </div>
          <div className="dashboard-content mx-1 d-flex flex-column align-items-center p-3">
            <h3 className="fw-bold">고장 원인</h3>
            <IsError id="isError" value={prob}/>
          </div>
          <div className="dashboard-content ms-1 d-flex flex-column align-items-center p-3">
            <h3 className="fw-bold">고장 유형</h3>
            <WhyError id="whyError" value={prob}/>
          </div>
        </div>

        <div className="w-100 mt-2" style={{display: "grid", gridTemplateColumns: "1fr"}}>
          <div className="dashboard-content d-flex flex-column align-items-center p-3">
            <h3 className="fw-bold">고장 확률 추이 그래프</h3>
            <Rechart value={prob}/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;