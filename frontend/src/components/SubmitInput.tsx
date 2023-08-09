import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    value?: string,
}

function SubmitInput({value, className}: Prop) {
    let classes = new ClassNames(className)
    classes.add('')

    return (
        <button type="submit" value={value} className={classes.toString()} onSubmit={() => {console.log("submited")}}>{value}</button>
    )
}

export default SubmitInput
