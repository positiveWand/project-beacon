import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import { MouseEventHandler } from 'react'
import SectionBox from './SectionBox'
import PageNavbar from './PageNavbar'
import { useState } from 'react'

interface Prop extends MyComponentProp {
    size: number,
    columns?: string[],
    records: {
        [attr: string]: any
    }[]
}

function PagedRecordInfoBox({size, columns, records, className}: Prop) {
    let [page, setPage] = useState<number>(1)
    let classes = new ClassNames(className)
    classes.add('')

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
            <table className='w-full my-auto border-collapse'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>content</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records?.slice((page-1) * size, page * size)?.map((aRecord) => {
                            // console.log(aRecord)
                            return (
                                <tr>
                                    <td>{aRecord['id']}</td>
                                    <td>{aRecord['content']}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <PageNavbar pageMax={Math.ceil(records.length / size)} currentPage={page} onChange={handleChange}></PageNavbar>
        </div>
    )
}

export default PagedRecordInfoBox
