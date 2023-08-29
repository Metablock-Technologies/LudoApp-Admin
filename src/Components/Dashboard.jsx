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
import "./styles/Dashboard.css";
import { Box } from '@mui/material';
import CountUp from 'react-countup';

import { baseURL } from '../token';
import axios from 'axios';


function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(15000);
    const [todayUser, setTodayUser] = useState(13240);
    const [activeUsers, setActiveUsers] = useState(18240);
    const [blockUsers, setBlockUsers] = useState(1500);
    const [totalUsersAvarage, setTotalUsersAvarage] = useState(50);
    const [todayUserAvarage, setTodayUserAvarage] = useState(75);
    const [activeUsersAvarage, setActiveUsersAvarage] = useState(84);
    const [blockUsersAvarage, setBlockUsersAvarage] = useState(78);


    const initialData = {
        rangeDeposits: 0,
        totalDeposits: 0,
        todayDeposits: 0,
        rangeWithdraw: 0,
        totalWithdraw: 0,
        todayWithdraw: 0,
        totalUsers: 0,
        blockedUsers: 0,
        completedChallenges: 0,
        ongoingChallenges: 0,
        createdChallenges: 0,
        cancelledChallenges: 0,
        judgementChallenges: 0,
        commission: 0,
        todayCommission: 0,
        penaltyCoins: 0,
    };

    const [data, setData] = useState(initialData);

    const fetchDetails = async () => {
        try {
            const queryparams = {
                startDate: "20-08-2023",
                endDate: "20-08-2023"
            }

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log("headers", headers);

            const response = await axios.get(baseURL + '/admin/dashboard', {
                params: queryparams,
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
                                <h2><CountUp end={totalUsersAvarage} duration={5} />% than last week</h2>
                            </div>
                            <div className="icon">
                                < PublicIcon sx={{ color: "#6e6efe" }} className="fas fa-shopping-cart" />
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Today Users</p>
                            <div className="inner">
                                <h3><CountUp end={todayUser} duration={5} /></h3>

                            </div>
                            <h2> <CountUp end={todayUserAvarage} duration={8} />% than last week</h2>
                            <div className="icon">
                                <AccountCircleRoundedIcon sx={{ color: "#5ea552" }} className="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-info" id='box-3'>
                            <p>Block Users</p>
                            <div className="inner">
                                <h3><CountUp end={data.blockedUsers} duration={5} /></h3>
                            </div>
                            <h2><CountUp end={blockUsersAvarage} duration={5} />% than last week</h2>
                            <div className="icon">
                                <AppBlockingRoundedIcon sx={{ color: "#ff4444" }} className="fas fa-shopping-cart" />
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Active Users</p>
                            <div className="inner">
                                <h3><CountUp end={activeUsers} duration={5} /></h3>
                            </div>
                            <h2>{activeUsersAvarage}% than last week</h2>
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
                        <h1>Challenge OverView</h1>
                    </div>
                    <div className="main-small-box">
                        <div className="small-box bg-info">
                            <p>Complete Challenge </p>
                            <div className="inner">
                                <h3><CountUp end={data.completedChallenges} duration={5} /></h3>
                            </div>
                            <div>
                                <h2>{totalUsersAvarage}% than last week</h2>
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
                            <h2><CountUp end={todayUserAvarage} duration={5} />% than last week</h2>
                            <div className="icon">
                                < RunningWithErrorsIcon className="fas fa-shopping-cart" />
                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p> Ongoing Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.ongoingChallenges} duration={5} /></h3>
                            </div>
                            <h2><CountUp end={blockUsersAvarage} duration={5} />% than last week</h2>
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-info">
                            <p>Cancelled Challenge</p>
                            <div className="inner">
                                <h3><CountUp end={data.cancelledChallenges} duration={5} /></h3>

                            </div>
                            <h2>{<CountUp end={activeUsersAvarage} duration={5} />}% than last week</h2>
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
                                <h2>{totalUsersAvarage}% than last week</h2>
                            </div>
                            <div className="icon">
                                < CurrencyRupeeIcon className="fas fa-shopping-cart" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Today Deposit</p>
                            <div className="inner">
                                <h3>{data.todayDeposits}</h3>

                            </div>
                            <h2>{todayUserAvarage}% than last week</h2>
                            <div className="icon">
                                <SavingsIcon className="fas fa-shopping-cart" />
                            </div>

                        </div>

                        <div className="small-box bg-range">
                            <p>Range</p>
                            <div className="inner">
                                <h3>{data.rangeDeposits}</h3>

                            </div>
                            <h2>{blockUsersAvarage}% than last week</h2>
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>



                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1> Withdraw OverView</h1>
                    </div>


                    <div className="main-small-box">


                        <div className="small-box bg-info">
                            <p>Total Withdraw</p>
                            <div className="inner">
                                <h3>{data.totalWithdraw}</h3>

                            </div>
                            <div>
                                <h2>{totalUsersAvarage}% than last week</h2>
                            </div>
                            <div className="icon">
                                < PriceCheckIcon className="fas fa-shopping-cart" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>Today Withdraw</p>
                            <div className="inner">
                                <h3>{data.todayWithdraw}</h3>

                            </div>
                            <h2>{todayUserAvarage}% than last week</h2>
                            <div className="icon">
                                <i class="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-range">
                            <p>Withdraw Range</p>
                            <div className="inner">
                                <h3>{data.rangeWithdraw}</h3>

                            </div>
                            <h2>{blockUsersAvarage}% than last week</h2>
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>

                    </div>
                </section>
                <section className='section'>
                    <div className="container-heading">
                        <h1> Commission OverView</h1>
                    </div>


                    <div className="main-small-box">


                        <div className="small-box bg-info">
                            <p>Total Admin Commission </p>
                            <div className="inner">
                                <h3>{data.commission}</h3>

                            </div>
                            <div>
                                <h2>{totalUsersAvarage}% than last week</h2>
                            </div>
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="small-box bg-info">
                            <p>  Today Admin Commission</p>
                            <div className="inner">
                                <h3>{data.todayCommission}</h3>

                            </div>
                            <h2>{todayUserAvarage}% than last week</h2>
                            <div className="icon">
                                <i className="fas fa-shopping-cart" />
                            </div>

                        </div>
                        <div className="small-box bg-range">
                            <p>Penalty Coins</p>
                            <div className="inner">
                                <h3>{data.penaltyCoins}</h3>

                            </div>
                            <h2>{blockUsersAvarage}% than last week</h2>
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