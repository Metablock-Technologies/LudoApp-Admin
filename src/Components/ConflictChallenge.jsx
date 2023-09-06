import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { Pagination, PaginationItem, ArrowBackIcon, ArrowForwardIcon } from '@mui/material';

import { Visibility, Check } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { baseURL } from '../token';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

function GameJudgement() {
    // const [statusFilter, setStatusFilter] = React.useState('all');
    const [tableData, setTabledata] = useState([]);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedValue, setSelectedvalues] = useState('');
    const [statusFilter, setStatusFilter] = React.useState('all'); // State to keep track of selected status
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredtableData, setFilteredtableData] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [acceptor, setAcceptor] = useState("");


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
        setFilteredtableData(filteredData);
    };


    //paginations area 

    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(filteredtableData.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;


    const handleImageClick = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setViewerOpen(!viewerOpen);
    };


    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
        setStatusFilter('')
        setTabledata(tableData);
        setAcceptor("")
        // setIconRotation(iconRotation + 360); // Rotate the icon by 360 degrees
        gamejudgement()
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData?.filter((item) => {
            const itemDate = new Date(item?.createdAt);
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;

            // Check the date range
            if (startDateObj && endDateObj) {
                // Format the item date in the same format as your input (MM/DD/YYYY)
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                // console.log(start);
                // console.log(formattedItemDate, start, end);
                // console.log(formattedItemDate >= start);
                if (
                    formattedItemDate < start ||
                    formattedItemDate > end
                ) {
                    return false;
                }
            }
            if (startDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                if (
                    formattedItemDate < start
                ) {
                    return false;
                }
            }
            if (endDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                if (
                    formattedItemDate > end
                ) {
                    return false;
                }
            }

            // Check the user name

            if (searchQuery && !item?.ChallengerUser?.username?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            if (acceptor && !item?.AcceptorUser?.username?.toLowerCase().includes(acceptor.toLowerCase())) {
                return false;
            }
            return true;
        });

        setTabledata(filteredData);
        console.log(tableData);
        console.log(filteredData);
    };
    // const filteredtableData = statusFilter === 'all'
    //     ? tableData
    //     : tableData.filter(data => data.status === statusFilter);

    const filteredData = tableData.filter(data => {
        if (!startDate || !endDate) {
            return true;
        }
        const dataDate = new Date(data.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return dataDate >= start && dataDate <= end;
    });

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

    const renderedTableRows = filteredData.slice(startIndex, endIndex).map((data, index) => {
        const createdAt = new Date(data?.createdAt);
        const formattedDate = createdAt.toLocaleDateString();
        const formattedTime = createdAt.toLocaleTimeString();
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{data?.roomcode}</td>
            <td>{data?.ChallengerUser?.username}
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
                <Button color="primary" onClick={() => handleImageClick(data?.result.challenger_image)}>
                    <Visibility />
                </Button>
            </td>
            <td>{data?.AcceptorUser?.username}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => acceptreject(data?.id, data?.challenger)}
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
                <Button color="primary" onClick={() => handleImageClick(data?.result?.acceptor_image)}>
                    <Visibility />
                </Button>
            </td>
            <td>{data?.price}</td>
            <td>{data?.result.challengeId}</td>
            {/* <td>{data.result.WinnerUser ? data.result.WinnerUser.username : ''}</td> */}
            {/* <td>{data?.result.WinnerUser?.username}</td> */}
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
            <td>{formattedDate}</td>
            <td>{formattedTime}</td>
        </tr>)
    });





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
                                            <form role="form" type="submit">
                                                {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                                                <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                    <div className="form-group">
                                                        <label>Pick a start date:</label>
                                                        <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                            <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                    <div className="form-group">
                                                        <label>Pick a end date:</label>
                                                        <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                            <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div style={{ clear: 'both' }} />
                                                <div className='row'>
                                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                        <div className="form-group">
                                                            <label htmlFor="validationCustomUsername"> Challenger username</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Username"
                                                                    name="userid"
                                                                    value={searchQuery}
                                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                        <div className="form-group">
                                                            <label htmlFor="validationCustomUsername">Acceptor username</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Username"
                                                                    name="userid"
                                                                    value={acceptor}
                                                                    onChange={(e) => setAcceptor(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                                <div className='row' />
                                                <br />
                                                <div className="col-12">
                                                    <center>
                                                        <button className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                        <button className="button-reset btn btn-info" style={{ marginLeft: '20px' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

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
                                                                        {/* <th>Winner</th> */}
                                                                        <th>Message</th>
                                                                        {/* <th>Penalty</th> */}
                                                                        <th>Date</th>
                                                                        <th>Time</th>
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
                                                        <Pagination
                                                            count={totalPages}
                                                            page={currentPage}
                                                            onChange={(event, page) => setCurrentPage(page)}
                                                            renderItem={(item) => (
                                                                <PaginationItem
                                                                    component="a"
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setCurrentPage(item.page);
                                                                    }}
                                                                    {...item}
                                                                />
                                                            )}
                                                        />
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
