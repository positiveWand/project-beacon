import { useContext } from "react";
import ToggleButtonGroup from "./ToggleButtonGroup";
import { MapStoreContext } from "./MapStoreContext";

export default function SelectSearchBar() {
    const mapStore = useContext(MapStoreContext);
    let testNameAndHandler= [
        {
            id: "low",
            text: "낮음",
            color: "green",
            handler: (event) => {
                console.log("항목1");
                console.log(event.currentTarget.checked);
                if(event.currentTarget.checked) {
                    
                } else {

                }
            }
        },
        {
            id: "medium",
            text: "중간",
            color: "yellow",
            handler: (event) => {
                console.log("항목2");
                console.log(mapStore);
            }
        },
        {
            id: "high",
            text: "높음",
            color: "red",
            handler: (event) => {
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