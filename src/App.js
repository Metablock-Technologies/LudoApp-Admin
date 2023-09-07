import React from 'react';
import "./App.css";
import Header from './Components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Challenge from './Components/ChallengeManager';
import Dashboard from './Components/Dashboard';
import { Login } from '@mui/icons-material';
import AdminLoginPage from './Components/Authentication/LoginPage';

import Layout from './Layout/Layout'
import AuthLayout from './Layout/AuthLayout'
import AdminRegistrationPage from './Components/Authentication/CreateAdmin';
import UserManager from './Components/UserManager';
import EditPermission from './Components/Permissions/EditPermission';
import AdminProfile from './Components/AdminProfile';
import Addcoins from './Components/DepositPayment';
import Withdrawcoins from './Components/Withdrawcoins';
import GameJudgement from './Components/ConflictChallenge';
import Settings from './Components/Setting';
import AdminManager from './Components/AdminManager';
import AdminEarning from './Components/AdminEarning';
import ForgetEmail from './Components/ForgetPassword/ForgetEmail';
import GetForgetOtp from './Components/ForgetPassword/GetForgetOtp';
import ChangePassword from './Components/ForgetPassword/ChangePassword';

function App() {
    return (
        <>
            <BrowserRouter>
                {/* <AdminLoginPage /> */}
                {/* <Header /> */}
                <Routes>
                    <Route exact path={`/*`} element={<AuthLayout />}>
                        <Route exact path='' element={<AdminLoginPage />}></Route>

                        <Route exact path='forgetPassword' element={<ForgetEmail />}></Route>
                        <Route exact path='getForgetOtp' element={<GetForgetOtp />}></Route>
                        <Route exact path='changePassword' element={<ChangePassword />}></Route>
                    </Route>
                    <Route exact path="/*" element={<Layout />}>
                        <Route exact path='dashboard' element={<Dashboard />}></Route>
                        <Route exact path='register' element={<AdminRegistrationPage />}></Route>
                        <Route exact path='Challenge' element={<Challenge />}></Route>
                        <Route exact path='UserManager' element={<UserManager />}></Route>
                        <Route exact path='AdminManager' element={<AdminManager />}></Route>
                        {/* <Route exact path='/NewTransaction' element={<NewTransaction />}></Route> */}
                        <Route exact path='EditPermissionr' element={<EditPermission />}></Route>
                        <Route exact path='AdminEarning' element={<AdminEarning />}></Route>
                        <Route exact path='AdminProfile' element={<AdminProfile />}></Route>
                        <Route exact path='Addcoins' element={<Addcoins />}></Route>
                        <Route exact path='Withdrawcoins' element={<Withdrawcoins />}></Route>
                        <Route exact path='GameJudgement' element={<GameJudgement />}></Route>
                        <Route exact path='Setting' element={<Settings />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App;