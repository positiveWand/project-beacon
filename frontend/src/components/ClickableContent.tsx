import { MouseEventHandler, useState } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    key: string,
    onClick: MouseEventHandler<HTMLAnchorElement>
}

function BoxItem({ key, onClick, children, className}: Prop) {
    let classes = new ClassNames(className)

    return (
        <a href="#" className={classes.toString()} onClick={onClick}>
            {children}
        </a>
    );
}

export default BoxItem