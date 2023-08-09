import {MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'

interface Prop extends MyComponentProp {
}

function TextInfoBox({ className, children}: Prop) {
    let classes = new ClassNames(className)
    return (
        <SectionBox className={classes.toString()}>
            <p className='text-center text-2xl font-bold underline'>{children}</p>
        </SectionBox>
    )
}

export default TextInfoBox
