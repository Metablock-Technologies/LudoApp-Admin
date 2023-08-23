import React, { useRef, useState } from 'react'
import * as FileSaver from 'file-saver';
import axios from 'axios';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf"

function UserManager() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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



  const renderedTableRows = filteredData.map((data, index) => (
    <tr role="row" key={index}>
      <td>{data.number}</td>
      <td>{data.name}</td>
      <td>{data.mobile}</td>
      <td>{data.balance}</td>
      <td>{data.miss_match}</td>
      <td>{data.game_hold}</td>
      <td>{data.refer_by}</td>
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
                  <div className="single-table">
                    <div className="table-responsive">
                      {/* fund history */}
                      <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="dt-buttons btn-group flex-wrap">

                          <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex={0} aria-controls="table_id" type="button"      ><span>PDF</span></button>
                          <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex={0} aria-controls="table_id" type="button"><span>Excel</span></button>
                          <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="table_id" type="button"><span>CSV</span></button>
                          <button className="btn btn-secondary buttons-print" tabIndex={0} aria-controls="table_id" type="button"><span>Print</span></button>
                        </div>
                        <div id="table_id_filter" className="dataTables_filter">
                          <label>Search:<input type="search" className="form-control form-control-sm" placeholder aria-controls="table_id" /></label></div>
                        <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info" style={{ width: 1070 }}>
                          <thead className="text-capitalize">

                            {/* <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">SR. NO.</th> */}
                            <tr role="row">
                              <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">Number</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Name </th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">Mobile </th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 105 }} aria-label="To User: activate to sort column ascending">Balance</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 175 }} aria-label="To User Name: activate to sort column ascending">Miss Match</th>
                              <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 109 }} aria-label="Amount: activate to sort column ascending">Game Hold</th>
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
                        <div className="dataTables_info" id="table_id_info" role="status" aria-live="polite">
                          Showing 1 to 2 of 2 entries
                        </div>
                        <div className="dataTables_paginate paging_simple_numbers" id="table_id_paginate">
                          <ul className="pagination"><li className="paginate_button page-item previous disabled" id="table_id_previous">
                            <a href="#" aria-controls="table_id" data-dt-idx={0} tabIndex={0} className="page-link">
                              Previous
                            </a></li><li className="paginate_button page-item active">
                              <a href="#" aria-controls="table_id" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item next disabled" id="table_id_next"><a href="#" aria-controls="table_id" data-dt-idx={2} tabIndex={0} className="page-link">Next</a></li></ul></div></div>
                      <br /><br />
                      <center>
                        <div>
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

    </>
  )
}

export default UserManager;



// //<div className='container'>
//         <div className='container1'>
//           <select className='select' style={{ marginTop: "10%" }} value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
//             <option value="number">Number</option>
//             <option value="name">Name</option>
//             <option value="mobile">Mobile</option>
//             <option value="balance">Balance</option>
//             <option value="missMatch">Miss Match</option>
//             <option value="gameHold">Game Hold</option>
//             <option value="referBy">Refer by</option>
//             <option value="kyc">KYC</option>
//           </select>
//           < input className='input'
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder={`Search by ${selectedField}`}
//           /> </div>

//         <Box sx={{
//           marginTop: "5%", width: "100%"
//         }}>

//           <div className="container-mt-4">
//             < table className='User-table'>
//               <thead>
//                 <tr  className='table-row' >
//                   <th >Number</th>
//                   <th>Name</th>
//                   <th>Mobile</th>
//                   <th>Balance</th>
//                   <th>Miss Match</th>
//                   <th>Game Hold</th>
//                   <th>Refer by</th>
//                   <th>KYC</th>
//                   <th>Username</th>
//                   <th>Password</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody >

//                 {filteredData.map((user) => (
//                   <tr  key={user.number}>

//                     <td className='number'>{user.number}</td>
//                     <td className='name'>{user.name}</td>
//                     <td className='mobile'>{user.mobile}</td>
//                     <td className='balance'>{user.balance}</td>
//                     <td className='missMatch'>{user.missMatch ? 'Yes' : 'No'}</td>
//                     <td className='gamehold'>{user.gameHold ? 'Yes' : 'No'}</td>
//                     <td className='referby'>{user.referBy}</td>
//                     <td>
//                       <div className="kyc">{user.kyc ? 'Verified' : 'Unverified'}</div>
//                     </td>
//                     <td className='username'>{user.username}</td>
//                     <td className='password'>{user.password}</td>
//                     <td>
//                       {user.blocked ? (
//                         <div className="static-button">Blocked</div>
//                       ) : (
//                         <button onClick={() => blockUser(user.number)}>Block</button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}


//               </tbody>
//             </table>
//           </div>

//         </Box >
//       </div >