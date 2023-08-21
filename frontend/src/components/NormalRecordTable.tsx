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
            <table className='w-full border-collapse'>
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
                </tbody>
            </table>
        </div>
    )
}

export default NormalRecordTable
