export default function SearchPage({ title, navTargets }) {
    return (
        <>
            <header>
                <h1> {title} </h1>
            </header>
            <nav>
                { navTargets.map(aTarget => <a onClick={() => console.log(aTarget.to)}>{aTarget.name}</a>) }
            </nav>
        </>
    );
}