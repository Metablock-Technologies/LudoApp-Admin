import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import './AdminRegistrationPage.css'
import { Padding } from '@mui/icons-material';
import { baseURL } from '../../token';
import axios from 'axios';

function AdminRegistrationPage() {
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        name: '',
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAdminRegistration = async () => {
        try {
            const requestBody = {
                phone: "91" + formData.phone,
                email: formData.email,
                name: formData.name,
                username: formData.username,
                password: formData.password,
            };
            // console.log(requestBody);

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.post(baseURL + '/admin/createadmin', requestBody, {
                headers: headers,
            });

            console.log(response);

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.data.accessToken);
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
                <Typography variant="h5">Admin Registration</Typography>
                <TextField
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAdminRegistration}
                >
                    Register
                </Button>
            </div>
        </Container>
    );
}

export default AdminRegistrationPage;
