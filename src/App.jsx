import ProbeCard from "./components/ProbeCard.jsx";

function App() {
  return (
    <main className="page">
      <h1>Voyager en direct</h1>
      <p className="note">
        Positions calculées à partir de la trajectoire des sondes (JPL Horizons,
        NASA), et non issues d'une télémétrie en direct.
      </p>
      <ProbeCard probe="voyager1" label="Voyager 1" color="var(--voyager1)" />
      <ProbeCard probe="voyager2" label="Voyager 2" color="var(--voyager2)" />
    </main>
  );
}

export default App;
