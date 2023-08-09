import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    maxHeight: string,
}

function ScrollableSectionBox({maxHeight, className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('overflow-y-auto')
    return (
        <section className={classes.toString()} style={{
            minHeight: '5rem',
            maxHeight: maxHeight,
        }}>
            {children}
        </section>
    )
}

export default ScrollableSectionBox
