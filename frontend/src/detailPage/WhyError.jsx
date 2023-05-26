import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import * as Niddle from "./Niddle.jsx";


function WhyError(props) {
    const value = props.value;
    return (
        <div>
        {
          value%2 == 1
          ? <p>꾸준한 이상치 증가</p>
          : <p>급격한 고장</p>
        }
      </div>
    );
}
export default WhyError;