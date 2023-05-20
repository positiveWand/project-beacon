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
        <div className="infowindow d-inline-flex flex-column align-items-center">
            <header className="container d-flex">
                <h2 className="mb-0">{info.name}</h2>
                <a href="#" className="d-inline-flex align-items-center ms-5">
                    <img src="/src/assets/searchPage/close.png" alt="닫기 버튼" width={25} height={25}/>
                </a>
            </header>
            <table className="table">
                    {
                        Object.keys(info.content).map(aKey => {
                            return (
                                <tr>
                                    <th scope="row">{aKey}</th>
                                    <td>{info.content[aKey]}</td>
                                </tr>
                            );
                        })
                    }
            </table>
            <button type="button" className="btn btn-primary">상세보기 &gt;</button>
        </div>
    );
}