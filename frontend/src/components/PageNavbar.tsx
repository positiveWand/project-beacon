import { MouseEventHandler } from 'react'
import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
    pageMax: number,
    currentPage: number,
    onChange: MouseEventHandler<HTMLButtonElement>
}

function PageNavbar({pageMax, currentPage, onChange, className, children}: Prop) {
    let classes = new ClassNames(className)
    classes.add('')

    const buttonStyle = new ClassNames('bg-gray-400 text-lg p-2 rounded mx-1 font-bold text-white')
    const selectedStyle = new ClassNames('bg-gray-400 text-lg p-2 rounded mx-1 font-bold text-black') 

    console.log(pageMax)
    let navList = Array(Math.min(pageMax+2, 9))

    const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
        onChange(event)
    }

    function simpleNav() {
        console.log(navList)
        navList[0] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == 1} className={buttonStyle.toString()}>&lt;</button>
            </li>
        )
        for (let i = 1; i <= pageMax; i++) {
            navList[i] = (
                <li>
                    <button onClick={handleChange} className={(i == currentPage) ? selectedStyle.toString() : buttonStyle.toString()}>{i}</button>
                </li>
            )
        }
        navList[pageMax+1] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == pageMax} className={buttonStyle.toString()}>&gt;</button>
            </li>
        )
    }
    function leftNav() {
        navList[0] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == 1} className={buttonStyle.toString()}>&lt;</button>
            </li>
        )
        for (let i = 1; i <= 5; i++) {
            navList[i] = (
                <li>
                    <button onClick={handleChange} className={(i == currentPage) ? selectedStyle.toString() : ''+buttonStyle.toString()}>{i}</button>
                </li>
            )
        }
        navList[6] = (
            <li>
                <button onClick={handleChange} disabled className={buttonStyle.toString()}>{'...'}</button>
            </li>
        )
        navList[7] = (
            <li>
                <button onClick={handleChange} className={buttonStyle.toString()}>{pageMax}</button>
            </li>
        )
        navList[8] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == pageMax} className={buttonStyle.toString()}>&gt;</button>
            </li>
        )
    }
    function rightNav() {
        navList[0] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == 1} className={buttonStyle.toString()}>&lt;</button>
            </li>
        )
        navList[1] = (
            <li>
                <button onClick={handleChange} className={buttonStyle.toString()}>{1}</button>
            </li>
        )
        navList[2] = (
            <li>
                <button onClick={handleChange} disabled className={buttonStyle.toString()}>{'...'}</button>
            </li>
        )
        for (let i = pageMax - 4; i <= pageMax; i++) {
            navList[7 - pageMax + i] = (
                <li>
                    <button onClick={handleChange} className={(i == currentPage) ? selectedStyle.toString() : ''+buttonStyle.toString()}>{i}</button>
                </li>
            )
        }
        navList[8] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == pageMax} className={buttonStyle.toString()}>&gt;</button>
            </li>
        )
    }
    function midNav() {
        navList[0] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == 1} className={buttonStyle.toString()}>&lt;</button>
            </li>
        )
        navList[1] = (
            <li>
                <button onClick={handleChange} className={buttonStyle.toString()}>{1}</button>
            </li>
        )
        navList[2] = (
            <li>
                <button onClick={handleChange} disabled className={buttonStyle.toString()}>{'...'}</button>
            </li>
        )
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            navList[4 + i - currentPage] = (
                <li>
                    <button onClick={handleChange} className={(i == currentPage) ? selectedStyle.toString() : ''+buttonStyle.toString()}>{i}</button>
                </li>
            )
        }
        navList[6] = (
            <li>
                <button onClick={handleChange} disabled className={buttonStyle.toString()}>{'...'}</button>
            </li>
        )
        navList[7] = (
            <li>
                <button onClick={handleChange} className={buttonStyle.toString()}>{pageMax}</button>
            </li>
        )
        navList[8] = (
            <li>
                <button onClick={handleChange} disabled={currentPage == pageMax} className={buttonStyle.toString()}>&gt;</button>
            </li>
        )
    }

    if(pageMax <= 7) {
        console.log('simple')
        simpleNav()
    } else if(currentPage < 5) {
        console.log('left')
        leftNav()
    } else if(pageMax - 4 < currentPage) {
        console.log('right')
        rightNav()
    } else {
        console.log('middle')
        midNav()
    }

    return (
        <div className={classes.toString()}>
            {/* pageMax: {pageMax} <br />
            currentPage: {currentPage} */}
            <ol className='flex justify-center'>
                {navList}
            </ol>
        </div>
    )
}

export default PageNavbar
