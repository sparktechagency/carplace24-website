// This slice is no longer needed as comparison and bookmarking logic
// has been moved to cookie-based storage in src/lib/vehicleStorage.ts
// We keep the file as a placeholder if future API-based features are needed.

import api from "../api/baseApi";

const compareApi = api.injectEndpoints({
  endpoints: () => ({}),
});

export default compareApi;
