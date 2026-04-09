import { apiFetch } from '../../services/apiClient';
import { API_ENDPOINTS } from '../../shared/config/api';

export async function getMe() {
  return apiFetch(API_ENDPOINTS.auth, 'me');
}

export async function checkEmailExists(email) {
  return apiFetch(API_ENDPOINTS.auth, 'verifyemail', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function signUp(userInformation) {
  try {
    return await apiFetch(API_ENDPOINTS.auth, 'signup', {
      method: 'POST',
      body: JSON.stringify(userInformation),
    });
  } catch (error) {
    console.log('error: ', error);

    if (error.status === 409) {
      throw new Error('Mejladressen används redan');
    }
  }
}

export async function signIn(email, password) {
  try {
    return await apiFetch(API_ENDPOINTS.auth, 'signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    if (error.status === 401) {
      throw new Error('Fel mejladress eller lösenord');
    }

    if (error.status === 500) {
      throw new Error('Ett serverfel uppstod. Försök igen senare.');
    }

    throw new Error(error.message || 'Något gick fel vid inloggning');
  }
}

export async function signOut() {
  return apiFetch(API_ENDPOINTS.auth, 'signout', {
    method: 'POST',
  });
}
