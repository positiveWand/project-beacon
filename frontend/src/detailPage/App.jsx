//import logo from "./logo.svg";
import "./App.css";
import Rechart from "./Rechart";
//import Pie from "./Pie";
import Niddle from "./Niddle.jsx";
import dolphin from "./asset/dolphin.jpg"
import { Table } from "react-bootstrap";
import IsError from "./IsError.jsx";
import { useState, useEffect } from 'react';

function App() {
  const [ value, alertSet ] = useState(0);
  const getRandom = (min, max) => Math.random() * (max - min) + min;
 // const [value, setCount] = useState(0);
  useEffect(()=>{
    let timer = setTimeout(()=>{ alertSet(getRandom(0,100)) }, 2000);
  });
  return (
    <div className="App">
      <div id="con1" class = "container-fluid">
        <div> 항로표지어쩌구 </div>
        <div id="impor1">
        <table>
          <thead>
            <tr>
              <th wei colspan="1">  위도   </th>
              <th colspan="1">  경도   </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10.5</td>
              <td>230</td>
            </tr>
          </tbody>
        </table>

        </div>
      </div>
      <div class="container-fluid">
        <div> 상태분석 </div>
        <div class="row">
          <div id="col1" class="col">
            column
            <Niddle value={value}/>
          </div>
          <div id="col2" class="col">
            Column
            <IsError value={value}/>
          </div>
          <div id="col3" class="col">
            Column
            <Niddle />
          </div>
        </div>

        <div class="row">
          <div id="col4" class="col">
            <Rechart value={value}/>
            <Rechart />
          </div>
          <div id="col5" class="col">
            Column
            <div>
              지원군
              <img src={dolphin}/>
              돌고래
            </div>
        
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;