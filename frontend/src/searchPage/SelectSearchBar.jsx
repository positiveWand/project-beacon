import ToggleButtonGroup from "./ToggleButtonGroup";

export default function SelectSearchBar() {
    let testNameAndHandler= [
        {
            id: "low",
            text: "낮음",
            color: "green",
            handler: () => {
                console.log("항목1");
                console.log(mapStore);
            }
        },
        {
            id: "medium",
            text: "중간",
            color: "yellow",
            handler: () => {
                console.log("항목2");
                console.log(mapStore);
            }
        },
        {
            id: "high",
            text: "높음",
            color: "red",
            handler: () => {
                console.log("항목3");
                console.log(mapStore);
            }
        },
    ];

    return (
        <div>
            <ToggleButtonGroup groupContent={testNameAndHandler} elementSpacing="me-2"/>
        </div>
    );
}