import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    rows?: number | 'none',
    cols?: number | 'none',
}

function GridBox({ rows, cols, className, children }: Prop) {
    let classes = new ClassNames(className)
    classes.add('grid')
    let gridStyle:{[attr: string]: string} = {}
    if(rows) {
        if(rows == 'none') {
            gridStyle['gridTemplateRows'] = 'none'
        } else {
            gridStyle['gridTemplateRows'] = `repeat(${rows}, minmax(0, 1fr))`
        }
    }
    if(cols) {
        if(rows == 'none') {
            gridStyle['gridTemplateColumns'] = 'none'
        } else {
            gridStyle['gridTemplateColumns'] = `repeat(${cols}, minmax(0, 1fr))`
        }
    }
    
    return (
        <div className={classes.toString()} style={gridStyle}>
            {children}
        </div>
    )
}

export default GridBox
