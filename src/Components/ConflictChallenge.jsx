import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton, TablePagination } from '@mui/material';
import { Pagination, PaginationItem, ArrowBackIcon, ArrowForwardIcon } from '@mui/material';

import { Visibility, Check } from '@mui/icons-material';
import ImageViewer from './ImageViewer';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

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
    const [openDialog, setOpenDialog] = useState(false);

    const [imageSrc, setImageSrc] = useState('');


    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset the page to the first page when changing rows per page
    };
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



    //dialog box
    const handleOpenDialog = (imageUrl) => {
        setOpenDialog(true);
        setImageSrc(imageUrl);
        // fetch(`${baseURL}/image/${imageUrl}`)
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //         const objectURL = URL.createObjectURL(blob);
        //         console.log(objectURL)
        //         setImageSrc(objectURL);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching image:', error);
        //     });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setImageSrc("");
    };


    //paginations area 

    const ITEMS_PER_PAGE = 20;
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

            // console.log(headers);
            const response = await axios.get(baseURL + '/admin/challengeresults', {
                headers: headers,
            });

            // console.log("responsegamejudgement", response.data);

            // Filter challenges with status "judgement"
            const judgementChallenges = response?.data?.data?.filter(data => data.status === 'judgement');
            setTabledata(judgementChallenges);

            judgementChallenges.forEach(data => {
                const createdAt = new Date(data?.updatedAt);
                const currentTime = new Date();
                const nineMinutesAgo = new Date(currentTime - 10 * 60 * 1000); // 8 minutes ago
                // const nineMinutesAgo = new Date(currentTime - 8 * 60 * 1000); // 8 minutes ago
                console.log(nineMinutesAgo, currentTime);
                if ((data?.result?.acceptor_responded === true && data?.result?.challenger_responded == true)) {
                    if (data?.result?.acceptor_image && !data?.result?.challenger_image) {
                        acceptreject(data?.id, data?.acceptor, "accepted");
                    }
                    else if (!data?.result?.acceptor_image && data?.result?.challenger_image) {
                        acceptreject(data?.id, data?.challenger, "accepted");
                    }
                }
                if (createdAt <= nineMinutesAgo) {
                    console.log("created at time is small than new time ", data);
                    // console.log(!data?.result?.challenger_input);
                    // console.log(!data?.result?.acceptor_input);
                    if (data?.result?.challenger_input || data?.result?.acceptor_input) {
                        console.log("in main condition", data?.result?.acceptor_responded);

                        if ((data?.result?.acceptor_responded === true && !data?.result?.acceptor_image) && data?.result?.challenger_responded == false) {
                            console.log(("acceptor lost"));
                            acceptreject(data?.id, data?.challenger, "accepted");
                        }
                        else if ((data?.result?.challenger_responded == true && !data?.result?.challenger_image) && data?.result?.acceptor_responded == false) {
                            console.log(("cahllenger lost"));
                            acceptreject(data?.id, data?.acceptor, "accepted");
                        }
                        else if ((data?.result?.challenger_responded == true && data?.result?.challenger_image) && (data?.result?.acceptor_responded === false && !data?.result?.acceptor_image)) {
                            console.log(("acceptor lost"));
                            acceptreject(data?.id, data?.challenger, "accepted");
                        }
                        else if ((data?.result?.challenger_responded == false && data?.result?.challenger_image == null) && (data?.result?.acceptor_responded === true && data?.result?.acceptor_image)) {
                            console.log(("acceptor lost"));
                            acceptreject(data?.id, data?.acceptor, "accepted");
                        }
                        // if (data?.result?.challenger_input === false || (data?.result?.challenger_input === false && !data?.result?.challenger_image)) {
                        //     // console.log(("acceptor won"));
                        //     acceptreject(data?.id, data?.acceptor, "rejected");
                        // } else if (data?.result?.acceptor_input === false || (data?.result?.acceptorr_input === true && !data?.result?.acceptorr_image)) {
                        //     console.log(("cahllenger won"));
                        //     acceptreject(data?.id, data?.challenger, "rejected");
                        // }
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    const acceptreject = async (id, winnerid, type) => {
        try {
            const requestbody = {
                challengeId: id,
                winnerId: winnerid,
                type: type ? type : selectedValue
            }
            console.log(requestbody);
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(requestbody);
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
        console.log(("judgements", new Date()));
        gamejudgement();

        const updateInterval = setInterval(() => {
            // console.log("10 minutes has been completyed", new Date());
            gamejudgement();
            // }, 600);   //10 minutes
        }, 6000);   //10 minutes

        return () => {
            // Clear the interval when the component is unmounted
            clearInterval(updateInterval);
        };
    }, [])

    const renderedTableRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
        const createdAt = new Date(data?.createdAt);
        const formattedDate = createdAt.toLocaleDateString();
        const formattedTime = createdAt.toLocaleTimeString();
        return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{data?.roomcode}</td>
            <td>
                <div>
                    {data?.ChallengerUser?.username}
                </div>

                {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => acceptreject(data.id, data.challenger)}
                ></Button> */}

                {data?.status === "judgement" ?
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => acceptreject(data.id, data?.challenger)}
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
                    : null
                }
            </td>
            <td>
                <Button color="primary" onClick={() => handleOpenDialog(data?.result?.challenger_image)}>
                    <Visibility />
                </Button>
            </td>
            <td>
                <div>

                    {data?.AcceptorUser?.username}
                </div>
                {data?.status === "judgement" ?
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => acceptreject(data?.id, data?.acceptor)}
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
                    : null
                }
            </td>
            <td>
                <Button color="primary" onClick={() => handleOpenDialog(data?.result?.acceptor_image)}>
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


    // const [imageurl, setImageurl] = useState('');
    // const fetchimage = async () => {
    //     try {
    //         // const params = {
    //         //     key: selectedImageUrl
    //         // }
    //         console.log("imageurl fetching");
    //         const accessToken = localStorage.getItem('access_token');
    //         const headers = accessToken ? {Authorization: `Bearer ${accessToken}` } : { };

    //         console.log(headers);
    //         const response = await axios.get(baseURL + `/image/${selectedImageUrl}`, {
    //             headers: headers,
    //         });
    //         console.log(response.data);
    //         setImageurl(response.data);
    //         console.log(imageurl);
    //     } catch (error) {

    //     }
    // }
    // useEffect(() => {
    //     fetchimage();
    // }, [selectedImageUrl])
    return (

        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Image</DialogTitle>
                <DialogContent>
                    {/* Add your dialog content here */}
                    {imageSrc ? <img src={`https://backened.ludokavish.com/api/v1/image/${imageSrc}`} alt="Preview" /> : 'No Image'}
                    {/* <p>This is the dialog content.</p> */}
                </DialogContent>
            </Dialog>
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
                                                            // <ImageViewer imageUrl={selectedImageUrl} />
                                                            <div>
                                                                <a href={baseURL + "/image/" + selectedImageUrl} alt="Acceptor Image">Link to image</a>
                                                                {/* <a target="_blank" href={imageurl} src={imageurl} alt="Acceptor Image" /> */}
                                                            </div>
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
                                                        <TablePagination
                                                            component="div"
                                                            count={filteredData.length}
                                                            rowsPerPageOptions={[5, 10, 25]}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
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
