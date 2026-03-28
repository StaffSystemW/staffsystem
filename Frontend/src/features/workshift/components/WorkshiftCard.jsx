import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { deleteWorkshift } from "../api";
import { createBooking } from "../../booking/api";

const WorkshiftCard = ({ workshift }) => {
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleClickDelete = async () => {
    try {
      await deleteWorkshift(workshift.id);
      // ev. refresh / navigate
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleClickBook = async () => {
    try {
      const payload = {
        workshiftId: workshift.id,
      };

      console.log("payload", payload);

      await createBooking(payload);
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  return (
    <div className="wc_container">
      <div className="wc_info-group">
        <label>Id</label>
        <p>{workshift.id}</p>
      </div>

      <div className="wc_info-group">
        <label>Område</label>
        <p>{workshift.area}</p>
      </div>

      <div className="wc_info-group">
        <label>Nivå</label>
        <p>{workshift.level}</p>
      </div>

      <div className="wc_info-group">
        <label>Starttid</label>
        <p>{workshift.startTime}</p>
      </div>

      <div className="wc_info-group">
        <label>Sluttid</label>
        <p>{workshift.endTime}</p>
      </div>

      <div className="wc_info-group">
        <label>Arbetare</label>
        <p>{workshift.employeeId}</p>
      </div>

      <div className="wc_info-group">
        <label>Skapad av</label>
        <p>{workshift.addedByUserId}</p>
      </div>

      <div className="wc_info-group">
        <label>Skapad</label>
        <p>{workshift.addedTime}</p>
      </div>

      <div className="wc_button-container">
        {isAuthenticated && hasRole("Admin") && (
          <>
            <Link to={`/edit/${workshift.id}`} className="button button-prim">
              Ändra
            </Link>

            <button onClick={handleClickDelete} className="button button-alt">
              Radera
            </button>
          </>
        )}

        {isAuthenticated && !hasRole("Admin") && (
          <button onClick={handleClickBook} className="button button-alt">
            Boka
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkshiftCard;
