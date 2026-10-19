import { compressDistance, MAP_RADIUS, getMapPosition } from "../lib/scale.js";

const PLANETS = [
  { name: "Mercure", distance: 0.39 },
  { name: "Vénus", distance: 0.72 },
  { name: "Terre", distance: 1 },
  { name: "Mars", distance: 1.52 },
  { name: "Jupiter", distance: 5.2 },
  { name: "Saturne", distance: 9.54 },
  { name: "Uranus", distance: 19.2 },
  { name: "Neptune", distance: 30.1 },
];

function SolarMap({ voyager1, voyager2 }) {
  const position1 = voyager1 ? getMapPosition(voyager1) : null;
  const position2 = voyager2 ? getMapPosition(voyager2) : null;

  return (
    <svg
      className="solar-map"
      viewBox="-100 -100 200 200"
      role="img"
      aria-label="Carte du Système Solaire"
    >
      <circle className="sun" cx="0" cy="0" r="5" />
      {PLANETS.map((planet) => {
        return (
          <circle
            className="orbit"
            key={planet.name}
            cx="0"
            cy="0"
            r={compressDistance(planet.distance) * MAP_RADIUS}
          />
        );
      })}
      {position1 && (
        <circle
          className="probe-dot voyager1"
          cx={position1.cx}
          cy={position1.cy}
          r="3"
        />
      )}
      {position2 && (
        <circle
          className="probe-dot voyager2"
          cx={position2.cx}
          cy={position2.cy}
          r="3"
        />
      )}
    </svg>
  );
}

export default SolarMap;
