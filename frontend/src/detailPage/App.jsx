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

function App() {
  const [ value, alertSet ] = useState(0);
  const yes = "yes"
  const getRandom = (min, max) => Math.random() * (max - min) + min;
 // const [value, setCount] = useState(0);
  useEffect(()=>{
    let timer = setTimeout(()=>{ alertSet(getRandom(0,100)) }, 10000);
  });
  return (
    <div className="App">
      <div id="con1" class = "container-fluid">
        <div> 항로표지 상세정보 </div>
        <div id="impor1">
        <table>
          <thead>
            <tr>
              <th wei colspan="1">  위도   </th>
              <th colspan="1">  경도   </th>
              <th >  항로표지 번호   </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10.5</td>
              <td>230</td>
              <td> 6 </td>
            </tr>
          </tbody>
        </table>

        </div>
      </div>
      <div class="container-fluid">
        <div> 상태분석 </div>
        <div class="row">
          <div id="col1" class="col">
            <p>고장 확률</p>
            <Niddle value={value}/>
            <p>고장확률 : {value}</p>
            {
              {value}.value > 70 ?
              <p>심각한 위험</p> :
              <p>주시 필요</p>
            }
          </div>
          <div id="col2" class="col">
            <p>고장 원인 예측</p>
            <IsError id="isError" value={value}/>
          </div>
          <div id="col3" class="col">
            <p>고장 유형 분석</p>
            <WhyError id="whyError" value={value}/>
          </div>
        </div>

        <div class="row">
          <div id="col4" class="col">
            <Rechart value={value}/>

          </div>
          <div id="col5" class="col">
            Column
        
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;