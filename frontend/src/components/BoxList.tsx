import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
}

function BoxList({ children, className }: Prop) {
    let classes = new ClassNames(className)

    return (
        <div className={classes.toString()}>
            <ol className='h-full p-2 flex flex-col'>
                { children }
            </ol>
        </div>
    );
}

export default BoxList