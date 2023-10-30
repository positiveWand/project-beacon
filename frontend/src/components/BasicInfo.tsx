import { useEffect, useState } from "react";
import{ BasicInfoModel, MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'
import SectionBox from './SectionBox'
import Heading from './Heading'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Prop extends MyComponentProp {
    imgURL: string
    model: BasicInfoModel
}

function BasicInfo({ imgURL, model, className }: Prop) {
    const [open, setOpen] = useState(false);
    const [weather, setWeather] = useState(null);

    let classes = new ClassNames(className)
    classes.add('flex')

    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = 'fb12024bc85a368adf85c553d153df91';
            const city = 'Daejeon';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${model.beacon_lat}&lon=${model.beacon_lng}&appid=${apiKey}&lang=kr`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setWeather(data);
                } else {
                console.log('날씨 정보를 가져오는 데 실패했습니다:', data.message);
                }
            } catch (error) {
                console.log('날씨 정보를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchWeather();
    }, [model])

    return (
        <SectionBox className={classes.toString()}>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                    {src: imgURL}
                ]}
            />
            <div className='flex-1 mr-5 flex flex-col'>
                <Heading level={2}>날씨 정보</Heading>
                <div className="border rounded-md shadow-md p-3 bg-slate-50 flex-1 flex flex-col items-center justify-center">
                    <div className="font-bold text-4xl">{weather ? weather.weather[0].main : "-"}</div>
                    <img src={weather ? "https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@4x.png" : ""} alt="날씨 아이콘" className="w-52"/>
                    <p className="text-xl">온도: {weather ? Math.round(weather.main.temp - 273.15) : "-"}°C</p> 
                    <p className="text-xl">습도: {weather ? weather.main.humidity : "-"}%</p> 
                </div>
            </div>
            <div className='flex-1'>
                <Heading level={2}>관리 정보</Heading>
                <div className='border rounded-md shadow-md p-3 bg-slate-100'>
                <table className='w-full border-collapse'>
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
                            <th>사진</th>
                            <td colSpan={7}><a onClick={() => setOpen(true)} className='text-blue-400 underline hover:text-bule-800 font-bold'>사진 보기</a></td>
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
            </div>
        </SectionBox>
    )
}

export default BasicInfo
