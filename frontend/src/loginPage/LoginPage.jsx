import LoginForm from './LoginForm';
import Header from '../searchPage/Header';

export default function LoginPage() {

  const navTarget = [
    {name: "홈", to: "/src/mainPage/", active: false},
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
      <LoginForm></LoginForm>
    </div>
  );
}
