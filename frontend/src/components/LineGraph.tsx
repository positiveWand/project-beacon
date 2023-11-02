import { useState, useEffect,useRef } from "react";
import {MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Prop extends MyComponentProp {
    height: string,
    labels: string[],
    data: number[]
}

function LineGraph({height, labels, data, className}: Prop) {
    console.log(labels)
    let graphData = {
        labels: labels,
        datasets: [
            {
                label: '고장 확률',
                data: data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
    
    let options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '고장 확률 그래프',
            },
        },
    };
    return (
        <div className={className?.toString()} style={{height: height, width: '100%'}}>
            <Line
                data={graphData}
                options={options}
            />
        </div>
    )
}

export default LineGraph
