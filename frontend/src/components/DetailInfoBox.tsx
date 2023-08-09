import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'

interface Prop extends MyComponentProp {

}

function DetailInfoBox({ className, children }: Prop) {
    let classes = new ClassNames(className)
    classes.add('border-y-2 border-gray-400')
    classes.add('flex')
    return (
        <SectionBox className={classes.toString()}>
            <table className='w-full my-auto border-collapse'>
                <tbody>
                    <tr>
                        <th className='border-b border-slate-400'>표지명</th>
                        <td className='border-b border-slate-400'>김천항1호등부표</td>
                        <th className='border-b border-slate-400'>관할청</th>
                        <td className='border-b border-slate-400'>부산청</td>
                        <th className='border-b border-slate-400'>표지상태</th>
                        <td className='border-b border-slate-400'>설치</td>
                        <th className='border-b border-slate-400'>표지종류</th>
                        <td className='border-b border-slate-400'>등부표</td>
                    </tr>
                    <tr>
                        <th className='border-b border-slate-400'>위치</th>
                        <td className='border-b border-slate-400'>N 35 - 03 - 10.1 E 129 - 00 - 11.1</td>
                        <th className='border-b border-slate-400'>등대표번호</th>
                        <td className='border-b border-slate-400'>2043</td>
                        <th className='border-b border-slate-400'>해도번호</th>
                        <td className='border-b border-slate-400'>201B</td>
                        <th className='border-b border-slate-400'>신설일자</th>
                        <td className='border-b border-slate-400'>1994-09-01</td>
                    </tr>
                    <tr>
                        <th className='border-b border-slate-400'>목적/용도</th>
                        <td className='border-b border-slate-400'>항해원조</td>
                        <th className='border-b border-slate-400'>기간구분</th>
                        <td className='border-b border-slate-400'>영구적</td>
                        <th className='border-b border-slate-400'>품질</th>
                        <td className='border-b border-slate-400'>FL(2) G 6s</td>
                        <th className='border-b border-slate-400'>도색형상</th>
                        <td className='border-b border-slate-400'>녹색/원주형</td>
                    </tr>
                    <tr>
                        <th className='border-b border-slate-400'>표지구분</th>
                        <td className='border-b border-slate-400' colSpan={7}>국유</td>
                    </tr>
                    <tr>
                        <th className='border-b border-slate-400'>비고</th>
                        <td className='' colSpan={7}>없음</td>
                    </tr>
                </tbody>
            </table>
        </SectionBox>
    )
}

export default DetailInfoBox
