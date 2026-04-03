export function normalizeListResponse(response) {
  if (Array.isArray(response)) return response;
  if (response?.data && Array.isArray(response.data)) return response.data;
  return [];
}

export function normalizeSingleResponse(response) {
  if (response?.data && !Array.isArray(response.data)) return response.data;
  return response ?? null;
}
