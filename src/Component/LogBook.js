import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function LogBook() {
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    // Reusable function to fetch entries
    const fetchData = async () => {
        //http://localhost/backend_motorbooklog_admin/AllData.php
        //http://mvnpl.saturnxdigital.com/admin/backend_motorbooklog_admin/AllData.php
        try {
            const response = await axios.get("http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/AllData.php");
            const formattedEntries = response.data.map((entry) => ({
                ...entry,
                date: formatDate(entry.date),
            }));
            setEntries(formattedEntries);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            alert("Error fetching data. Please try again.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
    };

    const handleDelete = async (id) => {
        //http://localhost/backend_motorbooklog_admin/DeleteData.php?id=${id}`
        //http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/DeleteData.php?id=${id}
        try {
            const response = await axios.delete(`http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/DeleteData.php?id=${id}`);
            console.log(response);
            setEntries(entries.filter((entry) => entry.id !== id));
            alert("Entry deleted successfully.");
        } catch (error) {
            console.error("Error deleting entry:", error);
            alert("Failed to delete entry. Please try again.");
        }
    };

    const handleEdit = (entry) => {
        console.log("Navigating with entry:", entry); // Debug log
        navigate("/editlog", { state: { entry } });
    };

    const gotoAddContactor = () => {
       navigate('/addcontractor');
    };

    const gotoContactorTable = () => {
        navigate('/contractortable');
     };
 
     const gotoAddVehical = () => {
        navigate('/addvehical');
     };
 
     const gotoVehicalTable = () => {
         navigate('/vehicaltable');
      };



    return (
        <section>
            <div style={{marginTop:"20px"}}>
            <button class="btn btn-primary" type="submit" onClick={gotoAddContactor}>Add Contractor</button>
            <button class="btn btn-primary" type="submit" onClick={gotoContactorTable}>Edit/Delete Contractor</button>
            <button class="btn btn-primary" type="submit" onClick={gotoAddVehical}>Add Vehical</button>
            <button class="btn btn-primary" type="submit" onClick={gotoVehicalTable}>Edit/Delete Vehical</button>
            </div>
            <div>
                <h1>MOTOR LOGBOOK</h1>
                <table className="indent-table width-100">
                    <thead>
                        <tr>
                            <th>Contractor Name</th>
                            <th>Vehicle Name</th>
                            <th>Vehicle Number</th>
                            <th>Date</th>
                            <th>Opening Reading</th>
                            <th>Closing Reading</th>
                            <th>Mileage Covered (Km)</th>
                            <th>Fuel Type</th>
                            <th>Fuel Quantity (LT)</th>
                            <th>Break Down</th>
                            <th>BD Hrs</th>
                            <th>Remark</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.ContractorName}</td>
                                <td>{entry.VehicalName}</td>
                                <td>{entry.vehicleNumber}</td>
                                <td>{entry.date}</td>
                                <td>{entry.OpeningReading}</td>
                                <td>{entry.ClosingReading}</td>
                                <td>{entry.Mileage}</td>
                                <td>{entry.FuleType}</td>
                                <td>{entry.FuleQuty}</td>
                                <td>{entry.breakDown}</td>
                                <td>{entry.BreakDownHr}</td>
                                <td>{entry.detail}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(entry)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(entry.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </section>

    );
}
export default LogBook;
