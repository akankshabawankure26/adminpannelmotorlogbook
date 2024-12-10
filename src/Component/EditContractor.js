
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditContractor() {
  const { state } = useLocation(); // Get contractor passed from the previous page
  const navigate = useNavigate();

  const [contractorName, setContractorName] = useState(state ? state.ContractorName : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Update contractor name in the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/updateContractor.php`,
        { id: state.id, contractorName }
      );
      
      if (response.data.success) {
        alert("Contractor updated successfully.");
        navigate('/contractors'); // Redirect to contractors list page
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
      <h2 className="text-center text-primary mb-4">Edit Contractor</h2>
      {error && <p className="text-center text-danger">{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="mb-3">
          <label htmlFor="contractorName" className="form-label">Contractor Name</label>
          <input
            type="text"
            className="form-control"
            id="contractorName"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
            required
          />
        </div>
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Contractor"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  }
};

export default EditContractor;
