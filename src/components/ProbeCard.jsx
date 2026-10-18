import { formatInteger, formatDuration, formatDecimal } from "../lib/format.js";

function ProbeCard({ label, color, probeData, error }) {
  let content;

  if (error) {
    content = <p>Oups : {error}</p>;
  } else if (!probeData) {
    content = <p>Chargement...</p>;
  } else {
    content = (
      <dl>
        <dt>Distance au Soleil</dt>
        <dd>
          <span className="big">{formatDecimal(probeData.distanceAu)}</span> UA
        </dd>
        <dd>{formatInteger(probeData.distanceKm)} km</dd>
        <dt>Délai du signal radio</dt>
        <dd>
          <span className="big">{formatDuration(probeData.signalSeconds)}</span>
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
