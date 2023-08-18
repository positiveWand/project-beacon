import {MyComponentProp} from "./utils/UtilType";
import * as Route from '../route.ts'

interface Prop extends MyComponentProp {
    name: string
}

function UserInfo({name, children}: Prop) {
    let handleClick = () => {
        document.querySelector('body').style.cursor = 'wait'
        fetch('http://127.0.0.1:5000/logout/request', {
            credentials: "include",
        })
        .then(result => {
            return result.text()
        }).then(result => {
            if(result == 'true') {
                alert('로그아웃 성공')
            } else {
                alert('로그아웃 실패')
            }
            document.querySelector('body').style.removeProperty('cursor')
            location.href = Route.MAIN_PAGE_URL;
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
