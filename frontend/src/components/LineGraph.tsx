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
}

function LineGraph({height, className, children}: Prop) {
    let classes = new ClassNames(className)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 20, 100, 50, 30, 110, 120, 150, 100, 50, 0, 200],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    let options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    return (
        <div className={className?.toString()} style={{height: height, width: '100%'}}>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineGraph
