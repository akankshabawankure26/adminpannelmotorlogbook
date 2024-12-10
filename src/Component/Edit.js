import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edit.css";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize form state
  const [editFormData, setEditFormData] = useState({
    id: "",
    VehicalName: "",
    vehicleNumber: "",
    ContractorName: "",
    date: "",
    OpeningReading: "",
    ClosingReading: "",
    FuelType: "",
    FuelQuty: "",
    bds: "",
    bde: "",
    details: "",
  });

  // Populate form data from location.state
  useEffect(() => {
    if (location.state && location.state.entry) {
      const { entry } = location.state;
      console.log(entry);
      setEditFormData({
        id: entry.id || "",
        VehicalName: entry.VehicalName || "",
        vehicleNumber: entry.vehicleNumber || "",
        ContractorName: entry.ContractorName || "",
        date: entry.date || "",
        OpeningReading: entry.OpeningReading || "",
        ClosingReading: entry.ClosingReading || "",
        FuelType: entry.FuleType || "",
        FuelQuty: entry.FuleQuty || "",
        bds: entry.bds || "",
        bde: entry.bde || "",
        details: entry.detail || "",
      });
    }
    console.log(editFormData);
    console.log(editFormData);
  }, [location.state]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /// Handle form submission
const handleEditSubmit = async (event) => {
  event.preventDefault();

  try {
    // Prepare data for submission
    const formData = new FormData();
    Object.entries(editFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("Submitting form data:", Object.fromEntries(formData));

    // API call to update entry
    const response = await axios.post(
      "http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/EditData.php", // Ensure the endpoint URL is correct
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    // Handle response
    if (response.data && response.data.status === "success") {
      alert("Entry updated successfully.");
      navigate("/logbook"); // Navigate to logbook page after successful update
    } else {
      alert(response.data.message || "Failed to update entry.");
    }
  } catch (error) {
    console.error("Error updating entry:", error);
    alert("An error occurred while updating the entry. Please try again.");
  }
};


  // Navigate back to logbook
  const gotoLog = () => {
    navigate("/logbook");
  };

  return (
    <div>
      <h1>Edit Log</h1>

      <div className="edit-form-container">
        <form className="edit-form" onSubmit={handleEditSubmit}>
          {/* Vehicle Name */}
          <div className="form-group">
            <label className="form-label">Vehicle Name:</label>
            <select
              name="VehicalName"
              value={editFormData.VehicalName}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Vehicle Name</option>
              <option value="Loader">Loader</option>
              <option value="JCB-3d">JCB-3d</option>
              <option value="Bolero">Bolero</option>
              <option value="PC Machine">PC Machine</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <div className="form-group">
            <label className="form-label">Vehicle Number:</label>
            <input
              type="text"
              name="vehicleNumber"
              value={editFormData.vehicleNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Contractor Name */}
          <div className="form-group">
            <label className="form-label">Contractor Name:</label>
            <select
              name="ContractorName"
              value={editFormData.ContractorName}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Contractor Name</option>
              <option value="Avneesh Logistics">Avneesh Logistics</option>
              <option value="Akshay Hodke Logistics">Akshay Hodke Logistics</option>
              <option value="Dhaneeram Choure">Dhaneeram Choure</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date:</label>
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Reading and Fuel */}
          <div className="form-group">
            <label className="form-label">Opening Reading:</label>
            <input
              type="number"
              name="OpeningReading"
              value={editFormData.OpeningReading}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Closing Reading:</label>
            <input
              type="number"
              name="ClosingReading"
              value={editFormData.ClosingReading}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fuel Type:</label>
            <select
              name="FuelType"
              value={editFormData.FuelType}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Fuel Quantity (L):</label>
            <input
              type="number"
              name="FuelQuty"
              value={editFormData.FuelQuty}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Break-Down Times */}
          <div className="form-group">
            <label className="form-label">Break-Down Start:</label>
            <input
              type="time"
              name="bds"
              value={editFormData.bds}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Break-Down End:</label>
            <input
              type="time"
              name="bde"
              value={editFormData.bde}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description:</label>
            <input
              type="text"
              name="details"
              value={editFormData.details}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={gotoLog}>
              Cancel
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
export default Edit;