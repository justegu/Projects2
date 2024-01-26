import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEquipmentContext } from "../hooks/useEquipmentContext";

const AdminResPage = () => {
  const [equipmentAvailabilityUpdated, setEquipmentAvailabilityUpdated] =
    useState(false);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useEquipmentContext();

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  useEffect(() => {
    if (equipmentAvailabilityUpdated) {
      setEquipmentAvailabilityUpdated(false);
    }
  }, [equipmentAvailabilityUpdated]);

  const handleUpdateResStatus = async (reservationId) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          reservation_status: "Rented",
        }),
      });

      if (response.ok) {
        const updatedReservation = await response.json();

        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === updatedReservation._id
              ? {
                  ...reservation,
                  reservation_status: updatedReservation.reservation_status,
                }
              : reservation
          )
        );

        dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
        fetchReservations();
      } else {
        console.error("Failed to update reservation status");
        setError("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      setError("Error updating reservation status");
    }
  };

  const handleApproveRes = async (reservationId) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reservation_status: "Approved" }),
      });

      if (response.ok) {
        const updatedReservation = await response.json();

        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === updatedReservation._id
              ? {
                  ...reservation,
                  reservation_status: updatedReservation.reservation_status,
                }
              : reservation
          )
        );
        dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
        fetchReservations();
      } else {
        console.error("Failed to update reservation status");
        setError("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      setError("Failed to update reservation status");
    }
  };

  const handleNotApproveRes = async (reservationId) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reservation_status: "Not approved" }),
      });

      if (response.ok) {
        const updatedReservation = await response.json();
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === updatedReservation._id
              ? {
                  ...reservation,
                  reservation_status: updatedReservation.reservation_status,
                }
              : reservation
          )
        );
        dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
        fetchReservations();
      } else {
        console.error("Failed to update reservation status");
        setError("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      setError("Failed to update reservation status");
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().substring(0, 10);
  };

  return (
    <div className="content-wrapper">
      <div className="reservations-wrapper">
        <h2 className="listTitle">All reservations:</h2>

        {error && <p className="error">{error}</p>}

        <ul className="reservationList admin">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <li key={reservation._id}>
                <div className="details">
                  <img src={reservation.image} alt={reservation.title} />
                  <p>
                    <strong>{reservation.user_name}</strong>
                  </p>
                  <p>{reservation.title}</p>
                  <p>{formatDate(reservation.date)}</p>
                  <p>
                    <strong>{reservation.reservation_status}</strong>
                  </p>
                  <p>{reservation.price} eur</p>
                </div>

                {reservation.reservation_status === "Waiting for approve" && (
                  <div className="buttons ">
                    <button onClick={() => handleApproveRes(reservation._id)}>
                      Approve
                    </button>
                    <button
                      onClick={() => handleNotApproveRes(reservation._id)}
                    >
                      Not Approve
                    </button>
                  </div>
                )}

                {reservation.reservation_status === "Approved" && (
                  <div className="buttons">
                    <button
                      onClick={() => handleUpdateResStatus(reservation._id)}
                    >
                      Update status to "Rented"
                    </button>{" "}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No reservations yet</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminResPage;
