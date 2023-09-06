import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { Visibility, Check } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';
import "../Components/styles/AdminManager.css"
import { useNavigate } from 'react-router-dom';
function AdminPanelTable() {
    const [activeTableData, setActiveTableData] = useState([]);
    const [inactiveTableData, setInactiveTableData] = useState([])
    // const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Completed', 'In Progress', 'Cancelled'

    const navigate = useNavigate();
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1); // Initialize with -1
    const handleEditClick = (index) => {
        setSelectedUserIndex(index); // Set the selected user index
    };

    const handleCloseEditModal = () => {
        setSelectedUserIndex(-1); // Reset the selected user index to close the modal
        fetchUserData();
    };





    const renderedActiveTableRows = activeTableData.map((data, index) => {
        const createdAt = new Date(data?.createdAt);
        const formattedDate = createdAt.toLocaleDateString();
        const formattedTime = createdAt.toLocaleTimeString();
        return (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>
                    <Button onClick={() => handleEditClick(index)}>Edit</Button>
                    {selectedUserIndex === index && (
                        <div>
                            <p>Edit Permissions</p>
                            <div>
                                <Checkbox id="permission1" name="permission1" />
                                <label htmlFor="permission1">Permission 1</label>
                            </div>
                            <div>
                                <Checkbox id="permission2" name="permission2" />
                                <label htmlFor="permission2">Permission 2</label>
                            </div>
                            <div>
                                <Checkbox id="permission3" name="permission3" />
                                <label htmlFor="permission3">Permission 3</label>
                            </div>
                            <div>
                                <Checkbox id="permission4" name="permission4" />
                                <label htmlFor="permission4">Permission 4</label>
                            </div>
                            <Button onClick={handleCloseEditModal}>Send</Button>
                        </div>
                    )}
                </TableCell>

                <TableCell>{formattedDate}</TableCell>
                <TableCell>{formattedTime}</TableCell>
            </TableRow>
        )
    });

    const renderedInactiveTableRows = inactiveTableData.map((data, index) => {
        const createdAt = new Date(data?.createdAt);
        const formattedDate = createdAt.toLocaleDateString();
        const formattedTime = createdAt.toLocaleTimeString();
        return (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>
                    <Button onClick={() => handleEditClick(index)}>Edit</Button>
                    {selectedUserIndex === index && (
                        <div>
                            <p>Edit Permissions</p>
                            <div>
                                <Checkbox id="permission1" name="permission1" />
                                <label htmlFor="permission1">Permission 1</label>
                            </div>
                            <div>
                                <Checkbox id="permission2" name="permission2" />
                                <label htmlFor="permission2">Permission 2</label>
                            </div>
                            <div>
                                <Checkbox id="permission3" name="permission3" />
                                <label htmlFor="permission3">Permission 3</label>
                            </div>
                            <div>
                                <Checkbox id="permission4" name="permission4" />
                                <label htmlFor="permission4">Permission 4</label>
                            </div>
                            <Button onClick={handleCloseEditModal}>Send</Button>
                        </div>
                    )}
                </TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{formattedTime}</TableCell>
            </TableRow>
        )
    });

    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.get(baseURL + '/admin/all', {
                headers: headers,
            });

            const activeUsers = response.data.data.filter(user => user.status === 'active');
            const inactiveUsers = response.data.data.filter(user => user.status === 'inactive');

            setActiveTableData(activeUsers);
            setInactiveTableData(inactiveUsers);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            {/* <section style={{ paddingTop: '5rem' }} className="content">
                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                    <div className="row">
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <form >
                                        <input type="hidden" name="_token" defaultValue="ufIIKQky4pOtOxFVX1zXKHf58iF6SEHdlPsJf3tm" />
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <div className="form-group">
                                                <label>Pick a start date:</label>
                                                <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                    <input type="date"
                                                        className="form-control t"
                                                        placeholder="yyyy-mm-dd"
                                                        name="start_date"
                                                        value={startDate}
                                                        onChange={handleStartDateChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <div className="form-group">
                                                <label>Pick a end date:</label>
                                                <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                    <input type="date"
                                                        className="form-control"
                                                        placeholder="yyyy-mm-dd"
                                                        name="end_date"
                                                        value={endDate}
                                                        onChange={handleEndDateChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ clear: 'both' }} />
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <label htmlFor="validationCustomUsername">Search  User</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                                            </div>
                                        </div>
                                        <div style={{ clear: 'both' }} />
                                        <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                            <label>Select an Option:</label>
                                            <select
                                                className="form-control"
                                                value={selectedOption}
                                                onChange={handleDropdownChange}
                                                name="dropdownOption"
                                            >
                                                <option value="">Select an option</option>
                                                {options.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ clear: 'both' }} />
                                        <br />
                                        <div className="col-md-12 mb-12">
                                            <center>
                                                <button className="btn btn-primary" style={{}} >Search Now</button>
                                                <button className='btn btn-success' type='button' style={{ marginLeft: 20, textAlign: 'center' }} onClick={handleReset}>Reset</button>

                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section > */}
            <div className='fade-in'>
                <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                    <h3 style={{ color: 'white' }}>Admin Manager</h3>
                </div>
                <section style={{ marginTop: '5rem', borderRadius: '5px', background: '#a6a6ff' }} >
                    <button style={{ margin: '2rem' }} type="button" class="btn  hoverbutton" onClick={() => navigate('/register')} >Create Admin</button>
                    <section style={{ paddingTop: '5rem' }} className="content">
                        <div className="container-fluid" style={{ marginTop: '-35px' }}>
                            <div className="row">
                                <div className="col-12 mt-5">
                                    <div className="card">
                                        <div style={{ background: 'white' }} className="card-body">
                                            <div className="single-table">
                                                <div id="active_table_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                    <div className="table-responsive">
                                                        <Table sx={{ background: 'white' }} >
                                                            <TableHead>
                                                                <TableRow sx={{ background: 'white  ' }}>
                                                                    <TableCell>Sr No.</TableCell>
                                                                    <TableCell>Name</TableCell>
                                                                    <TableCell>Username</TableCell>
                                                                    <TableCell>Phone</TableCell>
                                                                    <TableCell>Email</TableCell>
                                                                    <TableCell>Status</TableCell>
                                                                    <TableCell>Edit Permission</TableCell>
                                                                    <TableCell>Date</TableCell>
                                                                    <TableCell>Time</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>{renderedActiveTableRows}</TableBody>
                                                        </Table>
                                                    </div>
                                                    <div className="dataTables_info" id="active_table_info" role="status" aria-live="polite">
                                                        Showing {activeTableData.length} active entries
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-12 mt-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="single-table">
                                                <div id="inactive_table_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                    <div className="table-responsive">
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Sr No.</TableCell>
                                                                    <TableCell>Name</TableCell>
                                                                    <TableCell>Username</TableCell>
                                                                    <TableCell>Phone</TableCell>
                                                                    <TableCell>Email</TableCell>
                                                                    <TableCell>Status</TableCell>
                                                                    <TableCell>Edit Permission</TableCell>
                                                                    <TableCell>Date</TableCell>
                                                                    <TableCell>Time</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>{renderedInactiveTableRows}</TableBody>
                                                        </Table>
                                                    </div>
                                                    <div className="dataTables_info" id="inactive_table_info" role="status" aria-live="polite">
                                                        Showing {inactiveTableData.length} inactive entries
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </section >
                </section>
            </div>
        </>
    );
}

export default AdminPanelTable;