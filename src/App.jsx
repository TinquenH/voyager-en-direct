import ProbeCard from "./components/ProbeCard.jsx";
import SolarMap from "./components/SolarMap.jsx";
import { useProbe } from "./lib/useProbe.js";
import { useNow } from "./lib/useNow.js";

function App() {
  const { probeData: voyager1Data, error: voyager1Error } =
    useProbe("voyager1");
  const { probeData: voyager2Data, error: voyager2Error } =
    useProbe("voyager2");
  const now = useNow();

  return (
    <main className="page">
      <h1>Voyager en direct</h1>
      <p className="note">
        Positions calculées à partir de la trajectoire des sondes (JPL Horizons,
        NASA), et non issues d'une télémétrie en direct.
      </p>
      <div className="layout">
        <SolarMap voyager1={voyager1Data} voyager2={voyager2Data} />
        <div className="cards">
          <ProbeCard
            nowMs={now}
            probeData={voyager1Data}
            error={voyager1Error}
            label="Voyager 1"
            color="var(--voyager1)"
          />
          <ProbeCard
            nowMs={now}
            probeData={voyager2Data}
            error={voyager2Error}
            label="Voyager 2"
            color="var(--voyager2)"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
