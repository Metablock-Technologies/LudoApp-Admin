import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import './AdminRegistrationPage.css';
import { baseURL, token } from '../../token';
import axios from 'axios';


function AdminLoginPage() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
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
            }

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
            // Enable the Get OTP button
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ padding: '44px' }}>
            <div className="registration-container">
                <Typography variant="h5">Admin Login</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                />
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
    );
}

export default AdminLoginPage;
