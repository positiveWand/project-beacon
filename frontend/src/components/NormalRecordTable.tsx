import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
interface Prop extends MyComponentProp {
    columns: string[],
    records: {
        [attr: string]: any
    }[]
}

function NormalRecordTable({columns, records, className}: Prop) {
    let classes = new ClassNames(className);
    classes.add('');

    return (
        <div className={classes.toString()}>
            <table className='w-full border-collapse border-t-2 border-t-gray-400'>
                <thead>
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
                        records?.map((aRecord) => {
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
                    {
                        records.length == 0 ?
                        <tr>
                            <td colSpan={columns.length}>
                                <b>자료 없음</b>
                            </td>
                        </tr> : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default NormalRecordTable
