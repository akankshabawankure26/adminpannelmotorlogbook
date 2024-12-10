import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ContractorsTable() {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchContractors = async () => {
    try {
      const response = await fetch("http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/getContractor.php");
      const data = await response.json();
      if (data.success) {
        setContractors(data.data);
        
      } else {
        setError(data.message || "Failed to fetch contractors.");
      }
    } catch (err) {
      console.error("Error fetching contractors:", err);
      setError("An error occurred while fetching contractors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractors();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting contractor with ID:", id);  // Debugging line
    try {
      if (!id) {
        alert("Contractor ID is missing!");
        return;
      }
  
      const response = await axios.delete(
        `http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/deleteContractor.php?id=${id}`
      );
      console.log(response.data);
  
      if (response.data.success) {
        setContractors(contractors.filter((contractor) => contractor.id !== id));
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting contractor:", error);
      alert("Failed to delete contractor. Please try again.");
    }
  };
  

  const goToEditContractor = (contractor) => {
    nav("/editcontractor", { state: contractor });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Contractor List</h2>

      {loading && <p className="text-center text-info">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && contractors.length > 0 && (
        <table className="table table-bordered table-hover shadow-lg" style={styles.table,{width:"800px", marginLeft:"150px"}}>
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Contractor Name</th>
              <th scope="col" style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((contractor, index) => (
              <tr key={contractor.id}>
                <td>{index + 1}</td>
                <td>{contractor.ContractorName}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-sm btn-warning"
                    style={styles.actionButton}
                    onClick={() => goToEditContractor(contractor)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    style={styles.actionButton}
                    onClick={() => handleDelete(contractor.id)} // Check if contractor.id is being passed correctly
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

      {!loading && contractors.length === 0 && (
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
   
  },
  actionButton: {
    margin: "0 5px",
  },
};

export default ContractorsTable;
