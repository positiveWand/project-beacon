export default function Header({ title, navTargets }) {
    function handleLoginButton() {
        console.log("로그인 버튼 클릭!");
    }
    function handleSignupButton() {
        console.log("회원가입 버튼 클릭!");
    }

    return (
        <header className="p-3 text-bg-dark">
            <div className="container d-flex align-items-center">
                <a href="/src/mainPage/" className="d-inline-flex align-items-center mb-2 mb-lg-0 px-3 text-white text-decoration-none">
                    <img src="/src/assets/beacon.png" alt="항로표지 아이콘" width={50} height={50}/>
                    <h1 className="mb-0 fw-bold"> {title} </h1>
                </a>
                <nav className="container d-flex justify-content-center">
                    <ul className="nav nav-pills me-auto">
                    { 
                        navTargets.map(aTarget => {
                            if(aTarget.active) {
                                return (
                                    <li className="nav-item">
                                        <a className="nav-link link-light link-opacity-50 active" onClick={() => console.log(aTarget.to)}>{aTarget.name}</a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="nav-item">
                                        <a className="nav-link link-light link-opacity-50" onClick={() => console.log(aTarget.to)}>{aTarget.name}</a>
                                    </li>
                                );
                            }
                        })
                    }
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-light me-2" onClick={handleLoginButton}>로그인</button>
                        <button className="btn btn-warning" onClick={handleSignupButton}>회원가입</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}