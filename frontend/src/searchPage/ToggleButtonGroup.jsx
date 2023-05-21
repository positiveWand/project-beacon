export default function ToggleButtonGroup({ groupContent, elementSpacing}) {
    return (
        <div>
            { 
                groupContent.map(aTarget => {
                    let styleClass = ["btn", "fw-bold"].concat(elementSpacing);
                    switch (aTarget.color) {
                        case "red":
                            styleClass.push("btn-outline-danger");
                            break;
                        case "yellow":
                            styleClass.push("btn-outline-warning");
                            break;
                        case "green":
                            styleClass.push("btn-outline-success");
                            break;
                        default:
                            break;
                    }

                    return (
                        <>
                            <input type="checkbox" className="btn-check" autoComplete="off" id={aTarget.id} onChange={aTarget.handler}/>
                            <label className={styleClass.join(" ")} htmlFor={aTarget.id}>{aTarget.text}</label>
                        </>
                    );
                })
            }
        </div>
    );
}