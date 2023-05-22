import { useState } from 'react';

export default function LoginForm() {
  const [userid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleUseridChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userid === 'admin' && password === 'password') {
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
    <form className='' onSubmit={handleSubmit}>
      <h2>로그인</h2>
      {loginError && <p>아이디 또는 비밀번호가 잘못되었습니다.</p>}
      <div>
        <label htmlFor="userid">아이디:</label>
        <input type="text" id="userid" value={userid} onChange={handleUseridChange} />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}