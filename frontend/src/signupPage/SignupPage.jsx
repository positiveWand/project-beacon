import SignupForm from './SignupForm';
import Header from '../searchPage/Header';

export function SignupPage() {
    const navTarget = [
        {name: "홈", to: "/src/mainPage/", active: false},
        {name: "탐색", to: "/src/searchPage/", active: false},
    ];

    function handleToLoginButton() {
        console.log("로그인 버튼 클릭");
        location.href = "/src/loginPage/";
    }
    function handleToSignupButton() {
        console.log("회원가입 버튼 클릭");
        location.href = "/src/signupPage/";
    }

    return (
        <div className="d-flex flex-column overflow-y-auto">
            <Header title="B.M.S" navTargets={navTarget} toLoginHandler={handleToLoginButton} toSignupHandler={handleToSignupButton} />
            <div className='d-flex justify-content-center'>
                <SignupForm styleClass={['w-25 mt-5']}/>
            </div>
        </div>  
    );
}
