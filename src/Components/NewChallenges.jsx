import React from 'react'
import "./css.css"
import "./css2.css"
function NewChallenges() {
  return (
   <>
          <div className="content-wrapper" style={{minHeight: 864}}>
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">All Users</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="https://belove.uk">Home</a></li>
            <li className="breadcrumb-item active">All Users</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid" style={{marginTop: '-35px'}}>
      <div className="row">
        {/* Primary table start */}
        <div className="col-12 mt-5">
          <div className="card">
            <div className="card-body">
              <form role="form" action="https://belove.uk/admin-panel/All-Members-search" method="post">
                <input type="hidden" name="_token" defaultValue="ufIIKQky4pOtOxFVX1zXKHf58iF6SEHdlPsJf3tm" />
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <div className="form-group">
                    <label>Pick a start date:</label>
                    <div className="input-group date" data-target-input="nearest">
                      <input type="date" className="form-control" placeholder="yyyy-mm-dd" name="start_date" defaultValue />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <div className="form-group">
                    <label>Pick a end date:</label>
                    <div className="input-group date" data-target-input="nearest">
                      <input type="date" className="form-control" placeholder="yyyy-mm-dd" name="end_date" defaultValue />
                    </div>
                  </div>
                </div>
                <div style={{clear: 'both'}} />
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <label htmlFor="validationCustomUsername">Select id status</label>
                  <select className="custom-select selectbox" name="status">
                    <option value> ----Select---- </option>
                    <option value={1}>Un-Blocked</option>
                    <option value={0}>Blocked</option>
                  </select>
                </div>
                <div className="form-group col-md-6 mb-6" style={{float: 'left', marginTop: 10, display: 'none'}}>
                  <lable>Select Position
                    <select className="form-control" name="position">
                      <option value="All" selected> All </option>
                      <option value="Left"> Left </option>
                      <option value="Right"> Right </option>
                    </select>
                  </lable></div>
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <label htmlFor="validationCustomUsername">Search User</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                  </div>
                </div>
                <div style={{clear: 'both'}} />
                <div style={{clear: 'both'}} />
                <br />
                <div className="col-md-12 mb-12">
                  <center>
                    <button className="btn btn-primary" type="submit" style={{}}>Search Now</button>
                    <a className="btn btn-info" style={{marginLeft: 20, textAlign: 'center'}} href="https://belove.uk/admin-panel/All-Members">Reset</a>
                  </center>
                </div>
                <br />
              </form>
              <div className="single-table">
                <div className="table-responsive">
                  <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="dt-buttons btn-group flex-wrap">      <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex={0} aria-controls="table_id" type="button"><span>PDF</span></button> <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex={0} aria-controls="table_id" type="button"><span>Excel</span></button> <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="table_id" type="button"><span>CSV</span></button> <button className="btn btn-secondary buttons-print" tabIndex={0} aria-controls="table_id" type="button"><span>Print</span></button> </div><div id="table_id_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder aria-controls="table_id" /></label></div><table className="table text-center dataTable no-footer dtr-inline collapsed" id="table_id" role="grid" aria-describedby="table_id_info" style={{width: 1583}}>
                      <thead className="text-capitalize">
                        <tr role="row"><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 57}} aria-label="SR.No.: activate to sort column ascending">SR.No.</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 120}} aria-label="Name: activate to sort column ascending">Name</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 92}} aria-label="User Name: activate to sort column ascending">User Name</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 123}} aria-label="Wallet Balance: activate to sort column ascending">Wallet Balance</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 99}} aria-label="Fund Wallet: activate to sort column ascending">Fund Wallet</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 83}} aria-label="Password: activate to sort column ascending">Password</th><th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 185}} aria-label="Transcation Password: activate to sort column descending" aria-sort="ascending">Transcation Password</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 127, display: 'none'}} aria-label="Mobile Number: activate to sort column ascending">Mobile Number</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 153, display: 'none'}} aria-label="Joning Date: activate to sort column ascending">Joning Date</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 124, display: 'none'}} aria-label="Direct Member: activate to sort column ascending">Direct Member</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 0, display: 'none'}} aria-label="Direct Active: activate to sort column ascending">Direct Active</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 0, display: 'none'}} aria-label="Sponser ID: activate to sort column ascending">Sponser ID</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 0, display: 'none'}} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{width: 0, display: 'none'}} aria-label="Actions: activate to sort column ascending">Actions</th></tr>
                      </thead>
                      <tbody>
                        <tr role="row" className="odd">
                          <td tabIndex={0} className>2</td>
                          <td className style={{}}>MANJUNATH N</td>
                          <td className style={{}}>14315</td>
                          <td className style={{}}>24.42</td>
                          <td className style={{}}>760</td>
                          <td className style={{}}>1234</td>
                          <td className="sorting_1" style={{}}>1234</td>
                          {/*<td>manjunathpatagundi1@gmail.com</td>*/}
                          <td style={{display: 'none'}}>8618091998</td>
                          {/*<td>50</td>*/}
                          <td style={{display: 'none'}}>2023-04-03 04:41:35</td>
                          {/*  */}
                          <td style={{display: 'none'}}>1</td>
                          <td style={{display: 'none'}}>1</td>
                          <td style={{display: 'none'}}>belove</td>
                          {/**/}
                          {/*  <td>*/}
                          {/*    <div class="btn btn-sm btn-danger" >Not Send</div>*/}
                          {/*  </td>*/}
                          {/**/}
                          <td style={{display: 'none'}}>
                            <div className="btn btn-sm btn-success">Active</div>
                          </td>
                          <td style={{display: 'none'}}>
                            <a onclick="return confirm('Are You Sure You Want To Edit 14315 ?')" href="https://belove.uk/admin-panel/Member-Edit/4" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" style={{backgroundColor: '#ff8d00', border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}><i className="fa fa-edit" style={{fontSize: 19}} /></a>
                            {/*<a href="https://belove.uk/admin-panel/Member-Details/4" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="View" style="background-color: #c982ff; border: none; padding: 4px;padding-right: 7px;padding-left: 7px;height: 28px; margin-left: 5px;" ><i class="fa fa-eye" style="font-size: 19px;"></i></a>*/}
                            <a href="https://belove.uk/login-user/14315/81dc9bdb52d04dc20036dbd8313ed055" target="_blank" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Login" style={{border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}>Login</a>
                            {/*<p class="dropdown-item" onclick="deletelink('https://belove.uk/admin-panel/Member-Delete/4')" >Delete</p>*/}
                          </td>
                        </tr><tr role="row" className="even">
                          <td tabIndex={0} className>3</td>
                          <td className style={{}}>abcd</td>
                          <td className style={{}}>71913</td>
                          <td className style={{}}>27.95</td>
                          <td className style={{}}>200</td>
                          <td className style={{}}>1234</td>
                          <td className="sorting_1" style={{}}>1234</td>
                          {/*<td>manju1@gmail.com</td>*/}
                          <td style={{display: 'none'}}>8618091998</td>
                          {/*<td>100</td>*/}
                          <td style={{display: 'none'}}>2023-04-03 05:09:49</td>
                          {/*  */}
                          <td style={{display: 'none'}}>0</td>
                          <td style={{display: 'none'}}>0</td>
                          <td style={{display: 'none'}}>14315</td>
                          {/**/}
                          {/*  <td>*/}
                          {/*    <div class="btn btn-sm btn-danger" >Not Send</div>*/}
                          {/*  </td>*/}
                          {/**/}
                          <td style={{display: 'none'}}>
                            <div className="btn btn-sm btn-success">Active</div>
                          </td>
                          <td style={{display: 'none'}}>
                            <a onclick="return confirm('Are You Sure You Want To Edit 71913 ?')" href="https://belove.uk/admin-panel/Member-Edit/5" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" style={{backgroundColor: '#ff8d00', border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}><i className="fa fa-edit" style={{fontSize: 19}} /></a>
                            {/*<a href="https://belove.uk/admin-panel/Member-Details/5" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="View" style="background-color: #c982ff; border: none; padding: 4px;padding-right: 7px;padding-left: 7px;height: 28px; margin-left: 5px;" ><i class="fa fa-eye" style="font-size: 19px;"></i></a>*/}
                            <a href="https://belove.uk/login-user/71913/81dc9bdb52d04dc20036dbd8313ed055" target="_blank" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Login" style={{border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}>Login</a>
                            {/*<p class="dropdown-item" onclick="deletelink('https://belove.uk/admin-panel/Member-Delete/5')" >Delete</p>*/}
                          </td>
                        </tr><tr role="row" className="odd">
                          <td tabIndex={0} className>4</td>
                          <td className style={{}}>Puneeth Kumar K</td>
                          <td className style={{}}>33455</td>
                          <td className style={{}}>13.48</td>
                          <td className style={{}}>950</td>
                          <td className style={{}}>12345</td>
                          <td className="sorting_1" style={{}}>12345</td>
                          {/*<td>puneethkmrklive@gmail.com</td>*/}
                          <td style={{display: 'none'}}>7676063979</td>
                          {/*<td>50</td>*/}
                          <td style={{display: 'none'}}>2023-04-14 07:46:33</td>
                          {/*  */}
                          <td style={{display: 'none'}}>0</td>
                          <td style={{display: 'none'}}>0</td>
                          <td style={{display: 'none'}}>belove</td>
                          {/**/}
                          {/*  <td>*/}
                          {/*    <div class="btn btn-sm btn-danger" >Not Send</div>*/}
                          {/*  </td>*/}
                          {/**/}
                          <td style={{display: 'none'}}>
                            <div className="btn btn-sm btn-success">Active</div>
                          </td>
                          <td style={{display: 'none'}}>
                            <a onclick="return confirm('Are You Sure You Want To Edit 33455 ?')" href="https://belove.uk/admin-panel/Member-Edit/6" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" style={{backgroundColor: '#ff8d00', border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}><i className="fa fa-edit" style={{fontSize: 19}} /></a>
                            {/*<a href="https://belove.uk/admin-panel/Member-Details/6" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="View" style="background-color: #c982ff; border: none; padding: 4px;padding-right: 7px;padding-left: 7px;height: 28px; margin-left: 5px;" ><i class="fa fa-eye" style="font-size: 19px;"></i></a>*/}
                            <a href="https://belove.uk/login-user/33455/827ccb0eea8a706c4c34a16891f84e7b" target="_blank" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Login" style={{border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}>Login</a>
                            {/*<p class="dropdown-item" onclick="deletelink('https://belove.uk/admin-panel/Member-Delete/6')" >Delete</p>*/}
                          </td>
                        </tr><tr role="row" className="even">
                          <td tabIndex={0} className>1</td>
                          <td className style={{}}>Be Love</td>
                          <td className style={{}}>belove</td>
                          <td className style={{}}>246.35</td>
                          <td className style={{}}>1890</td>
                          <td className style={{}}>238641</td>
                          <td className="sorting_1" style={{}}>651114</td>
                          {/*<td>gopalagarwal019@gmail.com</td>*/}
                          <td style={{display: 'none'}}>7742783498</td>
                          {/*<td>100</td>*/}
                          <td style={{display: 'none'}}>2022-02-21 18:34:43</td>
                          {/*  */}
                          <td style={{display: 'none'}}>2</td>
                          <td style={{display: 'none'}}>2</td>
                          <td style={{display: 'none'}}>----</td>
                          {/**/}
                          {/*  <td>*/}
                          {/*    <div class="btn btn-sm btn-info" >Pending</div>*/}
                          {/*  </td>*/}
                          {/**/}
                          <td style={{display: 'none'}}>
                            <div className="btn btn-sm btn-success">Active</div>
                          </td>
                          <td style={{display: 'none'}}>
                            <a onclick="return confirm('Are You Sure You Want To Edit belove ?')" href="https://belove.uk/admin-panel/Member-Edit/1" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" style={{backgroundColor: '#ff8d00', border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}><i className="fa fa-edit" style={{fontSize: 19}} /></a>
                            {/*<a href="https://belove.uk/admin-panel/Member-Details/1" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="View" style="background-color: #c982ff; border: none; padding: 4px;padding-right: 7px;padding-left: 7px;height: 28px; margin-left: 5px;" ><i class="fa fa-eye" style="font-size: 19px;"></i></a>*/}
                            <a href="https://belove.uk/login-user/belove/6d435422237b31fea44cc733c59b1cf0" target="_blank" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Login" style={{border: 'none', padding: 4, paddingRight: 7, paddingLeft: 7, height: 28, marginLeft: 5}}>Login</a>
                            {/*<p class="dropdown-item" onclick="deletelink('https://belove.uk/admin-panel/Member-Delete/1')" >Delete</p>*/}
                          </td>
                        </tr></tbody>
                    </table><div className="dataTables_info" id="table_id_info" role="status" aria-live="polite">Showing 1 to 4 of 4 entries</div><div className="dataTables_paginate paging_simple_numbers" id="table_id_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="table_id_previous"><a href="#" aria-controls="table_id" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="table_id" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item next disabled" id="table_id_next"><a href="#" aria-controls="table_id" data-dt-idx={2} tabIndex={0} className="page-link">Next</a></li></ul></div></div>
                  <br /><br />
                  <center>
                    <div>
                    </div>
                  </center>
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

export default NewChallenges;