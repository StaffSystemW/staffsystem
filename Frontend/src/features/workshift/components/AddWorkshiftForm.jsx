import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkshift } from "../api";

const AddWorkshiftForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    area: "",
    level: "",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      await createWorkshift(form);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Workshift could not be added", err);
      setError(err?.response?.data?.message || err.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Skapa arbetspass</h1>

      <div className="input-group">
        <label>Område</label>
        <input
          name="area"
          type="text"
          placeholder="Område"
          value={form.area}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="input-group">
        <label>Nivå</label>
        <input
          name="level"
          type="text"
          placeholder="Nivå"
          value={form.level}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Starttid</label>
        <input
          name="startTime"
          type="datetime-local"
          value={form.startTime}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="input-group">
        <label>Sluttid</label>
        <input
          name="endTime"
          type="datetime-local"
          value={form.endTime}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="button button-alt" type="submit" disabled={loading}>
        {loading ? "Sparar..." : "Skapa pass"}
      </button>
    </form>
  );
};

export default AddWorkshiftForm;
