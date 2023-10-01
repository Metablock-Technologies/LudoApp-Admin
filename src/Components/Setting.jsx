import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import "../Components/styles/Settings.css";
import { baseURL } from '../token';

const Settings = () => {
    const [originalPenalties, setOriginalPenalties] = useState({
        fraud: 0,
        noupdate: 0,
        wrongupdate: 0,
        commission: 0,
    });

    const [penalties, setPenalties] = useState({
        fraud: 0,
        noupdate: 0,
        wrongupdate: 0,
        commission: 0,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch the initial penalty settings data
        const accessToken = localStorage.getItem('access_token');
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

        axios.get(baseURL + "/admin/penalties", {
            headers: headers
        })
            .then((response) => {
                if (response.data.status === 200) {
                    const data = response.data.data;
                    setOriginalPenalties(data);
                    setPenalties(data);
                } else {
                    // Handle error
                    console.error("Error fetching penalties data");
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching penalties data:", error);
            });
    }, []);

    const handleEditClick = () => {
        // Enable editing mode
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Disable editing mode
        setIsEditing(false);
        const accessToken = localStorage.getItem('access_token');
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

        // Send a PUT request to update the penalties
        axios.put(baseURL + "/admin/penalties", penalties, {
            headers: headers
        })
            .then((response) => {
                if (response.data.status === 200) {
                    console.log("Penalties updated successfully");
                    setOriginalPenalties({ ...penalties }); // Update original values
                } else {
                    // Handle error
                    console.error("Error updating penalties");
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error updating penalties:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPenalties({
            ...penalties,
            [name]: value,
        });
    };

    const handleCancel = () => {
        // Cancel edits and revert to the original values
        setIsEditing(false);
        setPenalties({ ...originalPenalties });
    }

    return (
        <>
            <div className='fade-in'>
                <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                    <h3 style={{ color: 'white' }}>Settings</h3>
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <div className="container">
                        <div className="row gutters">
                            <div className="">
                                <div className="card h-100">
                                    <div style={{ background: '#a6a6ff' }} className="card-body">
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mb-3 text-primary"></h6>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="fraud">Fraud Penalty</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fraud"
                                                        name="fraud"
                                                        placeholder="Fraud Penalty"
                                                        value={penalties?.fraud}
                                                        onChange={handleInputChange}
                                                        readOnly={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="noupdate">No Update Penalty</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="noupdate"
                                                        name="noupdate"
                                                        placeholder="No Update Penalty"
                                                        value={penalties?.noupdate}
                                                        onChange={handleInputChange}
                                                        readOnly={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="wrongupdate">Wrong Update Penalty</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="wrongupdate"
                                                        name="wrongupdate"
                                                        placeholder="Wrong Update Penalty"
                                                        value={penalties?.wrongupdate}
                                                        onChange={handleInputChange}
                                                        readOnly={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="commission">Platform Commission</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="commission"
                                                        name="commission"
                                                        placeholder="Platform Commission"
                                                        value={penalties?.commission}
                                                        onChange={handleInputChange}
                                                        readOnly={!isEditing}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ marginBottom: '2rem' }}>
                                            {isEditing ? (
                                                <> <div style={{ display: 'flex', justifyContent: 'space-around', float: 'right' }}>
                                                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                                    <button style={{ marginLeft: '1rem' }} className="btn btn-primary" onClick={handleSaveClick}>Save</button>
                                                </div>

                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ display: 'flex', justifyContent: 'space-around', float: 'right' }}>
                                                        <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                                                    </div>
                                                </>

                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
