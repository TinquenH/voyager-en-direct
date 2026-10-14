export const AU_KM = 149597870.7;
export const C_KM_S = 299792.458;
export const DAY_S = 86400;

export function parseHorizons(result) {
  const start = result.indexOf('$$SOE');
  const end = result.indexOf('$$EOE');
  if (start === -1 || end === -1) {
    throw new Error('Réponse Horizons sans données : ' + result.trim().slice(0, 200));
  }
  const block = result.slice(start + 5, end);
  const values = {};
  for (const [, key, num] of block.matchAll(/\b([A-Z]{1,2})\s*=\s*(-?\d+(?:\.\d+)?(?:E[+-]?\d+)?)/g)) {
    if (!(key in values)) values[key] = Number(num);
  }
  for (const k of ['X', 'Y', 'Z', 'VX', 'VY', 'VZ', 'RG']) {
    if (!Number.isFinite(values[k])) throw new Error(`Valeur manquante dans la réponse : ${k}`);
  }
  const distanceKm = values.RG * AU_KM;
  return {
    x: values.X, y: values.Y, z: values.Z,
    distanceAu: values.RG,
    distanceKm,
    signalSeconds: distanceKm / C_KM_S,
    speedKmS: Math.hypot(values.VX, values.VY, values.VZ) * AU_KM / DAY_S,
    lightTimeDays: values.LT,
  };
}
