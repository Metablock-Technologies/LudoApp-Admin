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
            <section style={{ paddingTop: '5rem' }} className="content">
                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                    <div className="row">
                        {/* Primary table start */}
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
                                                <button className="btn btn-primary" style={{}} onClick={handleSearchNow} >Search Now</button>
                                                <button className='btn btn-success' type='button' style={{ marginLeft: 20, textAlign: 'center' }} onClick={clearFilter}>Reset</button>
                                                {/* <button onClick={handleReset}>Reset</button> */}
                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                    <div className="single-table">
                                        <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div className="table-responsive">
                                                {viewerOpen && (
                                                    <ImageViewer imageUrl={selectedImageUrl} />
                                                )}
                                                <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{ width: 1070 }}>
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
                                            <div className="dataTables_info" id="table_id_info" role="status" aria-live="polite">
                                                Showing {tableData.length} entries
                                            </div>
                                            {/* Add pagination */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Primary table end */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default GameJudgement;
