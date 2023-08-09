import {MyComponentProp} from "./utils/UtilType";

interface Prop extends MyComponentProp {
    href: string,
}

function NavItemButton({href, children}: Prop) {

    const handleClick = () => {
        location.href = href;
    }

    return (
        <li className="inline px-1.5">
            <button className='bg-slate-200 hover:bg-slate-300 px-2 py-1.5 rounded' onClick={handleClick}>{children}</button>
        </li>
    )
}

export default NavItemButton
