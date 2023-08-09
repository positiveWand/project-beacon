import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    rowSpan?: number | 'auto' | 'full',
    colSpan?: number | 'auto' | 'full'
}

function GridItem({ rowSpan='auto', colSpan='auto', className, children }: Prop) {
    let classes = new ClassNames(className)
    classes.add('flex flex-col')
    let itemStyle:{[attr: string]: string} = {}
    if(rowSpan) {
        if(rowSpan == 'auto') {
            itemStyle['gridRow'] = 'auto'
        } else if(rowSpan == 'full') {
            itemStyle['gridRow'] = '1 / -1'
        } else {
            itemStyle['gridRow'] = `span ${rowSpan} / span ${rowSpan}`
        }
    }
    if(colSpan) {
        if(colSpan == 'auto') {
            itemStyle['gridColumn'] = 'auto'
        } else if(colSpan == 'full') {
            itemStyle['gridColumn'] = '1 / -1'
        } else {
            itemStyle['gridColumn'] = `span ${colSpan} / span ${colSpan}`
        }
    }
    return (
        <div className={classes.toString()} style={itemStyle}>
            {children}
        </div>
    )
}

export default GridItem
