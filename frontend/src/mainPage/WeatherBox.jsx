import { useState, useEffect } from "react";
import black_marker_img from "/src/assets/black_marker.png";

export default function WeatherBox({styleClass}) {
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        const apiKey = 'fb12024bc85a368adf85c553d153df91';
        const city = 'Daejeon';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr`;
  
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
    }, []);
  
    return (
        <div className={["d-flex", "justify-content-center"].concat(styleClass).join(' ')}>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center">
                    <img src={black_marker_img} alt="마커" height={20} width={20}/>
                    <span className="ms-1">{(weather ? weather.name : "") + " 날씨"}</span>
                </div>
                <h2>날씨: {weather ? weather.weather[0].main : "-"}</h2>
                <img src={weather ? "https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png" : ""} alt="날씨 아이콘" />
                <p className="m-0">온도: {weather ? Math.round(weather.main.temp - 273.15) : "-"}°C</p> 
                <p className="m-0">습도: {weather ? weather.main.humidity : "-"}%</p> 
            </div>
        </div>
    );
  }