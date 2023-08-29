import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { Visibility, Check } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';

function AdminPanelTable() {
    const [activeTableData, setActiveTableData] = useState([]);
    const [inactiveTableData, setInactiveTableData] = useState([]);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedValue, setSelectedValue] = useState('');


    // const [editingIndex, setEditingIndex] = useState(null);
    // const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Completed', 'In Progress', 'Cancelled'
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1); // Initialize with -1
    const [selectedOption, setSelectedOption] = useState(''); // State to store selected option

    // Define options for the dropdown
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        // Add more options as needed
    ];

    // Event handler for dropdown change
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEditClick = (index) => {
        setSelectedUserIndex(index); // Set the selected user index
    };

    const handleCloseEditModal = () => {
        setSelectedUserIndex(-1); // Reset the selected user index to close the modal
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setViewerOpen(!viewerOpen);
    };


    const handleReset = (e) => {
        e.preventDefault()
        console.log("hwyy");
        setStartDate('');
        setEndDate('');
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const renderedActiveTableRows = activeTableData.map((data, index) => (
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
        </TableRow>
    ));

    const renderedInactiveTableRows = inactiveTableData.map((data, index) => (
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
        </TableRow>
    ));

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
            <section style={{ paddingTop: '5rem' }} className="content">
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
                                                {/* <button onClick={handleReset}>Reset</button> */}
                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section style={{ paddingTop: '5rem' }} className="content">
                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                    <div className="row">
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="single-table">
                                        <div id="active_table_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
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
        </>
    );
}

export default AdminPanelTable;