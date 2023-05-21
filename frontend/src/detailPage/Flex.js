import logo from "./logo.svg";
import "./App.css";
import Rechart from "./Rechart";
import { Table } from "react-bootstrap";

function Flex() {
    return (
        <div style={{ width: 900, height: 700, display: 'flex'}}>
          {<Rechart/>}
          {<Rechart/>}
        </div>
    );
}

export default Flex;