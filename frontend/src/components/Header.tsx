import {MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    
}

function Header({className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('')

    return (
        <header className={classes.toString()}>
            {children}
        </header>
    )
}

export default Header
