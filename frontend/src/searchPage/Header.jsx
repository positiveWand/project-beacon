export default function Header({ title, navTargets }) {
    function handleLoginButton() {
        console.log("로그인 버튼 클릭!");
    }
    function handleSignupButton() {
        console.log("회원가입 버튼 클릭!");
    }

    return (
        <header className="p-3 text-bg-primary border-bottom border-2">
            <div className="d-flex align-items-center">
                <a href="/src/mainPage/" className="d-inline-flex align-items-center mb-2 mb-lg-0 px-3 text-white text-decoration-none">
                    <img src="/src/assets/beacon.png" alt="항로표지 아이콘" width={50} height={50}/>
                    <h1 className="mb-0 fw-bold"> {title} </h1>
                </a>
                <nav className="flex-fill d-flex align-items-center justify-content-between">
                    <ul className="nav nav-underline ms-4">
                    { 
                        navTargets.map(aTarget => {
                            if(aTarget.active) {
                                return (
                                    <li className="nav-item me-2">
                                        <a className="nav-link active text-light" onClick={() => console.log(aTarget.to)} href="#">{aTarget.name}</a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="nav-item me-2">
                                        <a className="nav-link text-light" onClick={() => console.log(aTarget.to)} href="#">{aTarget.name}</a>
                                    </li>
                                );
                            }
                        })
                    }
                    </ul>
                    <div>
                        <button type="button" className="btn btn-light fw-bold me-2" onClick={handleLoginButton}>로그인</button>
                        <button className="btn btn-light fw-bold" onClick={handleSignupButton}>회원가입</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}