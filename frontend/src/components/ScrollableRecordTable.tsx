import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import ScrollableSectionBox from './ScrollableSectionBox';
interface Prop extends MyComponentProp {
    columns: string[],
    maxHeight: string,
    records: {
        [attr: string]: any
    }[]
}

function ScrollableRecordTable({columns, maxHeight, records, className}: Prop) {
    let classes = new ClassNames(className);
    classes.add('overflow-y-auto');

    return (
        <ScrollableSectionBox maxHeight={maxHeight} className={classes.toString()}>
            <table className='w-full border-collapse border-t-2 border-t-gray-400'>
                <thead className='sticky top-0'>
                    <tr>
                        {
                            columns.map((aColumn) => {
                                return (
                                    <th>
                                        {aColumn}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        records?.map((aRecord, index) => {
                            return (
                                <tr>
                                    {
                                        columns.map((aColumn) => {
                                            return (
                                                <td>{aRecord[aColumn]}</td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </ScrollableSectionBox>
    )
}

export default ScrollableRecordTable