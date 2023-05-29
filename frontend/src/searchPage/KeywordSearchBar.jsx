import search_img from "/src/assets/searchpage/search.png";

export default function KeywordSearchBar({ keyword, setKeyword, onSubmit, styleClass }) {
    function handleTextChange(event) {
        setKeyword(event.currentTarget.value);
    }

    return (
        <form action="#" role="search" onSubmit={onSubmit} className={["fs-4", "d-flex", "align-items-center"].concat(styleClass).join(" ")}>
            <img src={search_img} alt="돋보기 이미지" style={{width: "1.5em", height: "1.5em"}} className="me-2"/>
            <input type="search" name="name" placeholder="항로표지 이름..." className="form-control me-2" onChange={handleTextChange} value={keyword}/>
            <input type="submit" value="검색" className="btn btn-primary"/>
        </form>
    );
}