import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import ScrollableSectionBox from './ScrollableSectionBox'

interface Prop extends MyComponentProp {
    maxHeight: string,
    columns?: string[],
    records?: object[]
}

function ScrollableRecordInfoBox({maxHeight, columns, records, className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('overflow-y-auto')
    return (
        <ScrollableSectionBox maxHeight={maxHeight} className={classes.toString()}>
            <table className='w-full my-auto border-collapse'>
                <thead className='sticky top-0'>
                    <tr>
                        <th>칼럼1</th>
                        <th>칼럼2</th>
                        <th>칼럼3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>데이터1-1</td>
                        <td>데이터1-2</td>
                        <td>데이터1-3</td>
                    </tr>
                    <tr>
                        <td>데이터2-1</td>
                        <td>데이터2-2</td>
                        <td>데이터2-3</td>
                    </tr>
                    <tr>
                        <td>데이터2-1</td>
                        <td>데이터2-2</td>
                        <td>데이터2-3</td>
                    </tr>
                    <tr>
                        <td>데이터2-1</td>
                        <td>데이터2-2</td>
                        <td>데이터2-3</td>
                    </tr>
                    <tr>
                        <td>데이터2-1</td>
                        <td>데이터2-2</td>
                        <td>데이터2-3</td>
                    </tr>
                    <tr>
                        <td>데이터2-1</td>
                        <td>데이터2-2</td>
                        <td>데이터2-3</td>
                    </tr>
                </tbody>
            </table>
        </ScrollableSectionBox>
    )
}

export default ScrollableRecordInfoBox
