import "./SignupForm.css"
import {ArrowRight} from "lucide-react"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";
import { useAuth } from "../../../context/AuthProvider";

const SignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    try {
      setLoading(true);

      await signUp(form);

      await login(form.email, form.password);

      navigate("/bookings", { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err?.response?.data?.message || err.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="login_first-header">Välkommen</h1>
      <h1>Registrera ett nytt konto</h1>

      <div className="signup_input-group">
        <label>Mejladress</label>
        <input
          disabled={loading}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
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
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="Password"
          //autoComplete ska ändras till new-password sen men går snabbare i test att den är password
          autoComplete="current-password"
          required
        />
      </div>

      <div className="signup_input-group">
        <label>Bekräfta lösenord</label>
        <input
          disabled={loading}
          value={form.confirmPassword}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          type="password"
          placeholder="Confirm password"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading} className="button button-prim">
        {loading ? "Skapar konto..." : "Skapa konto"}
        {!loading && <ArrowRight className="login_icon_arrowright"/>}
      </button>
    </form>
  );
};

export default SignupForm;
