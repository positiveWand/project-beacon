import { ChangeEventHandler, useState } from "react";
import {MyComponentProp, Color} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";
import * as Constant from  './utils/UtilConstant';

interface Prop extends MyComponentProp {
    checked: boolean,
    color: Color,
    name: string,
    value: string,
    onChange: (checked: boolean, name: string) => void
}

function ToggleButton({ checked, color, value, name, onChange, className}: Prop) {
    let classes = new ClassNames(className)
    classes.add('cursor-pointer')

    switch (color) {
        case 'gray':
            classes.add(Constant.GRAY_BORDER)
            if (checked) {
                classes.add(Constant.GRAY_BACKGROUND)
                classes.add(Constant.WHITE_TEXT)
            } else {
                classes.add(Constant.TRANSPARENT_BACKGROUND)
                classes.add(Constant.GRAY_TEXT)
            }
            break;
        case 'green':
            classes.add(Constant.GREEN_BORDER)
            if (checked) {
                classes.add(Constant.GREEN_BACKGROUND)
                classes.add(Constant.WHITE_TEXT)
            } else {
                classes.add(Constant.TRANSPARENT_BACKGROUND)
                classes.add(Constant.GREEN_TEXT)
            }
            break;
        case 'yellow':
            classes.add(Constant.YELLOW_BORDER)
            if (checked) {
                classes.add(Constant.YELLOW_BACKGROUND)
                classes.add(Constant.WHITE_TEXT)
            } else {
                classes.add(Constant.TRANSPARENT_BACKGROUND)
                classes.add(Constant.YELLOW_TEXT)
            }
            break;
        case 'red':
            classes.add(Constant.RED_BORDER)
            if (checked) {
                classes.add(Constant.RED_BACKGROUND)
                classes.add(Constant.WHITE_TEXT)
            } else {
                classes.add(Constant.TRANSPARENT_BACKGROUND)
                classes.add(Constant.RED_TEXT)
            }
            break;
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange(!checked, name)
    }

    return (
        <>
            <input type="checkbox" className='absolute pointer-events-none' style={{clip: "rect(0,0,0,0)"}} id={"select-"+name} onChange={handleChange} checked={checked}/>
            <label htmlFor={"select-"+name} className={classes.toString()}>{value}</label>
        </>
    )
}

export default ToggleButton
