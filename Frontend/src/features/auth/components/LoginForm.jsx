import './LoginForm.css';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(credentials.email, credentials.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Inloggningen misslyckades. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (error) {
      setError('');
    }
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="login_first-header">Logga in på</h1>
      <h1>Personalportalen</h1>
      <div className="login_input-group">
        <label htmlFor="email">Mejladress</label>
        <input
          id="email"
          autoComplete="email"
          onChange={handleChange}
          value={credentials.email}
          name="email"
          type="email"
          placeholder="Ange din mejladress"
          disabled={loading}
          required
        />
      </div>
      <div className="login_input-group">
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={credentials.password}
          name="password"
          type="password"
          placeholder="Ange ditt lösenord"
          disabled={loading}
          required
        />
      </div>
      {error && <ErrorMessage message={error} />}
      <button className="button button-prim" type="submit" disabled={loading}>
        {loading ? 'Loggar in...' : 'Logga in'}
        {!loading && <ArrowRight className="login_icon_arrowright" />}
      </button>
    </form>
  );
};

export default LoginForm;
