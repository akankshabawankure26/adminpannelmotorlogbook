import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AddVehical() {
    const [vehicalName, setVehicalName] = useState('');

    const handleAddVehical = async () => {
        if (vehicalName.trim() === '') {
            alert('Please enter a Vehicle name!');
            return;
        }

        try {
            const response = await axios.post('http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/addvehical.php', {
                vehicalName: vehicalName.trim(),
            });

            if (response.data.success) {
                alert(`Vehicle "${vehicalName}" has been added!`);
                setVehicalName(''); // Reset input field
            } else {
                alert(response.data.message || 'Failed to add vehicle.');
            }
        } catch (error) {
            console.error('Error adding vehicle:', error);
            alert('An error occurred while adding the vehicle.');
        }
    };

    return (
        <div className="container mt-5" style={{ width: '400px' }}>
            <div
                className="card shadow-lg p-4"
                style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}
            >
                <h2 className="text-center mb-4 text-primary">Add Vehicle</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Vehicle name"
                                value={vehicalName}
                                onChange={(e) => setVehicalName(e.target.value)}
                                style={{ borderRadius: '10px', height: '45px' }}
                            />
                        </div>

                        <div className="d-grid" style={{ marginLeft: '20px' }}>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleAddVehical}
                                style={{ borderRadius: '10px', height: '40px', width: '150px' }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVehical;
