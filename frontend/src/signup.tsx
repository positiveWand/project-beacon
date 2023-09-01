import React from 'react'
import { useState, useEffect, FormEventHandler, ChangeEventHandler } from "react";
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import MainLogo from './components/MainLogo'
import NavBar from './components/NavBar'
import NavItemAnchor from './components/NavItemAnchor'
import NavItemButton from './components/NavItemButton'
import Body from './components/Body.tsx'
import Form from './components/Form.tsx'
import TextInput from './components/TextInput.tsx'
import SubmitInput from './components/SubmitInput.tsx'
import { Session } from './components/utils/UtilType.ts';
import './index.css'

import beaconLogo from './assets/beacon.png'

import * as Route from './route.ts'
import { SignupModel } from './components/utils/UtilType.ts';
import { useDefaultCursor, useWaitCursor } from './components/utils/UtilFunc.tsx';

const idPattern = "^[a-zA-Z][a-zA-Z0-9]*$";
const passwordPattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";
const emailPattern = "^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$";

function SignupPage() {
    const [invalidSignup, setInvalidSignup] = useState<boolean>(false)
    const [invalidId, setInvalidId] = useState<boolean>();
    const [invalidEmail, setInvalidEmail] = useState<boolean>();
    const [invalidPassword, setInvalidPassword] = useState<boolean>();
    const [invalidRepassword, setInvalidRepassword] = useState<boolean>();
    const [signupData, setSignupData] = useState<SignupModel>({id: '', email: '', password: '', repassword: ''});
    const [formMessage, setFormMessage] = useState<string>('아이디 또는 비밀번호가 잘못되었습니다.')

    function checkLogin() {
        useWaitCursor();
        return fetch(Route.API_BASE_URL+'/login/check', {
            credentials: "include",
        })
        .then(result => {
            return result.json()
        })
        .then(result => {
            if(result['result'] == 'true') {
                alert("이미 로그인되어 있는 상태입니다.");
                location.href = Route.MAIN_PAGE_URL;
            }
            useDefaultCursor();
        })
        .catch(() => {
            useDefaultCursor();
        })
    }

    useEffect(() => {
        checkLogin()
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        console.log('submit')
        e.preventDefault();

        console.log(signupData)
        if(!signupData.id.match(idPattern)) {
            setInvalidId(true)
        } else {
            setInvalidId(false)
        }
        if(!signupData.email.match(emailPattern)) {
            setInvalidEmail(true)
        } else {
            setInvalidEmail(false)
        }
        if(!signupData.password.match(passwordPattern)) {
            setInvalidPassword(true)
        } else {
            setInvalidPassword(false)
        }
        if(!signupData.repassword.match('^'+signupData.password+'$')) {
            setInvalidRepassword(true)
        } else {
            setInvalidRepassword(false)
        }
        if(!signupData.id.match(idPattern) || !signupData.email.match(emailPattern) || !signupData.password.match(passwordPattern) || !signupData.repassword.match('^'+signupData.password+'$')) {
            setInvalidSignup(true)
            setFormMessage('유효하지 않은 입력이 있습니다.')
            return
        }

        setInvalidSignup(false)
        setFormMessage('회원가입 요청 중')
        useWaitCursor()

        fetch(Route.API_BASE_URL+'/signup/request', {
            method: 'POST',
            body: JSON.stringify({id: signupData.id, password: signupData.password, email: signupData.email}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(result => {
            return result.text()
        })
        .then(result => {
            if(result == 'true') {
                alert('회원가입 성공');
                location.href = Route.LOGIN_PAGE_URL;
            } else {
                console.log(result)
                alert('회원가입 실패')
                setInvalidSignup(true);
                setFormMessage('중복된 아이디가 있거나 서버에 문제가 있습니다.');
                useDefaultCursor();
            }
        })
        .catch(() => {
            useDefaultCursor();
        })

    }

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        switch(e.target.name) {
            case 'id':
                setSignupData({id: e.target.value, email:signupData.email, password: signupData.password, repassword: signupData.repassword})
                break
            case 'email':
                setSignupData({id: signupData.id, email: e.target.value, password: signupData.password, repassword: signupData.repassword})
                break
            case 'password':
                setSignupData({id: signupData.id, email: signupData.email, password: e.target.value, repassword: signupData.repassword})
                break
            case 'repassword':
                setSignupData({id: signupData.id, email: signupData.email, password: signupData.password, repassword: e.target.value})
                break
        }
    }

    return (
        <div className='h-screen flex flex-col'>
            <Header className='p-4 bg-blue-500 flex items-center'>
                <MainLogo logoLink={Route.MAIN_PAGE_URL} imgSrc={beaconLogo} text='B.M.S'/>
                <NavBar className='ml-6'>
                    <NavItemAnchor href={Route.MAIN_PAGE_URL} selected={false}>홈</NavItemAnchor>
                    <NavItemAnchor href={Route.SEARCH_PAGE_URL} selected={false}>탐색</NavItemAnchor>
                </NavBar>
                <NavBar className='ml-auto'>
                    <NavItemButton href={Route.LOGIN_PAGE_URL}>로그인</NavItemButton>
                    <NavItemButton href={Route.SIGNUP_PAGE_URL}>회원가입</NavItemButton>
                </NavBar>
            </Header>
            <Body className='px-8 py-6 flex justify-center'>
                <Form label='회원가입' invalid={invalidSignup} invalidMessage={formMessage} onSubmit={handleSubmit} className='border-gray-300 border-2 rounded-lg p-6 mt-6 flex flex-col max-w-md flex-1'>
                    <TextInput label='아이디' type='text' name='id' required={true} invalid={invalidId} invalidMessage='영문, 숫자만 가능합니다!' placeholder='영문, 숫자만 가능' useChange={onInputChange} className='mb-6' inputStyle='block w-full text-xl p-2 mb-2'/>
                    <TextInput label='이메일' type='email' name='email' required={true} invalid={invalidEmail} invalidMessage='이메일을 올바른 형식으로 입력해야합니다.' placeholder='your@example.com' useChange={onInputChange} className='mb-6' inputStyle='block w-full text-xl p-2 mb-2'/>
                    <TextInput label='비밀번호' type='password' name='password' required={true} invalid={invalidPassword} invalidMessage='8자리 이상이면서 영문, 숫자, 특수문자를 반드시 포함해야합니다!' placeholder='8자리 이상 영문, 숫자, 특수문자 포함' useChange={onInputChange} inputStyle='block w-full text-xl p-2 mb-2'/>
                    <TextInput type='password' name='repassword' required={true} invalid={invalidRepassword} validMessage='비밀번호가 일치합니다.' invalidMessage='위에 입력한 비밀번호와 같지 않습니다.' placeholder='비밀번호 재입력' useChange={onInputChange} inputStyle='block w-full text-xl p-2 mb-2'/>
                    <SubmitInput value='회원가입' className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold p-3 rounded mt-8 active:bg-blue-800'/>
                </Form>
            </Body>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SignupPage></SignupPage>  
    </React.StrictMode>,
)