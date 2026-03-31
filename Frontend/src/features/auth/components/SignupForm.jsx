import './SignupForm.css';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api';
import { useAuth } from '../../../context/AuthProvider';

const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    try {
      setLoading(true);

      await signUp(credentials);

      await login(credentials.email, credentials.password);

      navigate('/bookings', { replace: true });
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err?.response?.data?.message || err.message || 'Något gick fel');
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
    <form onSubmit={handleSubmit}>
      <h1 className="login_first-header">Välkommen</h1>
      <h1>Registrera ett nytt konto</h1>

      <div className="signup_input-group">
        <label>Mejladress</label>
        <input
          disabled={loading}
          value={credentials.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
      </div>

      <div className="signup_input-group">
        <label>Lösenord</label>
        <input
          disabled={loading}
          value={credentials.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="signup_input-group">
        <label>Bekräfta lösenord</label>
        <input
          disabled={loading}
          value={credentials.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm password"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading} className="button button-prim">
        {loading ? 'Skapar konto...' : 'Skapa konto'}
        {!loading && <ArrowRight className="login_icon_arrowright" />}
      </button>
    </form>
  );
};

export default SignupForm;
