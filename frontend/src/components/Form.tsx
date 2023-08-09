import {  FormEventHandler } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    label?: string,
    invalid?: boolean,
    invalidMessage?: string,
    onSubmit: FormEventHandler<HTMLFormElement>
}

function Form({ label, invalid, invalidMessage='유효하지 않은 입력입니다.', onSubmit, className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('')

    return (
        <form onSubmit={onSubmit} className={classes.toString()} noValidate>
            { label && <h1 className='font-bold text-4xl p-4 mb-4 border-b-2 text-center'>{label}</h1> }
            { invalid && <div className="text-red-500 text-center mb-4">{invalidMessage}</div> }
            { children }
        </form>
    )
}

export default Form
