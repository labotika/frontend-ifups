import { useState, useEffect, useRef } from "react";
import apiClient from "../api/index";

const cache = new Map();
const CACHE_DURATION_MS = 10 * 60 * 1000;

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevEndpoint = useRef(endpoint);

  useEffect(() => {
    prevEndpoint.current = endpoint;
    let isMounted = true;

    const fetchData = async () => {
      if (cache.has(endpoint)) {
        const cached = cache.get(endpoint);
        if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
          setData(cached.data);
          setLoading(false);
          return;
        } else {
          cache.delete(endpoint);
        }
      }

      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get(endpoint);
        if (isMounted && prevEndpoint.current === endpoint) {
          setData(response.data);
          cache.set(endpoint, {
            data: response.data,
            timestamp: Date.now(),
          });
        }
      } catch (err) {
        if (isMounted && prevEndpoint.current === endpoint) {
          const message =
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil data";
          setError(message);
        }
      } finally {
        if (isMounted && prevEndpoint.current === endpoint) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
