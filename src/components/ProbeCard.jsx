import { useEffect, useState } from "react";
import { formatInteger, formatDuration, formatDecimal } from "../lib/format.js";
import { getProbe } from "../lib/api.js";

function ProbeCard({ probe, label }) {
  const [probeData, setProbeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProbe(probe);
        setProbeData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [probe]);

  let content;

  if (error) {
    content = <p>Oups : {error}</p>;
  } else if (!probeData) {
    content = <p>Chargement...</p>;
  } else {
    content = (
      <dl>
        <dt>Distance au Soleil</dt>
        <dd>{formatDecimal(probeData.distanceAu)} UA</dd>
        <dd>{formatInteger(probeData.distanceKm)} km</dd>
        <dt>Délai du signal radio</dt>
        <dd>{formatDuration(probeData.signalSeconds)}</dd>
        <dt>Vitesse</dt>
        <dd>{formatDecimal(probeData.speedKmS)} km/s</dd>
      </dl>
    );
  }

  return (
    <article>
      <h2>{label}</h2>
      {content}
    </article>
  );
}

export default ProbeCard;
