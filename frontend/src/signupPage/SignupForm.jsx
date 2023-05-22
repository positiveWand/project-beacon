import { useState, useRef } from "react";

const mainLabelSize = 2;
const subLabelSize = 6;
const inputTextSize = 5;

const idPattern = "^[a-zA-Z][a-zA-Z0-9]*$";
const passwordPattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

export default function SignupForm({styleClass}) {
    const [signupError, setSignupError] = useState(false);
    const [userid, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [errorMessage, setErrorMessage] = useState('아이디 또는 비밀번호가 잘못되었습니다.');
    const formElement = useRef(null);

    const handleUseridChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordCheckChange = (event) => {
        setPasswordCheck(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('회원가입 정보:', { userid, email, password });
        formElement.current.classList.add('was-validated');
    };

    return (
        <form onSubmit={handleSubmit} className={['py-5', 'px-4', 'border', 'border-3', 'rounded-3'].concat(styleClass).join(" ")} ref={formElement} noValidate>
            <h2 className={['text-center', 'fw-bold', 'border-bottom', 'border-2', 'pb-4', 'mb-4','fs-'+mainLabelSize].join(' ')}>회원가입</h2>
            {signupError && <p className={['text-center', 'text-danger', 'fs-'+subLabelSize].join(' ')}>{errorMessage}</p>}
            <div className='d-flex flex-column'>
                <label htmlFor="userid" className={['form-label', 'fw-bold', 'fs-'+subLabelSize].join(' ')}>아이디</label>
                <input type="text" id="userid" value={userid} onChange={handleUseridChange} className={['form-control', 'fs-'+inputTextSize].join(' ')} placeholder="영문, 숫자만 가능" pattern={idPattern} required/>
                <div className='valid-feedback'>유효한 입력입니다.</div>
                <div className='invalid-feedback'>영문, 숫자만 가능합니다!</div>
            </div>
            <div className='d-flex flex-column mt-3'>
                <label htmlFor="email" className={['form-label', 'fw-bold', 'fs-'+subLabelSize].join(' ')}>이메일</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} className={['form-control', 'fs-'+inputTextSize].join(' ')}  placeholder="이메일 주소 입력" required/>
                <div className='valid-feedback'>유효한 입력입니다.</div>
                <div className='invalid-feedback'>이메일을 올바르게 입력해야합니다.</div>
            </div>
            <div className='d-flex flex-column mt-3'>
                <label htmlFor="password" className={['form-label', 'fw-bold', 'fs-'+subLabelSize].join(' ')}>비밀번호</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} className={['form-control', 'fs-'+inputTextSize].join(' ')} placeholder="8자리 이상 영문, 숫자, 특수문자 포함" pattern={passwordPattern} required/>
                <div className='valid-feedback'>유효한 입력입니다.</div>
                <div className='invalid-feedback'>8자리 이상이면서 영문, 숫자, 특수문자를 반드시 포함해야합니다!</div>
            </div>
            <div>
                <input type="password" id="passwordCheck" value={passwordCheck} onChange={handlePasswordCheckChange} className={['form-control', 'mt-2', 'fs-'+inputTextSize].join(' ')} placeholder="비밀번호 확인" pattern={"^"+password+"$"} required/>
                <div className='valid-feedback'>유효한 입력입니다.</div>
                <div className='invalid-feedback'>비밀번호가 일치하지 않습니다.</div>
            </div>
            <button type="submit" className={['btn', 'btn-primary', 'w-100', 'mt-4', 'py-3', 'fw-bold', 'fs-'+inputTextSize].join(' ')}>로그인</button>
        </form>
    );
}