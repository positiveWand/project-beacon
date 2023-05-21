import { useState, useContext, useEffect } from "react";
import ToggleButtonGroup from "./ToggleButtonGroup";
import { MapStoreContext } from "./MapStoreContext";

export default function SelectSearchBar({ checked, setChecked }) {
    const mapStore = useContext(MapStoreContext);

    let selectContent= [
        {
            id: "low",
            text: "낮음",
            color: "green",
            checked: checked[0],
            handler: (event) => {
                console.log("low filter clicked");

                let newChecked = [...checked];
                newChecked[0] = !newChecked[0];
                setChecked(newChecked);
                console.log("hello", event.currentTarget.checked);
                if(event.currentTarget.checked) {
                    mapStore.addUnionFilter("low", aBeacon => {
                        return aBeacon.state == "low";
                    });
                } else {
                    mapStore.deleteUnionFilter("low");
                }
            }
        },
        {
            id: "medium",
            text: "중간",
            color: "yellow",
            checked: checked[1],
            handler: (event) => {
                console.log("medium filter clicked");

                let newChecked = [...checked];
                newChecked[1] = !newChecked[1];
                setChecked(newChecked);

                if(event.currentTarget.checked) {
                    mapStore.addUnionFilter("medium", aBeacon => {
                        return aBeacon.state == "medium";
                    });
                } else {
                    mapStore.deleteUnionFilter("medium");
                }
            }
        },
        {
            id: "high",
            text: "높음",
            color: "red",
            checked: checked[2],
            handler: (event) => {
                console.log("high filter clicked");

                let newChecked = [...checked];
                newChecked[2] = !newChecked[2];
                setChecked(newChecked);

                if(event.currentTarget.checked) {
                    mapStore.addUnionFilter("high", aBeacon => {
                        return aBeacon.state == "high";
                    });
                } else {
                    mapStore.deleteUnionFilter("high");
                }
            }
        },
    ];

    return (
        <div>
            <ToggleButtonGroup groupContent={selectContent} elementSpacing="me-2"/>
        </div>
    );
}