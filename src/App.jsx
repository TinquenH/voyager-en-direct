import ProbeCard from "./components/ProbeCard.jsx";
import SolarMap from "./components/SolarMap.jsx";
import { useProbe } from "./lib/useProbe.js";

function App() {
  const { probeData: voyager1Data, error: voyager1Error } =
    useProbe("voyager1");
  const { probeData: voyager2Data, error: voyager2Error } =
    useProbe("voyager2");

  return (
    <main className="page">
      <h1>Voyager en direct</h1>
      <p className="note">
        Positions calculées à partir de la trajectoire des sondes (JPL Horizons,
        NASA), et non issues d'une télémétrie en direct.
      </p>
      <ProbeCard
        probeData={voyager1Data}
        error={voyager1Error}
        label="Voyager 1"
        color="var(--voyager1)"
      />
      <ProbeCard
        probeData={voyager2Data}
        error={voyager2Error}
        label="Voyager 2"
        color="var(--voyager2)"
      />
      <SolarMap />
    </main>
  );
}

export default App;
