import {MyComponentProp} from "./utils/UtilType"

interface Prop extends MyComponentProp {
    logoLink: string,
    imgSrc: string,
    text: string
}

function MainLogo({logoLink, imgSrc, text}: Prop) {
  return (
    <a href={logoLink} className='flex items-center'>
        <img src={imgSrc} alt='메인 로고 이미지' className='inline w-12' />
        <h1 className='inline text-4xl font-bold text-white'>{text}</h1>
    </a>
  )
}

export default MainLogo
