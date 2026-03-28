const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7265";

export { BASE_URL };

export const API_ENDPOINTS = {
  auth: `${BASE_URL}/auth`,
  profile: `${BASE_URL}/profile`,
  workshift: `${BASE_URL}/workshift`,
  booking: `${BASE_URL}/booking`,
};
