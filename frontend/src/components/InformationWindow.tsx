import CROSS_IMG from "/src/assets/searchpage/close.png";
import {MyComponentProp, BeaconModel} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";

interface Prop extends MyComponentProp {
    model: BeaconModel
}

export default function InformationWindow({model}: Prop) {
    return (
        <div className="infowindow flex flex-col bg-white border-2 rounded-lg p-3 min-w-[250px]">
            <header className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold mr-4">{model.name}</h2>
                <a href="#" className="">
                    <img src={CROSS_IMG} alt="닫기 버튼" width={25} height={25}/>
                </a>
            </header>
            <table className="border-collapse my-3">
                <tr className="border-b border-b-gray-300">
                    <th scope="row" className='py-2'>식별번호</th>
                    <td>{model.id}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>위도</th>
                    <td>{model.coordinate.lat}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>경도</th>
                    <td>{model.coordinate.lng}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>고장 확률</th>
                    <td>{model.failure_prob}</td>
                </tr>
            </table>
            <button type="button" className="bg-blue-500 text-white p-2 rounded">상세보기 &gt;</button>
        </div>
    );
}