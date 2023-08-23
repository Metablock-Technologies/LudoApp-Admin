import React from 'react'

function NewAdminEarning() {
  return (
   <>
         <div className="content-wrapper" style={{minHeight: 864}}>
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Completed Withdraw</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="https://belove.uk">Home</a></li>
            <li className="breadcrumb-item active">Completed Withdraw</li>
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
              <form role="form" action="https://belove.uk/admin-panel/Compelte-Withdraw-Crpyto" method="post">
                <input type="hidden" name="_token" defaultValue="ufIIKQky4pOtOxFVX1zXKHf58iF6SEHdlPsJf3tm" />
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <div className="form-group">
                    <label>Pick a start date:</label>
                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                      <input type="text" className="form-control datetimepicker-input" data-target="#datepicker" placeholder="yyyy-mm-dd" name="start_date" defaultValue />
                      <div className="input-group-append" data-target="#datepicker" data-toggle="datetimepicker">
                        <div className="input-group-text"><i className="fa fa-calendar" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <div className="form-group">
                    <label>Pick a end date:</label>
                    <div className="input-group date" id="datepicker1" data-target-input="nearest">
                      <input type="text" className="form-control datetimepicker-input" data-target="#datepicker1" placeholder="yyyy-mm-dd" name="end_date" defaultValue />
                      <div className="input-group-append" data-target="#datepicker1" data-toggle="datetimepicker">
                        <div className="input-group-text"><i className="fa fa-calendar" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{clear: 'both'}} />
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <label htmlFor="validationCustomUsername">Select status</label>
                  <select className="custom-select selectbox" name="status">
                    <option value> ----Select---- </option>
                    <option value="P">Pending</option>
                    <option value="A">Approve</option>
                  </select>
                </div>
                <div className="col-md-6 mb-6" style={{float: 'left', marginTop: 10}}>
                  <label htmlFor="validationCustomUsername">Search User</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="validationCustomUsername" defaultValue placeholder="Name,Username,number" aria-describedby="inputGroupPrepend" name="user" />
                  </div>
                </div>
                {/*<div style="clear: both;"></div>*/}
                {/*<div class="col-md-12 mb-12" style="margin-top: 10px;">*/}
                {/*    <label for="validationCustomUsername">Select Wallet</label>*/}
                {/*    <select class="custom-select selectbox" name="wallet" >*/}
                {/*        <option value="" > ----Select---- </option>*/}
                {/*        <option value="Main Wallet" >Main Wallet</option>*/}
                {/*        <option value="Referal Wallet" >Referal Wallet</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div style={{clear: 'both'}} />
                <br />
                <div className="col-md-12 mb-12">
                  <center>
                    <button className="btn btn-primary" type="submit" style={{}}>Search Now</button>
                    <a className="btn btn-info" style={{marginLeft: 20, textAlign: 'center'}} href="https://belove.uk/admin-panel/Compelte-Withdraw-Crpyto">Reset</a>
                  </center>
                </div>
                <br />
              </form>
              <center>
                <a className="btn btn-danger" style={{marginLeft: 20, textAlign: 'center'}} href="https://belove.uk/admin-panel/Export-Withdraw-Crpyto/A">Export In Excel</a>
              </center>
              <br />
              <br />
              <div className="single-table">
                <div className="table-responsive">
                  <table className="table text-center" id>
                    <thead className="text-capitalize">
                      <tr>
                        <th>SR. No.</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Amount $</th>
                        <th>Detail</th>
                        <th>Request Date</th>
                        <th>Tranfer Date</th>
                        <th>Status</th>
                        {/*<th>Action</th>*/}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={11}>Result Not Found</td>
                      </tr>
                    </tbody>
                  </table>
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
        {/* Primary table end */}
      </div>
    </div>
  </section>
</div>

   </>
  )
}

export default NewAdminEarning;