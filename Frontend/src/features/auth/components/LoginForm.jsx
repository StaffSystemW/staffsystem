import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("user", user);
    try {
      setLoading(true);
      await login(user.email, user.password);
      navigate("/bookings");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="login_first-header">Logga in på</h1>
      <h1>Personalportalen</h1>
      <div className="login_input-group">
        <label>Mejladress</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Ange din mejladress"
          disabled={loading}
        />
      </div>
      <div className="login_input-group">
        <label>Lösenord</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Ange ditt lösenord"
          disabled={loading}
        />
      </div>
      <button className="button button-prim" type="submit" disabled={loading}>
        Logga in
      </button>
    </form>
  );
};

export default LoginForm;
