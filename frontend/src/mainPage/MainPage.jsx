import Header from '../searchPage/Header';
import WeatherBox from './WeatherBox';

export default function MainPage() {
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
          <div className="d-flex flex-column">
              <WeatherBox styleClass={["m-3", "p-3","border", "border-2", "rounded-2"]}/>
          </div>
      </div>
  );
}