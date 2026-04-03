import { useState, useEffect, useRef } from "react";
import apiClient from "../api/index";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevEndpoint = useRef(endpoint);

  useEffect(() => {
    prevEndpoint.current = endpoint;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get(endpoint);
        if (prevEndpoint.current === endpoint) {
          setData(response.data);
        }
      } catch (err) {
        if (prevEndpoint.current === endpoint) {
          const message =
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil data";
          console.error(`Error fetching ${endpoint}:`, err);
          setError(message);
        }
      } finally {
        if (prevEndpoint.current === endpoint) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
