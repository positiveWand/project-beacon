import {useState, MouseEventHandler} from 'react'
import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import PageNavbar from './PageNavbar'
interface Prop extends MyComponentProp {
    columns: string[],
    size: number,
    records: {
        [attr: string]: any
    }[]
}

function PagedRecordTable({columns, size, records, className}: Prop) {
    let [page, setPage] = useState<number>(1);
    let classes = new ClassNames(className);
    classes.add('');

    let fixedRecords = [...records]
    for(let i = 0; i < size - records.length % size && records.length != 0; i++) {
        fixedRecords.push({blank: true})
    }

    const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
        // console.log(event.currentTarget.innerHTML)
        if(event.currentTarget.innerHTML == '&lt;') {
            setPage(page-1)
        } else if(event.currentTarget.innerHTML == '&gt;') {
            setPage(page+1)
        } else {
            const targetPage = parseInt(event.currentTarget.innerHTML)
            setPage(targetPage)
        }
    }

    return (
        <div className={classes.toString()}>
            <table className='w-full border-collapse mb-4'>
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
                        fixedRecords?.slice((page-1) * size, page * size)?.map((aRecord) => {
                            return (
                                <tr>
                                    {
                                        columns.map((aColumn) => {
                                            if(!aRecord.blank) {
                                                return (
                                                    <td>{aRecord[aColumn]}</td>
                                                );
                                            } else {
                                                return (
                                                    <td>&nbsp;</td>
                                                );
                                            }
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
            <PageNavbar pageMax={Math.max(Math.ceil(records.length / size), 1)} currentPage={page} onChange={handleChange}></PageNavbar>
        </div>
    )
}

export default PagedRecordTable