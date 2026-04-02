import { env } from './env';

export const BASE_URL = env.apiGatewayUrl;

export const API_ENDPOINTS = {
  auth: `${BASE_URL}/auth`,
  profile: `${BASE_URL}/profile`,
  workshift: `${BASE_URL}/workshift`,
  booking: `${BASE_URL}/booking`,
};
