import { ChangeEventHandler, useState } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    imgSrc: string,
    label?: string,
    type: 'text' | 'password' | 'email',
    name: string,
    required?: boolean,
    placeholder?: string,
    invalid?: boolean,
    validMessage?: string,
    invalidMessage?: string,
    useChange?: ChangeEventHandler<HTMLInputElement>,
}

function SearchInput({label, type, name, required=false, placeholder='', invalid, validMessage='유효한 입력입니다.', invalidMessage='실패메시지', useChange, className}: Prop) {
    const [value, setValue] = useState<string>('')

    let classes = new ClassNames(className)
    classes.add('w-full')

    let inputStyle = new ClassNames("block w-full border rounded border-gray-300 text-xl p-2 focus:outline-blue-400 focus:outline focus:outline-4 mb-2")
    if(invalid == false) {
        inputStyle.add('outline-green-400 outline outline-4')
    } else if(invalid == true) {
        inputStyle.add('outline-red-400 outline outline-4')
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
            className={inputStyle.toString()}/>
            {validationMessage}
        </div>
    )
}

export default SearchInput
