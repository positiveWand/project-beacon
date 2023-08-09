import ClassNames from "./utils/ClassNames.ts";
import {MyComponentProp} from "./utils/UtilType.ts";

interface Prop extends MyComponentProp {
    href: string,
    selected: boolean,
}

function NavItemAnchor({ href, selected, className, children } : Prop) {
    let classes = new ClassNames(className)
    classes.add('text-white')
    if(selected) {
        classes.add('font-bold underline underline-offset-8 decoration-2')
    }

    return (
        <li className="inline px-3">
            <a href={href} className={classes.toString()}>{children}</a>
        </li>
    )
}

export default NavItemAnchor
