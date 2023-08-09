import { MouseEventHandler } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    keyValue: string | number,
    onClick: MouseEventHandler<HTMLAnchorElement>
}

function ClickableBoxItem({ keyValue, onClick, children, className}: Prop) {
    let classes = new ClassNames(className)

    return (
        <li  key={keyValue}>
            <a href="#" className={classes.toString()} onClick={onClick}>
                {children}
            </a>
        </li>
    );
}

export default ClickableBoxItem