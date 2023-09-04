import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { Visibility, Check } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';

function GameJudgement() {
    // const [statusFilter, setStatusFilter] = React.useState('all');
    const [tableData, setTabledata] = useState([]);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedValue, setSelectedvalues] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); // State to store selected option
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        // Delay the animation to allow rendering first
        setTimeout(() => {
            setShowComponent(true);
        }, 100);
    }, []);
    const filterDataByDate = (startDate, endDate) => {
        const filteredData = tableData.filter(data => {
            const challengeDate = new Date(data.date); // Assuming you have a 'date' field in your data
            return challengeDate >= new Date(startDate) && challengeDate <= new Date(endDate);
        });
        setFilteredTableData(filteredData);
    };

    const handleSearchNow = () => {
        filterDataByDate(startDate, endDate);
    };

    const clearFilter = () => {
        setFilteredTableData(tableData);
        setStartDate('');
        setEndDate('');
    };


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

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setViewerOpen(!viewerOpen);
    };

    const gamejudgement = async () => {
        try {

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.get(baseURL + '/admin/challengeresults', {
                headers: headers,
            });

            console.log("response", response.data);
            setTabledata(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    const acceptreject = async (id, winnerid) => {
        try {
            const requestbody = {
                challengeId: id,
                winnerId: 25,
                type: selectedValue
            }
            console.log(requestbody);
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.post(baseURL + '/admin/challengeresults/action', requestbody, {
                headers: headers,
            });

            console.log(response.data);
            gamejudgement();
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        gamejudgement();
    }, [])

    const renderedTableRows = filteredTableData.map((data, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.roomcode}</td>
            <td>{data.ChallengerUser.username}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => acceptreject(data.id, data.challenger)}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            background: '#3f51b5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px',
                        }}
                    >
                        <span
                            style={{
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        >
                            ✓
                        </span>
                    </div>
                    Accept
                </Button>
            </td>
            <td>
                <Button color="primary" onClick={() => handleImageClick(data.result.challenger_image)}>
                    <Visibility />
                </Button>
            </td>
            <td>{data.AcceptorUser.username}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => acceptreject(data.id, data.challenger)}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            background: '#3f51b5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px',
                        }}
                    >
                        <span
                            style={{
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        >
                            ✓
                        </span>
                    </div>
                    Accept
                </Button>
            </td>
            <td>
                <Button color="primary" onClick={() => handleImageClick(data.result.acceptor_image)}>
                    <Visibility />
                </Button>
            </td>
            <td>{data.price}</td>
            <td>{data.result.challengeId}</td>
            {/* <td>{data.result.WinnerUser ? data.result.WinnerUser.username : ''}</td> */}
            <td>{data.result.WinnerUser?.username}</td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                        style={{ padding: '4px', width: '5rem' }}
                        defaultValue=""
                        onChange={(event) => {
                            setSelectedvalues(event.target.value);
                            //     if (selectedValue === "1") {
                            //         acceptChallengerID(data.result.challengeId);
                            //     } else if (selectedValue === "2") {
                            //         acceptAcceptorID(data.result.challengeId);
                            //     } else if (selectedValue === "3") {
                            //         // Logic for no update
                            //     }
                        }}
                    >
                        <option value="" disabled>Select</option>
                        <option value="1">Fraud/Fake Screenshot</option>
                        <option value="2">Wrong Update</option>
                        <option value="3">No Update</option>
                    </select>
                </div>
            </td>
        </tr>
    ));


   
    return (

        <>
            <div className='fade-in'>
        <div className={`your-component-wrapper ${showComponent ? 'fadeIn show' : ''}`}>
            <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                <h3 style={{ color: 'white' }}> Conflict Challenge</h3>
            </div>
            <section style={{ paddingTop: '5rem' }} className="content">
                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                    <div className="row">
                        {/* Primary table start */}
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div style={{ background: '#a6a6ff' }} className="card-body">
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
                                                <div className='row'>
                                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                        <label htmlFor="validationCustomUsername">Search </label>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                        <div id="table_id_filter" className="dataTables_filter">
                                                            <label>
                                                                Filter by Status:

                                                            </label>
                                                            <select

                                                                // value={statusFilter}
                                                                // onChange={handleStatusFilterChange}
                                                                style={{ height: "37px" }}
                                                                className="form-control form-control-sm "
                                                            >
                                                                <option value="all">All</option>
                                                                <option value="pending">Pending</option>
                                                                <option value="rejected">Rejected</option>
                                                                <option value="approved">Approved</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                        
                                        <div style={{ clear: 'both' }} />
                                        <br />
                                        <div className="col-md-12 mb-12">
                                            <center>
                                                <button className="btn btn-primary" style={{}} onClick={handleSearchNow} >Search Now</button>
                                                <button className='btn btn-success' type='button' style={{ marginLeft: 20, textAlign: 'center' }} onClick={clearFilter}>Reset</button>
                                                {/* <button onClick={handleReset}>Reset</button> */}
                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                    <div className="single-table" >
                                        <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div className="table-responsive">
                                                {viewerOpen && (
                                                    <ImageViewer imageUrl={selectedImageUrl} />
                                                )}
                                                        <div className="scrollable-table">

                                                            <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{ overflowX: 'auto' }}>
                                                                <thead className="text-capitalize">
                                                                    <tr role="row">
                                                                        <th>Number</th>
                                                                        <th>Room Code</th>
                                                                        <th>Challenger Username</th>
                                                                        <th>Challenger Image</th>
                                                                        <th>Acceptor Username</th>
                                                                        <th>Acceptor Image</th>
                                                                        <th>Price</th>
                                                                        <th>Challenge ID</th>
                                                                        <th>Winner</th>
                                                                        <th>Message</th>
                                                                        <th>Penalty</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {renderedTableRows}
                                                                </tbody>
                                                            </table>
                                                </div>
                                                  
                                            </div>
                                            <div className="dataTables_info" id="table_id_info" role="status" aria-live="polite">
                                                Showing {tableData.length} entries
                                            </div>
                                            {/* Add pagination */}
                                            <div className="pagination-container">
                                                <div style={{ marginRight: '6px' }} className="dataTables_info" id="table_id_info" role="status" aria-live="polite">
                                                    <span style={{ fontSize: '1rem' }}>  Showing 1 to 2 of 2 entries</span>
                                                </div>
                                                <div className="dataTables_paginate paging_simple_numbers" id="table_id_paginate">
                                                    <ul className="pagination">
                                                        <li className="paginate_button page-item previous disabled" id="table_id_previous">
                                                            <a href="#" aria-controls="table_id" data-dt-idx={0} tabIndex={0} className="page-link">
                                                                Previous
                                                            </a>
                                                        </li>
                                                        <li className="paginate_button page-item active">
                                                            <a href="#" aria-controls="table_id" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                        </li>
                                                        <li className="paginate_button page-item next disabled" id="table_id_next">
                                                            <a href="#" aria-controls="table_id" data-dt-idx={2} tabIndex={0} className="page-link">Next</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Primary table end */}
                    </div>
                </div>
            </section>
            </div>
            </div>
        </>
    );
}

export default GameJudgement;
