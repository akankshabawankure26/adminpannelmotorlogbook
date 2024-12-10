import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VehicalTable() {
    const [vehicals, setVehicals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const nav = useNavigate();

    const fetchVehical = async () => {
        try {
            const response = await fetch("http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/getVehical.php");
            const data = await response.json();
            if (data.success) {
                setVehicals(data.data);

            } else {
                setError(data.message || "Failed to fetch Vehical.");
            }
        } catch (err) {
            console.error("Error fetching Vehicals:", err);
            setError("An error occurred while fetching Vehicals.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehical();
    }, []);

    const handleDelete = async (id) => {
        console.log("Deleting Vehical with ID:", id);  // Debugging line
        try {
            if (!id) {
                alert("Vehical ID is missing!");
                return;
            }

            const response = await axios.delete(
                `http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/deleteVehical.php?id=${id}`
            );

            console.log(response.data);

            if (response.data.success) {
                setVehicals(vehicals.filter((Vehical) => Vehical.id !== id));
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting contractor:", error);
            alert("Failed to delete contractor. Please try again.");
        }
    };


    const goToEditVehical = (vehicle) => {
        nav("/editvehical", { state: vehicle });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Contractor List</h2>

            {loading && <p className="text-center text-info">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!loading && vehicals.length > 0 && (
                <table className="table table-bordered table-hover shadow-lg" style={styles.table}>
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Vehical Name</th>
                            <th scope="col" style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicals.map((vehicle, index) => (
                            <tr key={vehicle.id}>
                                <td>{index + 1}</td>
                                <td>{vehicle.vehicalName}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        style={styles.actionButton}
                                    onClick={() => goToEditVehical(vehicle)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        style={styles.actionButton}
                                     onClick={() => handleDelete(vehicle.id)} // Check if contractor.id is being passed correctly
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}

            {!loading && vehicals.length === 0 && (
                <p className="text-center text-warning">No contractors found.</p>
            )}
        </div>
    );
}

const styles = {
    table: {
        borderRadius: "12px",
        overflow: "hidden",
        textAlign: "center",
        width: "800px",
        marginLeft: "150px"

    },
    actionButton: {
        margin: "0 5px",
    },
};

export default VehicalTable;
