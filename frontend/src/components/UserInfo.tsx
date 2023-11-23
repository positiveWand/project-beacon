import {MyComponentProp} from "./utils/UtilType";
import * as Route from '../route.ts'
import { useDefaultCursor, useWaitCursor } from "./utils/UtilFunc.tsx";

interface Prop extends MyComponentProp {
    name: string
}

function UserInfo({name, children}: Prop) {
    let handleClick = () => {
        useWaitCursor();
        fetch(Route.LOGOUT_PAGE_URL+'/request', {
            credentials: "include",
        })
        .then(result => {
            return result.text()
        }).then(result => {
            if(result == 'true') {
                // alert('로그아웃 성공')
            } else {
                // alert('로그아웃 실패')
            }
            useDefaultCursor();
            location.href = Route.MAIN_PAGE_URL;
        })
        .catch(() => {
            useDefaultCursor();
        })
    }

    return (
        <li className="inline px-1.5">
            <span className="mr-3 text-white">안녕하세요, <span className="font-bold">{name}</span>님!</span>
            <button className='bg-slate-200 hover:bg-slate-300 px-2 py-1.5 rounded' onClick={handleClick}>로그아웃</button>
        </li>
    )
}

export default UserInfo
