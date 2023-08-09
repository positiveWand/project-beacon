import {MyComponentProp} from "./utils/UtilType"
import ClassNames from "./utils/ClassNames"

interface Prop extends MyComponentProp {
    
}

function NavBar({children, className}: Prop) {
    let classes = new ClassNames(className)
    classes.add('flex')

    return (
        <nav className={classes.toString()}>
            <ul>
                {children}
            </ul>
        </nav>
    )
}

export default NavBar
