import React, { ChangeEventHandler, FormEventHandler } from 'react'
import { useState } from "react";
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import MainLogo from './components/MainLogo'
import NavBar from './components/NavBar'
import NavItemAnchor from './components/NavItemAnchor'
import NavItemButton from './components/NavItemButton'
import Body from './components/Body.tsx'
import Form from './components/Form.tsx';
import TextInput from './components/TextInput.tsx';
import './index.css'

import beaconLogo from './assets/beacon.png'

import * as Route from './route.ts'
import SubmitInput from './components/SubmitInput.tsx';

import { LoginModel } from './components/utils/UtilType.ts';
import { useDefaultCursor, useWaitCursor } from './components/utils/UtilFunc.tsx';

const idPattern = "^[a-zA-Z][a-zA-Z0-9]*$";
const passwordPattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

function LoginPage() {
    const [invalidLogin, setInvalidLogin] = useState<boolean>(false);
    const [invalidId, setInvalidId] = useState<boolean>();
    const [invalidPassword, setInvalidPassword] = useState<boolean>();
    const [loginData, setLoginData] = useState<LoginModel>({id: '', password: ''});
    const [formMessage, setFormMessage] = useState<string>('아이디 또는 비밀번호가 잘못되었습니다.');

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        console.log('submit')
        e.preventDefault();

        console.log(loginData)
        if(!loginData.id.match(idPattern)) {
            setInvalidId(true)
        } else {
            setInvalidId(false)
        }
        if(!loginData.password.match(passwordPattern)) {
            setInvalidPassword(true)
        } else {
            setInvalidPassword(false)
        }
        if(!loginData.id.match(idPattern) || !loginData.password.match(passwordPattern)) {
            setInvalidLogin(true)
            setFormMessage('유효하지 않은 입력이 있습니다.')
            return
        }

        useWaitCursor();
        fetch('http://127.0.0.1:5000/login/request', {
            method: 'POST',
            body: JSON.stringify({id: loginData.id, password: loginData.password}),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(result => {
            return result.json()
        })
        .then(result => {
            if(result['result'] == 'true') {
                alert('로그인 성공');
                location.href = Route.MAIN_PAGE_URL;
            } else {
                alert('로그인 실패')
                setInvalidLogin(true);
                setFormMessage('아이디 또는 비밀번호가 잘못되었습니다.');
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
                setLoginData({id: e.target.value, password: loginData.password})
                break
            case 'password':
                setLoginData({id: loginData.id, password: e.target.value})
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
                <Form label='로그인' invalid={invalidLogin} invalidMessage={formMessage} onSubmit={handleSubmit} className='border-gray-300 border-2 rounded-lg p-6 mt-6 flex flex-col w-1/4'>
                    <TextInput label='아이디' type='text' name='id' required={true} invalid={invalidId} invalidMessage='영문, 숫자만 가능합니다!' useChange={onInputChange} placeholder='아이디 입력...' className='mb-6' inputStyle='block w-full text-xl p-2 mb-2'/>
                    <TextInput label='비밀번호' type='password' name='password' required={true} invalid={invalidPassword} invalidMessage='8자리 이상이면서 영문, 숫자, 특수문자를 반드시 포함해야합니다!' useChange={onInputChange} placeholder='비밀번호 입력...' inputStyle='block w-full text-xl p-2 mb-2' />
                    <SubmitInput value='로그인' className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold p-3 rounded mt-8 active:bg-blue-800'/>
                </Form>
            </Body>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginPage></LoginPage>
  </React.StrictMode>,
)
  