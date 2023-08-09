import {MyComponentProp, Color} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";
import * as Constant from './utils/UtilConstant'

interface Prop extends MyComponentProp {
    color: Color,

}

function Badge({ color, children, className }: Prop) {
    let classes = new ClassNames(className)
    classes.add('text-sm font-bold rounded-lg py-0.5 px-1.5')
    classes.add(Constant.WHITE_TEXT)
    
    switch (color) {
        case 'gray':
            classes.add(Constant.GRAY_BACKGROUND)
            break;
        case 'green':
            classes.add(Constant.GREEN_BACKGROUND)
            break;
        case 'yellow':
            classes.add(Constant.YELLOW_BACKGROUND)
            break;
        case 'red':
            classes.add(Constant.RED_BACKGROUND)
            break;
    }

    return (
        <span className={classes.toString()}>
            {children}
        </span>
    );
}

export default Badge