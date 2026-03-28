import React, { useEffect, useState } from "react";
import WorkshiftCard from "../components/WorkshiftCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getWorkshifts } from "../api";

const WorkshiftsPage = () => {
  const [workshifts, setWorkshifts] = useState([]);
  const { isAuthenticated, hasAnyRole } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workshiftsData = await getWorkshifts();
        setWorkshifts(workshiftsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home_container">
      <h1>Lediga pass att boka</h1>
      <div className="home_content-container">
        {hasAnyRole(["Admin", "Passledare"]) && (
          <Link to={"/add"} className="home_add-workshift">
            <p>+</p>
          </Link>
        )}

        {workshifts.map((workshift) => (
          <WorkshiftCard key={workshift.id} workshift={workshift} />
        ))}
      </div>
    </div>
  );
};

export default WorkshiftsPage;
