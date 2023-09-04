import React, { useRef, useState } from 'react'
import * as FileSaver from 'file-saver';
import axios from 'axios';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf"
import { TablePagination } from '@mui/material';

function UserManager() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableData = [
    {
      number: 1,
      name: 'John Doe',
      mobile: '123-456-7890',
      balance: 5000,
      miss_match: 2,
      game_hold: 'Yes',
      refer_by: 'Jane Smith',
      username: 'john123',
      password: '********',
      action: 'Block'
    },
    {
      number: 2,
      name: 'Jane Smith',
      mobile: '987-654-3210',
      balance: 7000,
      miss_match: 1,
      game_hold: 'No',
      refer_by: 'Michael Johnson',
      username: 'jane456',
      password: '********',
      action: 'Block'
    },
    {
      number: 3,
      name: 'Michael Johnson',
      mobile: '555-555-5555',
      balance: 3000,
      miss_match: 0,
      game_hold: 'Yes',
      refer_by: 'John Doe',
      username: 'michael789',
      password: '********',
      action: 'Block'
    },
    {
      number: 4,
      name: 'Emily Davis',
      mobile: '222-333-4444',
      balance: 10000,
      miss_match: 1,
      game_hold: 'No',
      refer_by: 'Jane Smith',
      username: 'emily222',
      password: '********',
      action: 'Block'
    },
    {
      number: 5,
      name: 'David Wilson',
      mobile: '777-888-9999',
      balance: 8000,
      miss_match: 3,
      game_hold: 'Yes',
      refer_by: 'Michael Johnson',
      username: 'david777',
      password: '********',
      action: 'Block'
    },
    {
      number: 6,
      name: 'Sarah Brown',
      mobile: '555-444-3333',
      balance: 12000,
      miss_match: 2,
      game_hold: 'No',
      refer_by: 'Jane Smith',
      username: 'sarah555',
      password: '********',
      action: 'Block'
    },
    {
      number: 7,
      name: 'William Jones',
      mobile: '111-222-3333',
      balance: 6000,
      miss_match: 1,
      game_hold: 'Yes',
      refer_by: 'John Doe',
      username: 'william111',
      password: '********',
      action: 'Block'
    },
    {
      number: 8,
      name: 'Olivia Green',
      mobile: '444-333-2222',
      balance: 9500,
      miss_match: 0,
      game_hold: 'No',
      refer_by: 'Michael Johnson',
      username: 'olivia444',
      password: '********',
      action: 'Block'
    },
    {
      number: 9,
      name: 'James Taylor',
      mobile: '666-777-8888',
      balance: 2000,
      miss_match: 3,
      game_hold: 'Yes',
      refer_by: 'Jane Smith',
      username: 'james666',
      password: '********',
      action: 'Block'
    },
    {
      number: 10,
      name: 'Sophia Adams',
      mobile: '111-999-8888',
      balance: 11000,
      miss_match: 2,
      game_hold: 'No',
      refer_by: 'John Doe',
      username: 'sophia111',
      password: '********',
      action: 'Block'
    },
    {
      number: 11,
      name: 'Ethan Martinez',
      mobile: '555-222-4444',
      balance: 8000,
      miss_match: 1,
      game_hold: 'Yes',
      refer_by: 'Michael Johnson',
      username: 'ethan555',
      password: '********',
      action: 'Block'
    },
    {
      number: 12,
      name: 'Ava Hernandez',
      mobile: '777-333-1111',
      balance: 3000,
      miss_match: 0,
      game_hold: 'No',
      refer_by: 'Jane Smith',
      username: 'ava777',
      password: '********',
      action: 'Block'
    },
    {
      number: 13,
      name: 'Noah Robinson',
      mobile: '999-888-7777',
      balance: 6000,
      miss_match: 3,
      game_hold: 'Yes',
      refer_by: 'John Doe',
      username: 'noah999',
      password: '********',
      action: 'Block'
    },
    {
      number: 14,
      name: 'Mia Ramirez',
      mobile: '333-666-9999',
      balance: 4000,
      miss_match: 2,
      game_hold: 'No',
      refer_by: 'Michael Johnson',
      username: 'mia333',
      password: '********',
      action: 'Block'
    },
    {
      number: 15,
      name: 'Liam Anderson',
      mobile: '777-222-4444',
      balance: 8000,
      miss_match: 1,
      game_hold: 'Yes',
      refer_by: 'Jane Smith',
      username: 'liam777',
      password: '********',
      action: 'Block'
    },
    {
      number: 16,
      name: 'Isabella Turner',
      mobile: '222-555-9999',
      balance: 9000,
      miss_match: 0,
      game_hold: 'No',
      refer_by: 'John Doe',
      username: 'isabella222',
      password: '********',
      action: 'Block'
    },
    {
      number: 17,
      name: 'Benjamin Mitchell',
      mobile: '888-666-4444',
      balance: 5000,
      miss_match: 3,
      game_hold: 'Yes',
      refer_by: 'Michael Johnson',
      username: 'benjamin888',
      password: '********',
      action: 'Block'
    },
    {
      number: 18,
      name: 'Grace Lewis',
      mobile: '333-555-9999',
      balance: 7000,
      miss_match: 2,
      game_hold: 'No',
      refer_by: 'Jane Smith',
      username: 'grace333',
      password: '********',
      action: 'Block'
    },
    {
      number: 19,
      name: 'Henry Martinez',
      mobile: '666-888-5555',
      balance: 3000,
      miss_match: 1,
      game_hold: 'Yes',
      refer_by: 'John Doe',
      username: 'henry666',
      password: '********',
      action: 'Block'
    },
    {
      number: 20,
      name: 'Luna White',
      mobile: '555-777-9999',
      balance: 9500,
      miss_match: 0,
      game_hold: 'No',
      refer_by: 'Michael Johnson',
      username: 'luna555',
      password: '********',
      action: 'Block'
    },
  ];

// pagination part 
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
  const handleBlockUser = async (userId) => {
    try {
      const response = await axios.post('/api/block-user', { userId }); // Adjust the URL
      if (response.status === 200) {
        // Update the blockedUsers state or perform any necessary action
        setBlockedUsers([...blockedUsers, userId]);
        alert('User blocked successfully');
      }
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('An error occurred while blocking the user');
    }
  };
  const filteredData = tableData.filter(data => {
    if (!startDate || !endDate) {
      return true;
    }
    const dataDate = new Date(data.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return dataDate >= start && dataDate <= end;
  });

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };


  const handleReset = (e) => {
    e.preventDefault()
    console.log("hwyy");
    setStartDate('');
    setEndDate('');
  };



  const renderedTableRows = filteredData.slice(startIndex,endIndex).map((data, index) => (
    <tr role="row" key={index}>
      <td>{data.number}</td>
      <td>{data.name}</td>
      <td>{data.mobile}</td>
      <td>{data.balance}</td>
      <td>{data.refer_by}</td>
      <td>{data.username}</td>
      <td>{data.password}</td>
      <td>
        <button

          className="btn btn-danger"
          onClick={() => handleBlockUser(data.number)} // Pass the user ID to the function
        >
          Block
        </button>
      </td>

    </tr>
  ));
  return (
    <> <div className='fade-in'>
      <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
        <h3 style={{ color: 'white' }}>User Manager</h3>
      </div>
      <section style={{ marginTop: '2rem' }} className="content">

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
                        {/* <label>Select an Option:</label>
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
                                            </select> */}
                      </div>
                    </div>
                    <div style={{ clear: 'both' }} />
                    <div style={{ clear: 'both' }} />
                    <br />
                    <div className="col-md-12 mb-12">
                      <center>
                        <button className="btn btn-primary" type='button'>Search Now</button>
                        <button className='btn btn-success' type='button' style={{ marginLeft: 20, textAlign: 'center' }} onClick={handleReset}>Reset</button>
                        {/* <button onClick={handleReset}>Reset</button> */}
                      </center>
                    </div>
                    <br />
                  </form>
                  <div className="single-table">
                    <div className="table-responsive">
                      {/* fund history */}
                      <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">

                       
                        <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{}}>
                          <thead className="text-capitalize">

                            {/* <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">SR. NO.</th> */}
                            <tr role="row">
                              <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">Number</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Name </th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Mobile </th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 105 }} aria-label="To User: activate to sort column ascending">Balance</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 129 }} aria-label="Date: activate to sort column ascending">Refer By</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Username</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Password </th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 81 }} aria-label="Time: activate to sort column ascending">Action </th>
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
                        </div>
                      </center>
                      <div className="pagination-container">
                        <TablePagination sx={{color:'purple'}}
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={filteredData.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </div>
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

export default UserManager;
