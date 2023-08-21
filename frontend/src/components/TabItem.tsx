import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    title: string,
}

function TabItem({title, className, children}: Prop) {
    let classes = new ClassNames(className)

    return (
        <>
            {children}
        </>
    )
}

export default TabItem
