import SignupForm from './SignupForm';
import Header from '../searchPage/Header';
import {MAIN_PAGE, SEARCH_PAGE, LOGIN_PAGE, SIGNUP_PAGE} from "/src/route"

export function SignupPage() {
    const navTarget = [
        {name: "홈", to: MAIN_PAGE, active: false},
        {name: "탐색", to: SEARCH_PAGE, active: false},
    ];

    function handleToLoginButton() {
        console.log("로그인 버튼 클릭");
        location.href = LOGIN_PAGE;
    }
    function handleToSignupButton() {
        console.log("회원가입 버튼 클릭");
        location.href = SIGNUP_PAGE;
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
