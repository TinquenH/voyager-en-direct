import { compressDistance } from "../lib/scale.js";

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
const MAP_RADIUS = 90;

function SolarMap() {
  return (
    <svg
      viewBox="-100 -100 200 200"
      role="img"
      aria-label="Carte du Système Solaire"
    >
      <circle cx="0" cy="0" r="5" fill="orange" />
      {PLANETS.map((planet) => {
        return (
          <circle
            key={planet.name}
            cx="0"
            cy="0"
            r={compressDistance(planet.distance) * MAP_RADIUS}
            fill="none"
            stroke="gray"
          />
        );
      })}
    </svg>
  );
}

export default SolarMap;
