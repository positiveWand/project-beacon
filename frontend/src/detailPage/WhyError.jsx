import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import * as Niddle from "./Niddle.jsx";


function WhyError(props) {
    const value = props.value;
    return (
        <div className="my-auto">
        {
          value%2 == 1
          ? <p className="fw-bold text-decoration-underline fs-4">꾸준한 이상치 증가</p>
          : <p className="fw-bold text-decoration-underline fs-4">급격한 확률 변화</p>
        }
      </div>
    );
}
export default WhyError;