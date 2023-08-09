import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    key: string,
}

function BoxItem({ key, children, className}: Prop) {
    let classes = new ClassNames(className)

    return (
        <li className={classes.toString()} key={key}>
            { children }
        </li>
    );
}

export default BoxItem