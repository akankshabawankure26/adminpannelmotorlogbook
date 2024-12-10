
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditVehical() {
    const { state } = useLocation(); // Get contractor passed from the previous page
    const navigate = useNavigate();

    const [vehicalName, setVehicalName] = useState(state ? state.vehicalName : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Update contractor name in the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(
                `http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/updateVehical.php`,
                { id: state.id, vehicalName }
            );

            console.log(response);
            console.log(response.data);
            console.log(response.data.success);
            if (response.data.success) {
                alert("Vehical updated successfully.");
                navigate('/logbook'); // Redirect to contractors list page
            } else {
                setError(response.data.message || "Failed to update contractor.");
            }
        } catch (error) {
            console.error("Error updating contractor:", error);
            setError("Failed to update contractor. Please try again.");
        } finally {
            setLoading(false);
        }
    };
  

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Edit Vehical</h2>
            {error && <p className="text-center text-danger">{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={{marginLeft:"80px"}}>
                    <div className="mb-3 " >
                        <label htmlFor="VehicalName" className="form-label">Vehical Name : </label>
                        <input
                            type="text"
                            className="form-control"
                            id="vehicalName"
                            value={vehicalName}
                            onChange={(e) => setVehicalName(e.target.value)}
                            required
                            style={{ width: "250px", height: "40px", marginRight: "50px" }}
                        />
                    </div>

                    <div className="d-flex justify-content-center" style={{ width: "180px" }}>
                        <button type="submit" className="btn btn-primary" disabled={loading} >
                            {loading ? "Updating..." : "Update Contractor"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const styles = {
    form: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    }
};

export default EditVehical;
