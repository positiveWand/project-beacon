import{ MyComponentProp, SignalModel} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'
import { GRAY_BACKGROUND, GRAY_TEXT, GREEN_BACKGROUND, GREEN_BORDER, GREEN_TEXT, RED_BACKGROUND, RED_TEXT, YELLOW_BACKGROUND, YELLOW_TEXT } from './utils/UtilConstant'

interface Prop extends MyComponentProp {
    model: SignalModel
}

function SignalInfo({ model, className }: Prop) {
    let classes = new ClassNames(className)
    classes.add('border-y-2 border-gray-400')
    classes.add('flex')

    if(!model) {
        return '자료 없음'
    }

    return (
        <SectionBox className={classes.toString()}>
            <table className='w-full table-fixed'>
                <thead>
                    <tr>
                        {
                            Object.keys(model).map((aFeature) => {
                                let itemTitle = '장비'
                                switch (aFeature) {
                                    case 'rtu':
                                        itemTitle = 'RTU'
                                        break;
                                    case 'solarbattery':
                                        itemTitle = '태양전지'
                                        break;
                                    case 'batterycharge':
                                        itemTitle = '충방전조절기'
                                        break;
                                    case 'light':
                                        itemTitle = '등명기'
                                        break;
                                    case 'storagebattery':
                                        itemTitle = '축전기'
                                        break;
                                    case 'ais':
                                        itemTitle = 'AIS'
                                        break;
                                    case 'racon':
                                        itemTitle = '레이콘'
                                        break;
                                }
                                return (
                                    <th className='border-r border-black'>
                                        {itemTitle}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            Object.keys(model).map((aFeature) => {
                                let cellStyle = new ClassNames('border-r border-black')
                                switch (model[aFeature]) {
                                    case 'true':
                                        cellStyle.add(GREEN_BACKGROUND)
                                        cellStyle.add(GREEN_TEXT)
                                        break;
                                    case 'false':
                                        cellStyle.add(RED_BACKGROUND)
                                        cellStyle.add(RED_TEXT)
                                        break;
                                    default:
                                        cellStyle.add(GRAY_BACKGROUND)
                                        cellStyle.add(GRAY_TEXT)
                                        break;
                                }

                                let cellText = '알 수 없음'
                                switch (model[aFeature]) {
                                    case 'true':
                                        cellText = '정상'
                                        break;
                                    case 'false':
                                        cellText = '비정상'
                                        break;
                                    default:
                                        cellText = '알 수 없음'
                                        break;
                                }
                                return <td className={cellStyle.toString()}>{cellText}</td>
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </SectionBox>
    )
}

export default SignalInfo
