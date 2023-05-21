import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import * as Niddle from "./Niddle.jsx";


function IsError(props) {
    const value = props.value;
    return (
        <div>
        {
          value >= 70
          ? <p>측정 장비 이상</p>
          : <p>아무튼 뭔가 고장남</p>
        }
      </div>
    );
}
export default IsError;