import { useState, useEffect,useRef } from "react";
import{ Color, MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import { Chart as ChartJS, ArcElement, ChartData, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement);

interface Prop extends MyComponentProp {
    threshold: number[],
    labels: string[],
    colors: Color[],
    value: number,
    height?: string,
}

const RED_COLOR = 'rgb(239, 68, 68)'
const YELLOW_COLOR = 'rgb(234, 179, 8)'
const GREEN_COLOR = 'rgb(34, 197, 94)'
const WHITE_COLOR = 'rgb(255, 255, 255)'
const BLUE_COLOR = 'rgb(59, 130, 246)'
const BLACK_COLOR = 'rgb(0,0,0)'

function GauageChart({ threshold, labels, colors, value, height='70%', className, children }: Prop) {
    const chartRef = useRef(null);

    let classes = new ClassNames(className)
    const maxValue = threshold[threshold.length - 1]
    let sectionSize: number[] = []
    for (let i = 1; i < threshold.length; i++) {
        sectionSize.push(threshold[i] - threshold[i-1])
    }

    let sectionColor:string[] = []
    for (let i = 0; i < colors.length; i++) {
        switch (colors[i]) {
            case 'green':
                sectionColor.push(GREEN_COLOR)
                break;
            case 'yellow':
                sectionColor.push(YELLOW_COLOR)
                break;
            case 'red':
                sectionColor.push(RED_COLOR)
                break;
        }
    }

    let currentColor = WHITE_COLOR
    for (let i = 1; i < threshold.length; i++) {
        if(value <= threshold[i]) {
            switch (colors[i-1]) {
                case 'green':
                    currentColor = GREEN_COLOR
                    break;
                case 'yellow':
                    currentColor = YELLOW_COLOR
                    break;
                case 'red':
                    currentColor = RED_COLOR
                    break;
            }
            break;
        }
        
    }

    let data = {
        labels: [...labels],
        datasets: [{
            data: [value, maxValue - value],
            backgroundColor: [currentColor, WHITE_COLOR],
            borderColor: [currentColor, WHITE_COLOR],
            borderAlign: 'inner',
            borderWidth: 5
        }]
    }
    let options = {
        rotation: -90,
        circumference: 180,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
        cutout: '70%',
        aspectRatio: 1.8,
        sectionColor: sectionColor
    }
    let plugins:Plugin<"doughnut", object>[] = [
        {
            id: 'needle',
            afterDatasetDraw: function(chart) {
                const {ctx, data} = chart
                const value = data.datasets[0].data[0] as number
                const maxValue = (data.datasets[0].data[0]  as number) + (data.datasets[0].data[1] as number)
                const ratio = value / maxValue

                ctx.save()

                // console.log(chart.getDatasetMeta(0).data[0])
                const xCenter = chart.getDatasetMeta(0).data[0].x
                const yCenter = chart.getDatasetMeta(0).data[0].y

                const length = xCenter * 0.7

                for (let i = 1; i < threshold.length; i++) {
                    const startAngle = (threshold[i-1] / maxValue + 1) * Math.PI
                    const endAngle = (threshold[i] / maxValue + 1) * Math.PI
                    const lineWidth = 10
                    ctx.beginPath()
                    ctx.lineWidth = lineWidth
                    ctx.strokeStyle = sectionColor[i-1]
                    ctx.arc(xCenter, yCenter, length - lineWidth/2, startAngle, endAngle)
                    ctx.stroke()
                    ctx.closePath()
                }

                ctx.translate(xCenter, yCenter)
                ctx.rotate(Math.PI * ratio)
                ctx.beginPath()
                ctx.moveTo(-length + 10, 0)
                ctx.lineTo(-xCenter, 0)
                ctx.lineWidth = 3
                ctx.strokeStyle = BLACK_COLOR
                ctx.stroke()
                ctx.closePath()

                ctx.restore()
                ctx.save()

                ctx.translate(xCenter, yCenter)
                ctx.textAlign = 'center'
                ctx.font = 'bold 50px sans-serif'
                ctx.fillText(Math.round(ratio*100) + '%' , 0, 0 - 20)

                ctx.restore()
            }
        }
    ]

    return (
        <div className={classes.toString()} style={{height: height}}>
            <Doughnut
                data={data as ChartData<"doughnut", number[], unknown>}
                options={options}
                plugins={plugins}
                ref={chartRef}
            />
        </div>  
    )
}

export default GauageChart