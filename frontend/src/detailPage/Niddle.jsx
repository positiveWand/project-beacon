/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

function Niddle(props) {
  const value = props.value;

  const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 30, color: '#ff0000' },
  { name: 'B', value: 40, color: '#00ff00' },
  { name: 'C', value: 30, color: '#0000ff' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;


  const onIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };
  const onDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };

    return (
      <div>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <PieChart width={400} height={500}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <circle cx={x0} cy={y0} r={r} fill="#d0d000" stroke="none" />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill="#d0d000" />,
      </PieChart>
      </div>
    );
}

export default Niddle;