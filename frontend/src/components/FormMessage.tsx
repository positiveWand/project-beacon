import { useState } from "react";
import {MyComponentProp} from "./utils/UtilType";

interface Prop extends MyComponentProp {
    label: string,
    type: 'text' | 'password',
    placeholder: string,
}

function FormMessage({label, type, placeholder, children}: Prop) {
    if()
}

export default FormMessage