import Header from './Header'
import MapContainer from './MapContainer';
import ControlBar from './ControlBar';
import {MapStore} from './MapStore';

const mapStore = new MapStore();

export default function SearchPage() {
    const navTarget = [
        {name: "홈", to: "link1 링크 URL", active: false},
        {name: "탐색", to: "link2 링크 URL", active: true},
    ];

    return (
        <>
            <Header title="B.M.S" navTargets={navTarget}></Header>
            <ControlBar mapStore={mapStore}/>
            <MapContainer mapStore={mapStore}/>
        </>
    );
}