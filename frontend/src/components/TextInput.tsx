import { ChangeEventHandler, useState } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    label?: string,
    type: 'text' | 'password' | 'email' | 'search',
    name: string,
    required?: boolean,
    placeholder?: string,
    invalid?: boolean,
    validMessage?: string,
    invalidMessage?: string,
    useChange?: ChangeEventHandler<HTMLInputElement>,
    inputStyle: string,
}

function TextInput({label, type, name, required=false, placeholder='', invalid, validMessage='유효한 입력입니다.', invalidMessage='실패메시지', useChange, inputStyle, className}: Prop) {
    const [value, setValue] = useState<string>('')

    let classes = new ClassNames(className)

    let _inputStyle = new ClassNames(inputStyle)
    _inputStyle.add('border rounded border-gray-300 focus:outline-blue-400 focus:outline focus:outline-4 w-full')
    if(invalid == false) {
        _inputStyle.add('outline-green-400 outline outline-4')
    } else if(invalid == true) {
        _inputStyle.add('outline-red-400 outline outline-4')
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
        if(useChange){
            useChange(e)
        }
    }

    let validationMessage: JSX.Element | null = null

    if(invalid !== undefined) {
        validationMessage = !invalid ? <div className='text-green-500 text-sm mb-1'>{validMessage}</div> : <div className='text-red-500 text-sm mb-1'>{invalidMessage}</div>
    }
    return (
        <div className={classes.toString()}>
            { label && <label htmlFor="" className="block font-bold text-lg mb-1">{label}</label> }
            <input type={type} onChange={handleChange} value={value} name={name} placeholder={placeholder} required={required} 
            className={_inputStyle.toString()}/>
            {validationMessage}
        </div>
    )
}

export default TextInput
