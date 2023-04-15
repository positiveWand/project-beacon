import Header from './Header'
import MapContainer from './MapContainer';

export default function SearchPage() {
    const testNav = [
        {name: "link1", to: "link1 link"},
        {name: "link2", to: "link2 link"}
    ];

    return (
        <>
            <Header title="B.M.S" navTargets={testNav}></Header>
            <MapContainer/>
        </>
    );
}