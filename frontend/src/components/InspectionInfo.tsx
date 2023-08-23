import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'
import Heading from './Heading'
import PagedRecordTable from './PagedRecordTable'
import { InspectionModel } from './utils/UtilType'

interface Prop extends MyComponentProp {
    model: InspectionModel[]
}

function InspectionInfo({ model, className }: Prop) {
    let classes = new ClassNames(className)
    classes.add('border-y-2 border-gray-400')
    classes.add('flex')

    console.log(model)
    if(!model) {
        return '자료 없음'
    }

    let record = model.map((aInspection, index) => {
        return {
            이력번호: index + 1,
            작업자: aInspection.inspection_inspector,
            작업목표: aInspection.inspection_purpose,
            작업내용: aInspection.inspection_content,
            비고: aInspection.inspection_note,
            점검시작: aInspection.inspection_startDate,
            점검종료: aInspection.inspection_endDate,
        }
    })

    return (
        <SectionBox className={classes.toString()}>
            <PagedRecordTable columns={['이력번호', '작업자', '작업목표', '작업내용', '비고', '점검시작', '점검종료']} records={record} size={5} className='w-full'></PagedRecordTable>
        </SectionBox>
    )
}

export default InspectionInfo
