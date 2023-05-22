import { useState } from "react";

export default function SignupForm() {
    const [userid, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUseridChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('회원가입 정보:', { userid, email, password });
        
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <div>
            <label htmlFor="userid">사용자 아이디:</label>
            <input type="text" id="userid" value={userid} onChange={handleUseridChange} />
        </div>
        <div>
            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
            <label htmlFor="password">비밀번호:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">가입하기</button>
        </form>
    );
}