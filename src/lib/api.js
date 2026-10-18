import { parseHorizons } from "./horizons.js";

export const getProbe = async (probe) => {
  const url = `/api/horizons?probe=${probe}`;
  // 1. Appeler l'adresse du proxy avec la sonde demandée
  const response = await fetch(url);
  // 2. Lire le corps de la réponse en JSON (ça peut échouer !)
  const body = await response.json().catch(() => null);
  // 3. Si on n'a pas pu lire de JSON → erreur « réponse illisible »
  if (!body) {
    throw new Error("Réponse illisible");
  }
  // 4. Si la réponse n'est pas ok → erreur avec le message du serveur (body.error)
  if (!response.ok) {
    throw new Error(body.error ?? `Erreur ${response.status}`);
  }
  // 5. Décoder body.result avec parseHorizons et renvoyer le résultat
  return parseHorizons(body.result);
};
