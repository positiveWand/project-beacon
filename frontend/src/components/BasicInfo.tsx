import{ BasicInfoModel, MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'
import Heading from './Heading'

interface Prop extends MyComponentProp {
    model: BasicInfoModel
}

function BasicInfo({ model, className }: Prop) {
    let classes = new ClassNames(className)
    // classes.add('border-y-2 border-gray-400')
    classes.add('pb-4')
    classes.add('flex')

    return (
        <SectionBox className={classes.toString()}>
            <div className='flex-1'>
                <Heading level={2}>이미지</Heading>
                <img src="https://digiday.com/wp-content/uploads/sites/3/2014/01/shutterstock_141738085.jpg?resize=1000,579" alt="항로표지 이미지" className='max-w-lg'/>
            </div>
            <div className='flex-1'>
                <Heading level={2}>관리 정보</Heading>
                <table className='w-full h-5/6 border-collapse border-t-2 border-t-gray-400'>
                    <tbody>
                        <tr>
                            <th>코드</th>
                            <td colSpan={7}>{model.beacon_id}</td>
                        </tr>
                        <tr>
                            <th>표지명</th>
                            <td colSpan={7}>{model.beacon_name}</td>
                        </tr>
                        <tr>
                            <th>종류</th>
                            <td colSpan={7}>{model.beacon_type}</td>
                        </tr>
                        <tr>
                            <th>관할청</th>
                            <td colSpan={3}>{model.beacon_office}</td>
                            <th>소유구분</th>
                            <td colSpan={3}>{model.beacon_group}</td>
                        </tr>
                        <tr>
                            <th>위도</th>
                            <td colSpan={3}>{model.beacon_lat}</td>
                            <th>경도</th>
                            <td colSpan={3}>{model.beacon_lng}</td>
                        </tr>
                        <tr>
                            <th>설치목적</th>
                            <td colSpan={3}>{model.beacon_purpose}</td>
                            <th>설치 일자</th>
                            <td colSpan={3}>{model.beacon_installDate}</td>
                        </tr>
                        <tr>
                            <th>도색</th>
                            <td>{model.beacon_color}</td>
                            <th>등색깔</th>
                            <td>{model.beacon_lightColor}</td>
                            <th>등질</th>
                            <td>{model.beacon_lightCharacteristic}</td>
                            <th>등주기</th>
                            <td>{model.beacon_lightSignalPeriod}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SectionBox>
    )
}

export default BasicInfo
