import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {

}

function Heading({ className, children }: Prop) {
    let classes = new ClassNames(className)
    classes.add('font-bold rounded text-3xl p-2 text-center')
    return (
        <h1 className={classes.toString()}>
            {children}
        </h1>
    )
}

export default Heading
