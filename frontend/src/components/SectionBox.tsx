import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
}

function SectionBox({className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('')
    return (
        <section className={classes.toString()}>
            {children}
        </section>
    )
}

export default SectionBox
