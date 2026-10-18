import { useState, useEffect } from "react";
import { getProbe } from "./api.js";

export function useProbe(probe) {
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

  return { probeData, error };
}
