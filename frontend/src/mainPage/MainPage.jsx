import React, { useEffect, useState } from 'react';
import Header from '../searchPage/Header';

export default function MainPage() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'fb12024bc85a368adf85c553d153df91';
      const city = 'Seoul';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

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

  if (!weather) {
    return <div>Loading...</div>;
  }

  const navTarget = [
      {name: "홈", to: "/src/mainPage/", active: true},
      {name: "탐색", to: "/src/searchPage/", active: false},
  ];

  function handleToLoginButton() {
    console.log("[메인페이지] 로그인 버튼 클릭");
    location.href = "/src/loginPage/";
  }
  function handleToSignupButton() {
      console.log("[메인페이지] 회원가입 버튼 클릭");
      location.href = "/src/signupPage/";
  }

  return (
      <div className="d-flex flex-column overflow-y-auto">
          <Header title="B.M.S" navTargets={navTarget} toLoginHandler={handleToLoginButton} toSignupHandler={handleToSignupButton} />
          <div>
              <h2>현재 날씨: {weather.weather[0]?.main}</h2> 
              <p>온도: {Math.round(weather.main?.temp - 273.15)}°C</p> 
              <p>습도: {weather.main?.humidity}%</p> 
          </div>
      </div>
  );
}