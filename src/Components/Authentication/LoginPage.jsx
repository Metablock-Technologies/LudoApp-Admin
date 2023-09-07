import React, { useState } from 'react';
import { Button, TextField, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import './AdminRegistrationPage.css';
import { baseURL, token } from '../../token';
import axios from 'axios';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function AdminLoginPage() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Step 2

    const navigate = useNavigate();
    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
        // Clear the respective error message when user starts typing
        if (name === 'email') {
            setEmailError('');
        }
        if (name === 'password') {
            setPasswordError('');
        }
    };

    const handleAdminLogin = async () => {
        try {
            const requestBody = {
                email: loginData.email,
                password: loginData.password,
            };
            // console.log(requestBody);
            // const accessToken = localStorage.getItem('access_token');
            // const accessToken = token;
            // const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.post(baseURL + '/admin/login', requestBody);

            // console.log(response.data.data.token);
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.data.token);
                setLoginSuccessful(true);
                navigate('/dashboard')
            }

            setEmailError('');
            setPasswordError('');


            // if (response.status === 200) {
            //     setIsPhoneNumberVerified(true);
            //     setShowEmailField(true);
            //     setIsEmailVerified(true);
            //     setIsVerifying(false);
            //     setShowOtpFields(false);
            //     setIsGetOtpDisabled(true);

            //     if (response.status === 200 && isEmailVerified) {
            //         navigate(`/SignUpPage?name=${name}&phoneNumber=${phoneNumber}&email=${email}`);
            //         localStorage.setItem('access_token', response.data.data.accessToken);
            //     }
            // }
        }
        catch (err) {
            console.log(err);

            if (err.response && err.response.status === 401) {
                setEmailError('Incorrect email or password.');
                setPasswordError('Incorrect email or password.');
            } else {
                setEmailError('An error occurred while logging in.');
                setPasswordError('An error occurred while logging in.');
            }
            // Enable the Get OTP button
        }


        if (loginData.email === '') {
            setEmailError('Please enter your email.');
            return;
        }

        if (loginData.password === '') {
            setPasswordError('Please enter your password.');
            return;
        }

    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Step 3
    };


    return (


        //         <>
        //             <div className="container max-w-md mx-auto  flex justify-center items-center xl:max-w-lg  flex bg-white rounded-lg shadow overflow-hidden">
        //   <div className="w-full xl:w-full p-8">
        //     <form>
        //       <h1 className="text-2xl font-bold text-[#452a72]">Sign in to your account</h1>
        //       <button>Admin Signup</button>
        //       <div className="mb-6 mt-6">
        //         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
        //         <input className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10" id="email" type="text" placeholder="Your email address" defaultValue />
        //       </div>
        //       <div className="mb-3 mt-6"><label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
        //         <input className="mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10" id="password" type="password" placeholder="Your password" defaultValue />
        //       </div>
        //       <div className="flex w-full mt-8">
        //         <button className="w-full bg-[#452a72] hover:bg-transparent hover:text-[#452a72] hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="submit">Sign in</button>
        //       </div>
        //     </form>
        //   </div>
        // </div>

        //         </>
        <> {loginSuccessful ? (<> <Header />
        </>) :
            (<>
                <Container component="main" maxWidth="xs" sx={{ width: '100%', padding: '64px' }}>
                    <div className="registration-container">
                        <Typography sx={{ fontWeight: '600', fontSize: '24px', marginBottom: '0.5rem' }} variant="h5">Admin Sign in  to your account </Typography>
                        <Typography sx={{ fontSize: '16px' }} variant="h5">Admin Sign up</Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginInputChange}

                        />
                        {emailError && <Typography color="error">{emailError}</Typography>}
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginInputChange}
                            InputProps={{ // Add the eye button
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                        />
                        {passwordError && <Typography color="error">{passwordError}</Typography>}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAdminLogin}
                        >
                            Login
                        </Button>

                    </div>
                </Container>
            </>)}


        </>
    );
}

export default AdminLoginPage;
