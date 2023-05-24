import { useRef } from 'react';
import { useState } from 'react';

const mainLabelSize = 2;
const subLabelSize = 6;
const inputTextSize = 5;

const idPattern = "^[a-zA-Z][a-zA-Z0-9]*$";
const passwordPattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

export default function LoginForm({styleClass}) {
  const [userid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('아이디 또는 비밀번호가 잘못되었습니다.');
  const formElement = useRef(null);

  const handleUseridChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formElement.current.classList.add('was-validated');

    if(!formElement.current.checkValidity()) {
      return;
    }

    if (userid === 'admin' && password === 'password0!') {
      // 인증 성공
      console.log('로그인 성공');
      setLoginError(false);
      // 로그인 후에 리다이렉트 해야함
    } else {
      // 인증 실패
      console.log('로그인 실패');
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={['py-5', 'px-4', 'border', 'border-3', 'rounded-3'].concat(styleClass).join(" ")} ref={formElement} noValidate>
      <h2 className={['text-center', 'fw-bold', 'border-bottom', 'border-2', 'pb-4', 'mb-4','fs-'+mainLabelSize].join(' ')}>로그인</h2>
      {loginError && <p className={['text-center', 'text-danger', 'fs-'+subLabelSize].join(' ')}>{errorMessage}</p>}
      <div className='d-flex flex-column'>
        <label htmlFor="userid" className={['form-label', 'fw-bold', 'fs-'+subLabelSize].join(' ')}>아이디</label>
        <input type="text" id="userid" value={userid} onChange={handleUseridChange} className={['form-control', 'fs-'+inputTextSize].join(' ')} placeholder='아이디 입력' pattern={idPattern} required/>
        <div className='valid-feedback'>유효한 입력입니다.</div>
        <div className='invalid-feedback'>영문, 숫자만 가능합니다!</div>
      </div>
      <div className='d-flex flex-column mt-3'>
        <label htmlFor="password" className={['form-label', 'fw-bold', 'fs-'+subLabelSize].join(' ')}>비밀번호</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} className={['form-control', 'fs-'+inputTextSize].join(' ')} placeholder='비밀번호 입력' pattern={passwordPattern} required/>
        <div className='valid-feedback'>유효한 입력입니다.</div>
        <div className='invalid-feedback'>8자리 이상이면서 영문, 숫자, 특수문자를 반드시 포함해야합니다!</div>
      </div>
      <button type="submit" className={['btn', 'btn-primary', 'w-100', 'mt-4', 'py-3', 'fw-bold', 'fs-'+inputTextSize].join(' ')}>로그인</button>
    </form>
  );
}