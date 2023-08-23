import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    level: number
}

function Heading({ level, className, children }: Prop) {
    let classes = new ClassNames(className)
    switch (level) {
        case 1:
            classes.add('font-bold rounded text-3xl p-2')
            return (
                <h1 className={classes.toString()}>
                    {children}
                </h1>
            )
        case 2:
            classes.add('font-bold rounded text-2xl p-2')
            return (
                <h2 className={classes.toString()}>
                    {children}
                </h2>
            )
        case 3:
            classes.add('font-bold rounded text-xl p-2')
            return (
                <h3 className={classes.toString()}>
                    {children}
                </h3>
            )       
        case 4:
            classes.add('font-bold rounded text-lg p-2')
            return (
                <h4 className={classes.toString()}>
                    {children}
                </h4>
            )       
    }
}

export default Heading
