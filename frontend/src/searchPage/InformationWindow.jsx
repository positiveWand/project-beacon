export default function InformationWindow({info}) {
    let testInfo = {
        name: "Beacon 1",
        content: {
            lat: -1,
            lng: -2,
            susProb: "80%",
            state: "not good",
        },
    };


    return (
        <div className="infowindow d-inline-flex flex-column align-items-center bg-white border border-2 rounded-3 p-2">
            <header className="container d-flex mb-2">
                <h2 className="mb-0 me-5">{info.name}</h2>
                <a href="#" className="d-inline-flex align-items-center">
                    <img src="/src/assets/searchPage/close.png" alt="닫기 버튼" width={25} height={25}/>
                </a>
            </header>
            <table className="table">
                <tr>
                    <th scope="row">식별번호</th>
                    <td>{info.id}</td>
                </tr>
                <tr>
                    <th scope="row">위도</th>
                    <td>{info.content.lat}</td>
                </tr>
                <tr>
                    <th scope="row">경도</th>
                    <td>{info.content.lng}</td>
                </tr>
                <tr>
                    <th scope="row">고장 확률</th>
                    <td>{info.content.failure_prob}</td>
                </tr>
            </table>
            <button type="button" className="btn btn-primary">상세보기 &gt;</button>
        </div>
    );
}