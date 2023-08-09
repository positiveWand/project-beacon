import {MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import Speedometer from './Speedometer'
import { Color } from './utils/UtilType'

interface Prop extends MyComponentProp {
    threshold: number[],
    labels: string[],
    colors: Color[],
    value: number,
}

function ScoreInfoBox({threshold, labels, colors, value, className, children}: Prop) {
    let classes = new ClassNames(className)
    return (
        <div className={classes.toString()}>
            <Speedometer threshold={threshold} labels={labels} colors={colors} value={value} height='200px'/>
            <p></p>
            <p></p>
        </div>
    )
}

export default ScoreInfoBox
