import React, { useEffect, useState } from 'react';
import AppBlockingRoundedIcon from '@mui/icons-material/AppBlockingRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PublicIcon from '@mui/icons-material/Public';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SavingsIcon from '@mui/icons-material/Savings';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import "./styles/Dashboard.css";
import { Box } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CountUp from 'react-countup';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import { baseURL } from '../token';
import axios from 'axios';


function Dashboard() {
    const [todayUserAvarage, setTodayUserAvarage] = useState(75);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);


    // const handleStartDateChange = (e) => {
    //     setStartDateFilter(e.target.value);
    // };

    // const handleEndDateChange = (e) => {
    //     setEndDateFilter(e.target.value);
    // };

    const pad = (number) => {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    };
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var day = currentDate.getDate();
    var formattedDate = pad(day) + "-" + pad(month) + "-" + year;

    const fetchDetails = async () => {
        try {
            const body = {
                startDate: startDate ? startDate : "20-08-2023",
                endDate: endDate ? endDate : formattedDate
            }

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log("headers", headers);

            const response = await axios.post(baseURL + '/admin/dashboard', body, {
                headers: headers,
            });
            console.log(response.data);
            setData(response.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: "column" }}>
                <section className='section'>
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
                        <br />
                    </form>
                    <div className="container-heading">
                        <h1>User Overview</h1>
                    </div>

                    <div className="main-small-box">
                        <div className="small-box bg-info" id='box-1'>
                            <p>Total Users</p>
                            <div className="inner">
                                <h3> <CountUp end={data.totalUsers} duration={5} /> </h3>
                            </div>
                            <div>
                                {/* <h2><CountUp end={totalUsersAvarage} duration={5} />% then last week</h2> */}
                            </div>
                            <div className="icon">
                                < PublicIcon sx={{ color: "#6e6efe" }} className="fas fa-shopping-cart" />
                            </div>
                            <div>
                            </div>
                        </div>
                        {/* <div className="small-box bg-info">
                            <p>Today Users</p>
                            <div className="inner">
                                <h3><CountUp end={todayUser} duration={5} /></h3>

                            </div>
                            <h2> <CountUp end={todayUserAvarage} duration={8} />% then last week</h2>
                            <div className="icon">
                                <AccountCircleRoundedIcon sx={{ color: "#5ea552" }} className="fas fa-shopping-cart" />
                            </div>

                        </div> */}
                        <div className="small-box bg-info" id='box-3'>
                            <p>Block Users</p>
                            <div className="inner">
                                <h3><CountUp end={data.blockedUsers} duration={5} /></h3>
                            </div>
                            {/* <h2><CountUp end={blockUsersAvarage} duration={5} />% then last week</h2> */}
                            <div className="icon">
                                <AppBlockingRoundedIcon sx={{ color: "#ff4444" }} className="fas fa-shopping-cart" />
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Active Users</p>
                            <div className="inner">
                                <h3><CountUp end={data.totalUsers - data.blockedUsers} duration={5} /></h3>
                            </div>
                            {/* <h2>{activeUsersAvarage}% then last week</h2> */}
                            <div className="icon">
                                < RecordVoiceOverIcon sx={{
                                    color: "#14eb62", animation: 'blinkingEffect 1s infinite',
                                    '@keyframes blinkingEffect': {
                                        '0%': { opacity: 1 }, // Fully visible
                                        '50%': { opacity: 0 }, // Fully transparent
                                        '100%': { opacity: 1 }, // Fully visible again
                                    },

                                }} className="fas fa-shopping-cart" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1>Challenge Overview</h1>
                    </div>
                    <div className="main-small-box">
                        <div className="small-box bg-info">
                            <p>Complete Challenge </p>
                            <div className="inner">
                                <h3><CountUp end={data.completedChallenges} duration={5} /></h3>
                            </div>
                            <div>
                                {/* <h2>{totalUsersAvarage}% then last week</h2> */}
                            </div>
                            <div className="icon">
                                < HowToRegIcon className="fas fa-shopping-cart" />
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Created Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.createdChallenges} duration={5} /></h3>
                            </div>
                            <h2><CountUp end={data?.createdChallenges} duration={5} />% then last week</h2>
                            <div className="icon">
                                < RunningWithErrorsIcon className="fas fa-shopping-cart" />
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p> Ongoing Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.ongoingChallenges} duration={5} /></h3>
                            </div>
                            {/* <h2><CountUp end={blockUsersAvarage} duration={5} />% then last week</h2> */}
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-info">
                            <p>Cancelled Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.cancelledChallenges} duration={5} /></h3>

                            </div>
                            {/* <h2>{<CountUp end={activeUsersAvarage} duration={5} />}% then last week</h2> */}
                            <div className="icon">
                                < CancelIcon sx={{ color: "#ff4444" }} className="fas fa-shopping-cart" />
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Judgement Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.judgementChallenges} duration={5} /></h3>
                            </div>
                            {/* <h2>{<CountUp end={activeUsersAvarage} duration={5} />}% then last week</h2> */}
                            <div className="icon">
                                < CancelIcon sx={{ color: "#ff4444" }} className="fas fa-shopping-cart" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1>Deposit Overview</h1>
                    </div>
                    <div className="main-small-box">
                        <div className="small-box bg-info">
                            <p>Total Deposit</p>
                            <div className="inner">
                                <h3>{<CountUp end={data.totalDeposits} duration={5} />}</h3>

                            </div>
                            <div>
                                {/* <h2>{totalUsersAvarage}% then last week</h2> */}
                            </div>
                            <div className="icon">
                                < CurrencyRupeeIcon sx={{ color: 'green' }} className="fas fa-shopping-cart" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Today Deposit</p>
                            <div className="inner">
                                <h3>{data.todayDeposits}</h3>

                            </div>
                            {/* <h2>{todayUserAvarage}% then last week</h2> */}
                            <div className="icon">
                                <SavingsIcon sx={{ color: 'pink' }} className="fas fa-shopping-cart" />
                            </div>

                        </div>

                        <div className="small-box bg-range">
                            <p>Range Deposits</p>
                            <div className="inner">
                                <h3>{data.rangeDeposits}</h3>

                            </div>
                            {/* <h2>{blockUsersAvarage}% then last week</h2> */}
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>



                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1> Withdraw Overview</h1>
                    </div>


                    <div className="main-small-box">


                        <div className="small-box bg-info">
                            <p>Total Withdraw</p>
                            <div className="inner">
                                <h3>{data.totalWithdraw}</h3>

                            </div>
                            <div>
                                {/* <h2>{totalUsersAvarage}% then last week</h2> */}
                            </div>
                            <div className="icon">
                                < PriceCheckIcon sx={{ color: 'lightgreen' }} className="fas fa-shopping-cart" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Today Withdraw</p>
                            <div className="inner">
                                <h3>{data.todayWithdraw}</h3>

                            </div>
                            {/* <h2>{todayUserAvarage}% then last week</h2> */}
                            <div className="icon">
                                <CurrencyExchangeIcon className="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-range">
                            <p>Withdraw Range</p>
                            <div className="inner">
                                <h3>{data.rangeWithdraw}</h3>

                            </div>
                            {/* <h2>{blockUsersAvarage}% then last week</h2> */}
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>

                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1> Commission Overview</h1>
                    </div>


                    <div className="main-small-box">


                        <div className="small-box bg-info">
                            <p>Total Admin Commission </p>
                            <div className="inner">
                                <h3>{data.commission}</h3>

                            </div>
                            <div>
                                {/* <h2>{totalUsersAvarage}% then last week</h2> */}
                            </div>
                            <div id='icon-container' className="icon">
                                <InsertChartIcon className="color-changing-icon" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>  Today Admin Commission</p>
                            <div className="inner">
                                <h3>{data.todayCommission}</h3>

                            </div>
                            {/* <h2>{todayUserAvarage}% then last week</h2> */}
                            <div className="icon">
                                <DataThresholdingIcon className="color-changings-icons" />
                            </div>

                        </div>
                        <div className="small-box bg-range">
                            <p>Penalty Coins</p>
                            <div className="inner">
                                <h3>{data.penaltyCoins}</h3>

                            </div>
                            {/* <h2>{blockUsersAvarage}% then last week</h2> */}
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>

                    </div>
                </section>

            </Box>
        </>
    )
}

export default Dashboard;