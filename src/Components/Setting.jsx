import React, { useState } from 'react'
import "../Components/styles/Settings.css"
const Settings = () => {


    return (
        <>
            <div className='fade-in'>
                <div style={{ paddingLeft: '2rem', marginTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid white' }}>
                    <h3 style={{ color: 'white' }}> Settings</h3>
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
                                                    {/* <label htmlFor="fullName">Plateform commisson</label> */}
                                                    <input type="text" className="form-control" id="fullName" placeholder="Platefrom commission" />


                                                </div>
                                                {/* <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div> */}

                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    {/* <label htmlFor="eMail">Withdraw commission</label> */}
                                                    <input type="email" className="form-control" id="eMail" placeholder="Fraud Penalty" />
                                                    {/* <input type="email" className="form-control" id="eMail" placeholder="Withdraw commission" /> */}
                                                </div>
                                                {/* <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div> */}
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    {/* <label htmlFor="phone">Phone</label> */}
                                                    <input type="text" className="form-control" id="phone" placeholder="No update penalty" />
                                                    {/* <input type="text" className="form-control" id="phone" placeholder="Enter UPI Id" /> */}
                                                </div>
                                                {/* <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div> */}
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    {/* <label htmlFor="website">Website URL</label> */}
                                                    <input type="name" className="form-control" id="website" placeholder="Wrong Update Penalty" />
                                                    {/* <input type="name" className="form-control" id="website" placeholder="Enter Penalty" /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div>
                                        {/* <div className="row gutters">
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="Street">Street</label> 
                                                <textarea type="name" className="form-control" id="Street" placeholder="Home Screen Text " />
                                            </div>
                                            <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label >Enter QR Code</label>
                                                <input type="file" className="form-control" id="ciTy" placeholder="Enter Screenshort" />
                                            </div>
                                            <div style={{ marginBottom: '2rem' }}>  <button className="btn btn-primary">Submit</button></div>
                                        </div>
                                      
                                        
                                    </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
export default Settings
