import React, { PureComponent, Component } from "react";
import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";



function Rechart(props) {
    const value = props.value
    const [inputs, setInputs] = useState({
        name: "B",
        uv: 0,
        pv: 0,
        amt: 0
    });

    const [newValue, setValue] = useState(1000);

    const [data, setData] = useState([

    ]);
    
    const change = (name, valueT) => {
        setInputs({
          ...inputs,
          [name]: valueT
        })
      }
      const change1 = (name, valueT) => {
        setInputs({
          ...inputs,
          [name]: valueT
        })
      }
      const change2 = (name, valueT) => {
        setInputs((prevInput) =>{
            return{
                ...prevInput,
                [name]: valueT
                };
            });
        }

      const changeV = () => {
        setValue(value)
      }

    useEffect(() => {
        //changeV();
        change2("amt", 2000);
        change2("uv", value*100);
        change2("pv", value*100);
        console.log(inputs)
        setData(prevData => [...prevData, inputs])
  	}, [value])

        return (
            <div height="250px">
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
                <p>{value}</p>
            </div>
        );
    
}

export default Rechart;