import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import * as Niddle from "./Niddle.jsx";


function IsError(props) {
    const value = props.value;
    return (
        <div className="my-auto">
        {
          value >= 70
          ? <p className="fw-bold text-decoration-underline fs-4">측정 장비 이상</p>
          : <p className="fw-bold text-decoration-underline fs-4">연결 회로 이상</p>
        }
        </div>
    );
}
export default IsError;