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
      <h1>Logga in</h1>
      <div className="login_input-group">
        <label>Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          disabled={loading}
        />
      </div>
      <div className="login_input-group">
        <label>Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          disabled={loading}
        />
      </div>
      <button className="button button-alt" type="submit" disabled={loading}>
        Logga in
      </button>
    </form>
  );
};

export default LoginForm;
