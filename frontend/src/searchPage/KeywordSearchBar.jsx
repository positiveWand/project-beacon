export default function KeywordSearchBar({handler, styleClass}) {
    return (
        <form action="#" role="search" onSubmit={handler} className={["fs-4", "d-flex", "align-items-center"].concat(styleClass).join(" ")}>
            <img src="/src/assets/searchPage/search.png" alt="돋보기 이미지" style={{width: "1.5em", height: "1.5em"}} className="me-2"/>
            <input type="search" name="name" placeholder="항로표지 이름..." className="form-control me-2"/>
            <input type="submit" value="검색" className="btn btn-primary"/>
        </form>
    );
}