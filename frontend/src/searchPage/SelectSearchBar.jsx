import { useState, useContext, useEffect } from "react";
import ToggleButtonGroup from "./ToggleButtonGroup";
import { MapStoreContext } from "./MapStoreContext";

export default function SelectSearchBar() {
    const [isChecked, setIsChecked] = useState([true, true, true]);
    const mapStore = useContext(MapStoreContext);

    useEffect(() => {
        setIsChecked([true, true, true]);
        mapStore.addPlusFilter("low", aBeacon => {
            return aBeacon.state == "low";
        });
        mapStore.addPlusFilter("medium", aBeacon => {
            return aBeacon.state == "medium";
        });
        mapStore.addPlusFilter("high", aBeacon => {
            return aBeacon.state == "high";
        });
    }, []);

    let selectContent= [
        {
            id: "low",
            text: "낮음",
            color: "green",
            checked: isChecked[0],
            handler: (event) => {
                console.log("low filter clicked");

                let newIsChecked = [...isChecked];
                newIsChecked[0] = !newIsChecked[0];
                setIsChecked(newIsChecked);
                console.log("hello", event.currentTarget.checked);
                if(event.currentTarget.checked) {
                    mapStore.addPlusFilter("low", aBeacon => {
                        return aBeacon.state == "low";
                    });
                } else {
                    mapStore.deletePlusFilter("low");
                }
                mapStore.filterBeacons();
            }
        },
        {
            id: "medium",
            text: "중간",
            color: "yellow",
            checked: isChecked[1],
            handler: (event) => {
                console.log("medium filter clicked");

                let newIsChecked = [...isChecked];
                newIsChecked[1] = !newIsChecked[1];
                setIsChecked(newIsChecked);

                if(event.currentTarget.checked) {
                    mapStore.addPlusFilter("medium", aBeacon => {
                        return aBeacon.state == "medium";
                    });
                } else {
                    mapStore.deletePlusFilter("medium");
                }
                mapStore.filterBeacons();
            }
        },
        {
            id: "high",
            text: "높음",
            color: "red",
            checked: isChecked[2],
            handler: (event) => {
                console.log("high filter clicked");

                let newIsChecked = [...isChecked];
                newIsChecked[2] = !newIsChecked[2];
                setIsChecked(newIsChecked);

                if(event.currentTarget.checked) {
                    mapStore.addPlusFilter("high", aBeacon => {
                        return aBeacon.state == "high";
                    });
                } else {
                    mapStore.deletePlusFilter("high");
                }
                mapStore.filterBeacons();
            }
        },
    ];

    return (
        <div>
            <ToggleButtonGroup groupContent={selectContent} elementSpacing="me-2"/>
        </div>
    );
}