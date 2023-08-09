import { ChangeEventHandler, useEffect } from "react";
import {MyComponentProp} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";
import MapStore from "./utils/MapStore";

interface Prop extends MyComponentProp {
    mapStore: MapStore
}

function MapContainer({ mapStore, className }: Prop) {
    let classes = new ClassNames(className)

    return (
        <div id="map" className={classes.toString()}></div>
    );
}

export default MapContainer