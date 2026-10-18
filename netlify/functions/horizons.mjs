// Proxy Netlify : appelle JPL Horizons à la place du navigateur (qui est bloqué par le CORS).
// Format "classique" des fonctions Netlify : on exporte une fonction nommée `handler`.
// Usage côté page : fetch('/api/horizons?probe=voyager1&center=sun')

const HORIZONS_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';

// Liste blanche : on n'accepte que ces valeurs, pour ne pas devenir un proxy ouvert à tout le monde.
const PROBES = { voyager1: '-31', voyager2: '-32' };
const CENTERS = { sun: '500@10', earth: '500@399' };

// Petit utilitaire : construit une réponse JSON
const json = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...extraHeaders },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const params = event.queryStringParameters ?? {};
  const probe = params.probe;
  const center = params.center ?? 'sun';

  if (!Object.hasOwn(PROBES, probe) || !Object.hasOwn(CENTERS, center)) {
    return json(400, { error: 'Paramètres invalides' });
  }

  // Dates du jour et du lendemain (UTC), au format AAAA-MM-JJ
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000);
  const day = (d) => d.toISOString().slice(0, 10);

  const query = new URLSearchParams({
    format: 'json',
    COMMAND: `'${PROBES[probe]}'`,
    EPHEM_TYPE: 'VECTORS',
    CENTER: `'${CENTERS[center]}'`,
    OUT_UNITS: 'AU-D',
    VEC_TABLE: '3',
    START_TIME: `'${day(today)}'`,
    STOP_TIME: `'${day(tomorrow)}'`,
    STEP_SIZE: "'1 d'",
  });

  try {
    const upstream = await fetch(`${HORIZONS_URL}?${query}`);
    if (!upstream.ok) {
      return json(502, { error: `Horizons a répondu ${upstream.status}` });
    }
    const data = await upstream.json();
    return json(200, data, { 'Cache-Control': 'public, max-age=300' }); // 5 minutes
  } catch {
    return json(502, { error: 'Horizons injoignable' });
  }
};
