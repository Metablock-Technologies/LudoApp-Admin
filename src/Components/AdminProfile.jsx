import React, { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Input,
    Typography,
} from "@mui/material";
// import EditPassword from "./Component/EditPassword";
import { baseURL } from "../token";
import { useNavigate } from "react-router";
import axios from "axios";

function AdminProfile() {
    const navigate = useNavigate();
    const [open2, setOpen2] = useState(false);
    const [adminData, setAdminData] = useState({});
    const [editMode, setEditMode] = useState(false);

    const fetchDetails = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.get(`${baseURL}/admin/profile/1`, {
                headers: headers,
            });

            setAdminData(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div style={{ padding: "50px" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={5}>
                    <Card>
                        <CardContent>
                            <div className="flex flex-col items-center">
                                <div className="h-24 w-24 rounded-full mb-3">
                                    {/* <img className="h-full w-full object-cover rounded-full shadow" src={img1} /> */}
                                </div>
                                <Typography variant="h6" gutterBottom>
                                    {editMode ? (
                                        <Input
                                            value={adminData.name}
                                            onChange={(e) =>
                                                setAdminData({
                                                    ...adminData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        adminData.name
                                    )}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {editMode ? (
                                        <Input
                                            value={adminData.email}
                                            onChange={(e) =>
                                                setAdminData({
                                                    ...adminData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        adminData.email
                                    )}
                                </Typography>
                                <div className="flex mb-6 gap-2">
                                    {editMode ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                onClick={handleEditMode}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={handleEditMode}
                                            >
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            onClick={handleEditMode}
                                        >
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                                <div className="flex justify-start flex-wrap pt-5 gap-4 socials px-3">
                                    {/* Social icons */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body2">
                                        {editMode ? (
                                            <Input
                                                value={adminData.phone}
                                                onChange={(e) =>
                                                    setAdminData({
                                                        ...adminData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            adminData.phone
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body2">
                                        {editMode ? (
                                            <Input
                                                value={adminData.email}
                                                onChange={(e) =>
                                                    setAdminData({
                                                        ...adminData,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            adminData.email
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Name
                                    </Typography>
                                    <Typography variant="body2">
                                        {editMode ? (
                                            <Input
                                                value={adminData.name}
                                                onChange={(e) =>
                                                    setAdminData({
                                                        ...adminData,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            adminData.name
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Username
                                    </Typography>
                                    <Typography variant="body2">
                                        {editMode ? (
                                            <Input
                                                value={adminData.username}
                                                onChange={(e) =>
                                                    setAdminData({
                                                        ...adminData,
                                                        username: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            adminData.username
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default AdminProfile;
