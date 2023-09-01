import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'
import Heading from './Heading'
import NormalRecordTable from './NormalRecordTable'
import PagedRecordTable from './PagedRecordTable'
import { FeatureModel } from './utils/UtilType'

interface Prop extends MyComponentProp {
    model: FeatureModel[]
}

function FeatureInfo({ model, className }: Prop) {
    let classes = new ClassNames(className)
    classes.add('flex-col')

    if(!model) {
        return '자료 없음'
    }

    let current = model.filter((element) => {
        return !element.feature_uninstallDate
    }).map((aFeature, index) => {
        return {
            코드: aFeature.feature_id,
            설치일자: aFeature.feature_installDate
        }
    })

    let record = model.map((aFeature, index) => {
        return {
            이력번호: index + 1,
            코드: aFeature.feature_id,
            설치일자: aFeature.feature_installDate,
            철거일자: aFeature.feature_uninstallDate ? aFeature.feature_uninstallDate : '현재 설치'
        }
    })

    return (
        <SectionBox className={classes.toString()}>
            <Heading level={2}>현재 설치 현황</Heading>
            <NormalRecordTable columns={['코드', '설치일자']} records={current}></NormalRecordTable>
            <Heading level={2}>설치 이력</Heading>
            <PagedRecordTable columns={['이력번호', '코드', '설치일자', '철거일자']} records={record} size={5}></PagedRecordTable>
        </SectionBox>
    )
}

export default FeatureInfo
