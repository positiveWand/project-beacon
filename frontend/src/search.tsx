import React, {MouseEvent, ChangeEventHandler, FormEventHandler, MouseEventHandler, useState, useEffect, useSyncExternalStore} from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import MainLogo from './components/MainLogo'
import NavBar from './components/NavBar'
import NavItemAnchor from './components/NavItemAnchor'
import NavItemButton from './components/NavItemButton'
import TextInput from './components/TextInput.tsx'
import Form from './components/Form.tsx'
import Body from './components/Body.tsx'
import SubmitInput from './components/SubmitInput.tsx'
import ToggleButton from './components/ToggleButton.tsx'
import WaitingButton from './components/WaitingButton.tsx'
import MapContainer from './components/MapContainer.tsx'
import BoxList from './components/BoxList.tsx'
import ClickableBoxItem from './components/ClickableBoxItem.tsx'
import Badge from './components/Badge.tsx'
import UserInfo from './components/UserInfo.tsx'
import './index.css'

import BEACON_IMG from './assets/beacon.png'

import * as Route from './route.ts'
import MapStore from './components/utils/MapStore.tsx'
import {  BeaconModel, MapEventObject, Color, Session } from './components/utils/UtilType.ts'
import { useDefaultCursor, useWaitCursor } from './components/utils/UtilFunc.tsx'

import SEARCH_IMG from '/src/assets/searchpage/search.png'
import { testdata } from './TestData.tsx'

const mapStore = new MapStore();
type ToggleState = {
    unknown: boolean,
    low: boolean,
    medium: boolean,
    high: boolean,
    [attr: string]: boolean
}

function dateFormat(date: Date) {
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    let hour: string | number = date.getHours();
    let minute: string | number = date.getMinutes();
    let second: string | number = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function colorOfBeacon(aBeacon: BeaconModel): Color {
    let color: Color = 'gray'
    switch (aBeacon.state) {
        case 'low':
            color = 'green'
            break;
        case 'medium':
            color = 'yellow'
            break;
        case 'high':
            color = 'red'
            break;
    }
    return color
}

function stateOfBeacon(aBeacon: BeaconModel): string {
    let state: string = '알 수 없음'
    switch (aBeacon.state) {
        case 'low':
            state = '낮음'
            break;
        case 'medium':
            state = '중간'
            break;
        case 'high':
            state = '높음'
            break;
    }
    return state
}

function useVisibleBeacons(mapStore: MapStore) {
    function subscribe(callback: () => any) {
        let theListener = mapStore.addEventListener("update", (event: MapEventObject) => {
            callback();
        });
        
        return () => {
            mapStore.removeEventListener(theListener);
        };
    }
    return useSyncExternalStore(
        subscribe,
        () => {
            // console.log("mapStore changed!!")
            return mapStore.getVisibleBeacons();
        },
    )
}

function SearchPage() {
    const [session, setSession] = useState<Session>();
    const visibleBeacons = useVisibleBeacons(mapStore)
    const [keyword, setKeyword] = useState<string>('')
    const [syncTime, setSyncTime] = useState<string>(dateFormat(new Date()))
    const [toggleState, setToggleState] = useState<ToggleState>({unknown: true, low: true, medium: true, high: true})
    const [reseting, setReseting] = useState<boolean>(false)
    const [fetching, setFectching] = useState<boolean>(false)

    function checkLogin() {
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
    }

    function fetchBeacons() {
        // Map Beacons 요청
        setFectching(true);
        // fetch('https://projectbeacon.azurewebsites.net/beacon/all')
        // .then(result => {
        //     console.log(result)
        //     return result.json()
        // })
        // .then(beacon_list => {
        //     console.log("hi")
        //     console.log(beacon_list)
        //     mapStore.setBeacons(
        //         beacon_list as BeaconModel[]
        //     );
        //     setFectching(false);
        // });

        return new Promise<BeaconModel[]>(resolve => {
            setTimeout(() => {
                resolve(testdata as BeaconModel[])
            }, 2000);
        }).then(beacon_list => {
            console.log(beacon_list)
            mapStore.setBeacons(beacon_list)
            setFectching(false)
        });
    }

    useEffect(() => {
        checkLogin();
        mapStore.init();
        fetchBeacons();
        return () => {
            mapStore.destroy();
        }
    }, []);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setKeyword(e.target.value)
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        console.log('키워드 검색')
        console.log('키워드:', keyword)

        mapStore.addIntersectionFilter('keyword', aBeacon => aBeacon.name.includes(keyword))
    }

    const handleToggleChange = (checked: boolean, name: string) => {
        if(checked) {
            switch (name) {
                case 'unknown':
                    mapStore.addUnionFilter('unknown', aBeacon => aBeacon.state == undefined)
                    break;
                case 'low':
                    mapStore.addUnionFilter('low', aBeacon => aBeacon.state == 'low')
                    break;
                case 'medium':
                    mapStore.addUnionFilter('medium', aBeacon => aBeacon.state == 'medium')
                    break;
                case 'high':
                    mapStore.addUnionFilter('high', aBeacon => aBeacon.state == 'high')
                    break;
            }
        } else {
            switch (name) {
                case 'unknown':
                    mapStore.removeUnionFilter("unknown");
                    break;
                case 'low':
                    mapStore.removeUnionFilter("low");
                    break;
                case 'medium':
                    mapStore.removeUnionFilter("medium");
                    break;
                case 'high':
                    mapStore.removeUnionFilter("high");
                    break;
            }
        }
        toggleState[name] = checked
        setToggleState(JSON.parse(JSON.stringify(toggleState)))
    }

    const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
        return new Promise(resolve => {
            setReseting(true)
            mapStore.initFilters()
            setReseting(false)
            for (const key in toggleState) {
                toggleState[key] = true
            }
            setToggleState(JSON.parse(JSON.stringify(toggleState)))
            resolve('resolved')
        });
    }
    const handleUpdate = (event: MouseEvent<HTMLButtonElement>) => {
        new Promise(resolve => {
            setFectching(true)
            fetchBeacons().then(() => {
                setSyncTime(dateFormat(new Date()));
                setFectching(false)
            })
        });
    }

    const listItems = visibleBeacons.map((aBeacon: BeaconModel) => {
        const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
            console.log((event.currentTarget.querySelector("div > span") as HTMLElement).innerText);
            const targetKey = (event.currentTarget.querySelector("div > span") as HTMLElement).innerText;
            const targetBeacon = mapStore.getBeacons().find((aBeacon: BeaconModel) => aBeacon.id == targetKey);
            mapStore.moveAndZoomTo(targetBeacon.coordinate, 12);
            mapStore.showInfowindow(targetKey);
        }

        return (
            <ClickableBoxItem keyValue={aBeacon.id} onClick={handleClick} className='flex justify-between items-center hover:bg-gray-300 p-3 mb-2 rounded border border-gray-300'>
                <div>
                    <span hidden>{aBeacon.id}</span>
                    <h4 className='text-xl font-bold'>{aBeacon.name}</h4>
                    <p className=''>위도: {aBeacon.coordinate.lat} 경도: {aBeacon.coordinate.lng}</p>
                </div>
                <Badge color={colorOfBeacon(aBeacon)}>{stateOfBeacon(aBeacon)}</Badge>
            </ClickableBoxItem>
        )
    })

    return (
        <div className='h-screen flex flex-col'>
            <Header className='p-4 bg-blue-500 flex items-center'>
                <MainLogo logoLink={Route.MAIN_PAGE_URL} imgSrc={BEACON_IMG} text='B.M.S'/>
                <NavBar className='ml-6'>
                    <NavItemAnchor href={Route.MAIN_PAGE_URL} selected={false}>홈</NavItemAnchor>
                    <NavItemAnchor href={Route.SEARCH_PAGE_URL} selected={true}>탐색</NavItemAnchor>
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
            <Body className='flex flex-col overflow-y-auto flex-1'>
                <div className='grid grid-cols-11'>
                    <Form onSubmit={handleSubmit} className='flex items-center p-4 col-span-3 border-r-2 border-r-gray-300 border-b-2 border-b-gray-300'>
                        <img src={SEARCH_IMG} alt="돋보기" className='w-8 flex-none'/>
                        <TextInput type='search' name='keyword' placeholder='항로표지 이름...' useChange={onInputChange} inputStyle='text-xl p-2' className='grow mx-2'/>
                        <SubmitInput value='검색' className='bg-blue-500 hover:bg-blue-600 text-white text-lg px-3 py-2 rounded flex-none'/>
                    </Form>
                    <div className='flex items-center p-4 border-b-2 border-b-gray-300 col-span-8 justify-between select-none'>
                        <div className=''>
                            <ToggleButton 
                            checked={toggleState['unknown']}
                            color='gray'
                            name='unknown'
                            value='알 수 없음'
                            onChange={handleToggleChange}
                            className='px-3 py-2 mr-2 text-lg rounded font-bold'/>
                            <ToggleButton 
                            checked={toggleState['low']} 
                            color='green' 
                            value='낮음' 
                            name='low'
                            onChange={handleToggleChange} 
                            className='px-3 py-2 mr-2 text-lg rounded font-bold'/>
                            <ToggleButton 
                            checked={toggleState['medium']} 
                            color='yellow' 
                            name='medium'
                            value='중간'
                            onChange={handleToggleChange} 
                            className='px-3 py-2 mr-2 text-lg rounded font-bold'/>
                            <ToggleButton 
                            checked={toggleState['high']} 
                            color='red' 
                            name='high'
                            value='높음' 
                            onChange={handleToggleChange} 
                            className='px-3 py-2 mr-2 text-lg rounded font-bold'/>
                            <WaitingButton 
                            defaultText='초기화' 
                            waiting={reseting}
                            setWaiting={setReseting}
                            waitingText='초기화 중' 
                            onClick={handleReset} 
                            className='bg-blue-500 hover:bg-blue-600 text-white text-lg px-3 py-2 rounded'/>
                        </div>
                        <div className=''>
                            <WaitingButton
                            defaultText='업데이트' 
                            waiting={fetching} 
                            setWaiting={setFectching} 
                            waitingText='업데이트 중' 
                            onClick={handleUpdate} 
                            className='bg-blue-500 hover:bg-blue-600 text-white text-lg px-3 py-2 rounded mr-2'/>
                            <span className='text-lg'>업데이트 시간: {syncTime}</span>
                        </div>
                    </div>
                </div>
                <div className='overflow-y-auto grid grid-cols-11 flex-1'>
                    <BoxList className='overflow-y-auto col-span-3 border-r-2 border-r-gray-300'>
                        {listItems}
                    </BoxList>
                    <MapContainer mapStore={mapStore} className='col-span-8'/>
                </div>
            </Body>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchPage></SearchPage>
  </React.StrictMode>,
)
  