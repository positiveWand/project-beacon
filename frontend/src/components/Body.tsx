import {MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    
}

function Body({className, children}: Prop) {
    let classes = new ClassNames(className)
    return (
        <div className={classes.toString()}>
            {children}
        </div>
    )
}

export default Body
