import BoxItem from "./BoxItem";

export default function BoxList({content, itemClickHandler}) {
    return (
        <div className="overflow-y-auto">
            <ul className="p-2 d-flex flex-column h-100">
            {
                content.map(aTarget => {
                    let badgeText = undefined;
                    let badgeColor = undefined;
                    switch (aTarget.content.state) {
                        case "low":
                            badgeText = "낮음";
                            badgeColor = "green";
                            break;
                        case "medium":
                            badgeText = "중간";
                            badgeColor = "yellow";
                            break;
                        case "high":
                            badgeText = "높음";
                            badgeColor = "red";
                            break;
                        default:
                            break;
                    }
                    return <BoxItem 
                    itemKey={aTarget.id} 
                    title={aTarget.name} 
                    content={"위도: " + aTarget.content.lat + " 경도: " + aTarget.content.lng} 
                    badge={badgeText} 
                    badgeColor={badgeColor}
                    clickHandler={itemClickHandler}/>
                })
            }
            </ul>
        </div>
    );
}