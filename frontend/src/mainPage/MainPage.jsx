import Header from '../searchPage/Header';
import WeatherBox from './WeatherBox';
import {MAIN_PAGE, SEARCH_PAGE, LOGIN_PAGE, SIGNUP_PAGE} from "/src/route"

export default function MainPage() {
  const navTarget = [
      {name: "홈", to: MAIN_PAGE, active: true},
      {name: "탐색", to: SEARCH_PAGE, active: false},
  ];

  function handleToLoginButton() {
    console.log("[메인페이지] 로그인 버튼 클릭");
    location.href = LOGIN_PAGE;
  }
  function handleToSignupButton() {
      console.log("[메인페이지] 회원가입 버튼 클릭");
      location.href = SIGNUP_PAGE;
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