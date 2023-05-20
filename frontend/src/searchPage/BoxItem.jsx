export default function BoxItem({itemKey, title, content, badge, badgeColor, clickHandler}) {
    let badgeClass = ["badge", "rounded-pill"];
    switch (badgeColor) {
        case "green":
            badgeClass.push("bg-success");
            break;
        case "yellow":
            badgeClass.push("bg-warning");
            break;
        case "red":
            badgeClass.push("bg-danger");
            break;
        default:
            break;
    }
    return (
        <li className="mb-2" key={itemKey} onClick={clickHandler}>
            <a href="#" className="nav-link d-flex justify-content-between align-items-center border rounded px-2 py-2 hover-bg-lightgray">
                <div>
                    <span hidden>{itemKey}</span>
                    <h4 className="m-0">{title}</h4>
                    <p className="m-0">{content}</p>
                </div>
                <span className={badgeClass.join(" ")}>{badge}</span>
            </a>
        </li>
    );
}