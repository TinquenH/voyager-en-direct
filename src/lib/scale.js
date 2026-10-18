export const MAP_RADIUS = 90;
const MAX_AU = 200;

export const compressDistance = (au) => {
  return Math.log1p(au) / Math.log1p(MAX_AU);
};

export const getMapPosition = (probeData) => {
  const angle = Math.atan2(probeData.y, probeData.x);
  const radius = compressDistance(probeData.distanceAu) * MAP_RADIUS;

  return {
    cx: radius * Math.cos(angle),
    cy: -radius * Math.sin(angle),
  };
};
