import React, { ChangeEventHandler, FormEventHandler } from 'react'
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import MainLogo from './components/MainLogo'
import NavBar from './components/NavBar'
import NavItemAnchor from './components/NavItemAnchor'
import NavItemButton from './components/NavItemButton'
import Body from './components/Body.tsx'
import UserInfo from './components/UserInfo.tsx';
import './index.css'

import beaconLogo from './assets/beacon.png'
import { Session } from './components/utils/UtilType.ts';

import * as Route from './route.ts'
import { useWaitCursor, useDefaultCursor } from './components/utils/UtilFunc.tsx';

function MainPage() {
    const [session, setSession] = useState<Session>();
    
    useEffect(() => {
        useWaitCursor();
        fetch('http://127.0.0.1:5000/login/check', {
            credentials: "include",
        })
        .then(result => {
            return result.json()
        })
        .then(result => {
            if(result['result'] == 'true') {
                setSession({id: result['id']})
            } else {
                setSession(null)
            }
            console.log('login check', result)
            useDefaultCursor();
        })
        .catch(() => {
            useDefaultCursor();
        })
    }, []);

    return (
        <div className='h-screen flex flex-col'>
            <Header className='p-4 bg-blue-500 flex items-center'>
            <MainLogo logoLink={Route.MAIN_PAGE_URL} imgSrc={beaconLogo} text='B.M.S'/>
            <NavBar className='ml-6'>
                <NavItemAnchor href={Route.MAIN_PAGE_URL} selected={true}>홈</NavItemAnchor>
                <NavItemAnchor href={Route.SEARCH_PAGE_URL} selected={false}>탐색</NavItemAnchor>
            </NavBar>
            <NavBar className='ml-auto'>
                {!session ? (
                    <>
                    <NavItemButton href={Route.LOGIN_PAGE_URL}>로그인</NavItemButton>
                    <NavItemButton href={Route.SIGNUP_PAGE_URL}>회원가입</NavItemButton>
                    </>
                ) : (
                    <>
                    <UserInfo name={session['id']}></UserInfo>
                    </>
                )}
            </NavBar>
            </Header>
            <Body className='px-8 py-6 flex justify-center'>
                메인페이지입니다.
            </Body>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainPage></MainPage>
  </React.StrictMode>,
)