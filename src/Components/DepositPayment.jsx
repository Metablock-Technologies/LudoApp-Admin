import React, { useEffect, useState } from 'react'
import { Button, TablePagination, TextField } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';


function Addcoins() {
    const [statusFilter, setStatusFilter] = React.useState('all'); // State to keep track of selected status
    const [tableData, setTabledata] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('https://i.insider.com/62879e3f577b8a001827b7b1?width=1136&format=jpeg');
    const [selectedOption, setSelectedOption] = useState(''); // State to store selected option
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

    const handleReset = (e) => {
        e.preventDefault()
        console.log("hwyy");
        setStartDate('');
        setEndDate('');
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Calculate the index range for the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

  // pagination part 

    const addcoins = async () => {
        try {

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.get(baseURL + '/admin/coinrequests', {
                headers: headers,
            });

            console.log(response.data.data);
            setTabledata(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const acceptreject = async (id, status, amount) => {
        try {
            const message = inputValues[id] || '';
            const requestbody = {
                id: id,
                message: message,
                status: status,
                amount: amount
            }
            console.log(requestbody);
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.post(baseURL + '/admin/coinrequests/action', requestbody, {
                headers: headers,
            });

            console.log(response.data);
            addcoins();
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        addcoins();
    }, [])

    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setViewerOpen(!viewerOpen);
    };

    const filteredTableData = statusFilter === 'all'
        ? tableData
        : tableData.filter(data => data.status === statusFilter);

    const renderedTableRows = filteredTableData.slice(startIndex, endIndex).map((data, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.amount}</td>
            <td>
                <Button color="primary" onClick={() => handleImageClick(data.image)}>
                    <Visibility sx={{ color:'#3b3ba3'}} />
                </Button>
            </td>
            <td>{data.user.username}</td>
            <td>
                <TextField
                    type="text"
                    placeholder="Enter message"
                    variant="outlined"
                    size="small"
                    disabled={data.status !== 'pending'} // Disable when status is not 'pending'
                    onChange={(e) => {
                        setInputValues(prevInputValues => ({
                            ...prevInputValues,
                            [data.id]: e.target.value, // Store input value for specific row
                        }));
                    }}
                />
            </td>
            <td>{data.status}</td>
            {data.status === 'pending' ? (
                <>
                    <td>
                        <Button variant="contained" color="primary" onClick={() => acceptreject(data.id, "accepted", data.amount)}>Accept</Button>
                    </td>
                    <td>
                        <Button variant="contained" color="secondary" onClick={() => acceptreject(data.id, "rejected", data.amount)}>Reject</Button>
                    </td>
                </>
            ) : (
                <td></td>
            )}
        </tr>

    ));

  
    return (
        <>
            <div className='fade-in'>
            <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                <h3 style={{ color: 'white' }}> Deposit Payment</h3>
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

                                                        value={statusFilter}
                                                        onChange={handleStatusFilterChange}
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
                                        {/* <div style={{ clear: 'both' }} />
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
                                        </div> */}
                                        <div style={{ clear: 'both' }} />
                                        <br />
                                        <div className="col-md-12 mb-12">
                                            <center>
                                                <button className="btn btn-primary" type='button' style={{}} >Search Now</button>
                                                <button className='btn btn-success' type='button' style={{ marginLeft: 20, textAlign: 'center' }} onClick={handleReset}>Reset</button>
                                                {/* <button onClick={handleReset}>Reset</button> */}
                                            </center>
                                        </div>
                                        <br />
                                    </form>
                                    <div className="single-table" >
                                        {/* fund history */}
                                        <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                            
                                            <div className="table-responsive">

                                                {viewerOpen && (
                                                    <ImageViewer imageUrl={selectedImageUrl} />
                                                )}
                                                <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{}}>
                                                    <thead className="text-capitalize">

                                                        {/* <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">SR. NO.</th> */}
                                                        <tr role="row">
                                                            <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">Number</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Amount </th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 105 }} aria-label="To User: activate to sort column ascending">Image</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 175 }} aria-label="To User Name: activate to sort column ascending">User_Id</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 109 }} aria-label="Amount: activate to sort column ascending">Message</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 129 }} aria-label="Date: activate to sort column ascending">Status</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Accept</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Reject</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Date</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Time</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {renderedTableRows}
                                                    </tbody>
                                                </table>
                                            </div>
                                        
                                          
                                            <br /><br />
                                            <center>
                                                <div>
                                                        <div className="pagination-container">
                                                            <TablePagination sx={{ color: 'purple' }}
                                                                rowsPerPageOptions={[5, 10, 25]}
                                                                component="div"
                                                                count={filteredTableData.length}
                                                                rowsPerPage={rowsPerPage}
                                                                page={page}
                                                                onPageChange={handleChangePage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </div>
                                                </div>
                                            </center>
                                            {/* fund history */}
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

        </>
    )
}

export default Addcoins
