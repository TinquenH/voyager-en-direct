import { formatInteger, formatDuration, formatDecimal } from "../lib/format.js";
import { AU_KM, C_KM_S } from "../lib/horizons.js";

function ProbeCard({ label, color, probeData, error, nowMs }) {
  let content;

  if (error) {
    content = <p>Oups : {error}</p>;
  } else if (!probeData) {
    content = <p>Chargement...</p>;
  } else {
    const secondsElapsed = (nowMs - probeData.epochMs) / 1000;
    const currentDistanceKm =
      probeData.distanceKm + probeData.radialSpeedKmS * secondsElapsed;
    const currentDistanceAu = currentDistanceKm / AU_KM;
    const currentSignalSeconds = currentDistanceKm / C_KM_S;
    content = (
      <dl>
        <dt>Distance au Soleil</dt>
        <dd>
          <span className="big">{formatDecimal(currentDistanceAu)}</span> UA
        </dd>
        <dd>{formatInteger(currentDistanceKm)} km</dd>
        <dt>Délai du signal radio</dt>
        <dd>
          <span className="big">{formatDuration(currentSignalSeconds)}</span>
        </dd>
        <dt>Vitesse</dt>
        <dd>
          <span className="big">{formatDecimal(probeData.speedKmS)}</span> km/s
        </dd>
      </dl>
    );
  }

  return (
    <article className="probe-card" style={{ "--probe": color }}>
      <h2>{label}</h2>
      {content}
    </article>
  );
}

export default ProbeCard;
