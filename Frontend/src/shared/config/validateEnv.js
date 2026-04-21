import { env } from './env';

export function validateEnv() {
  const errors = [];

  const value = env.apiGatewayUrl;

  if (!value) {
    errors.push('VITE_API_BASE_URL is missing');
  } else {
    const isRelative = value.startsWith('/');

    if (!isRelative) {
      try {
        new URL(value);
      } catch {
        errors.push('VITE_API_BASE_URL must be a valid URL or start with /');
      }
    }

    if (value.endsWith('/')) {
      errors.push('VITE_API_BASE_URL should not end with a trailing slash');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid app configuration:\n- ${errors.join('\n- ')}`);
  }
}
