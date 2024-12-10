import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AddContractor() {
    const [contractorName, setContractorName] = useState('');
    

    const handleAddContractor = async () => {
        if (contractorName.trim() === '') {
            alert('Please enter a contractor name!');
            return;
        }

        console.log("before try");
        try {
            const response = await axios.post('http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/addcontractor.php', {
                contractorName: contractorName.trim(),
            });
            console.log("after sending request try");
            console.log(response);
            console.log(response.data);
            if (response.data.success) {
                alert(`Contractor "${contractorName}" has been added!`);
                setContractorName(''); // Reset input field
            }
        } catch (error) {
            console.error('Error adding contractor:', error);
      
        }
    };

    return (
        <div className="container mt-5" style={{ width: '400px' }}>
            <div
                className="card shadow-lg p-4"
                style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}
            >
                <h2 className="text-center mb-4 text-primary">Add Contractor</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter contractor name"
                                value={contractorName}
                                onChange={(e) => setContractorName(e.target.value)}
                                style={{ borderRadius: '10px', height: '45px' }}
                            />
                        </div>

                        <div className="d-grid" style={{ marginLeft: '20px' }}>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleAddContractor}
                                style={{ borderRadius: '10px', height: '45px' }}
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

export default AddContractor;
