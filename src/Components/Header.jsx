
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import GavelIcon from '@mui/icons-material/Gavel';
import { Settings } from '@mui/icons-material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Challenge from './Challenge';
import AdminEarning from './AdminEarning';
import UserManager from './UserManager';
import AdminLoginPage from "./Authentication/LoginPage"
import Setting from './Setting';
import AdminManager from './AdminManager';
import EditPermission from './Permissions/EditPermission';
import AdminProfile from './AdminProfile';
import { useState, useEffect } from 'react';
import Addcoins from './Addcoins';
import Withdrawcoins from './Withdrawcoins';
import AvatarMenu from "./AvatarMenu";
import GameJudgement from './GameJudgement';
import AdminRegistrationPage from './Authentication/CreateAdmin';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Header() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [swidth, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();




    // const [selectedOption, setSelectedOption] = React.useState('View all users');
    const AppBar = styled(MuiAppBar, {


        shouldForwardProp: (prop) => prop !== 'open',

    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && swidth > 768 && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    // const options = [
    //     'View all users',
    //     'Add new users',
    //     'Pending KYC',
    //     'Completed KYC',
    //     'Reject KYC',
    // ];

    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };
    //const container = window !== undefined ? () => window().document.body : undefined;
    useEffect(() => {
        function handleWindowResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWindowResize);
        console.log(swidth)
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);


    const handleBackdropClick = () => {
        if (swidth <= 768) {
            setOpenDrawer(false);
            setOpen(false);
        }
    };
    const handleDrawerOpen = () => {
        setOpenDrawer(!openDrawer);
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
        setOpen(false);
    };

    const drawer = (
        <>
            <DrawerHeader style={{ backgroundColor: " #00064b" }}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: "white" }} />}
                </IconButton>
            </DrawerHeader>
            <Divider sx={{ background: 'black' }} />
            <List>

            </List>
            <Divider />
            <List className='main-list' sx={{ color: "white", fontWeight: "500", backgroundColor: "#00064b" }}>
                {/* <ListItem disablePadding sx={{ display: 'block' }} >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => navigate("/register")}  >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}

                                    >
                                        <PersonAdd sx={{ color: "blue", fontSize: "30px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Admin" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            */}
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate("/")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}

                        >
                            <LineStyleIcon sx={{ color: "blue", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/AdminProfile')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <ManageAccountsIcon sx={{ color: "#00eaff", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Admin Profile" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/AdminManager')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <AdminPanelSettingsIcon sx={{ color: "red", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Admin Manager" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/AdminEarning')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <AttachMoneyIcon sx={{ color: "yellow", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Admin Earning" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/UserManager')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <AccountCircleIcon sx={{ color: "lightBlue", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="User Manager" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/Addcoins')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <MonetizationOnIcon sx={{ color: "yellow", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Deposit Payments" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/Challenge')} >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SportsEsportsIcon sx={{ color: "lightGreen", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Challenge Manager" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/GameJudgement')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GavelIcon sx={{ color: "yellow", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Conflict Challenges" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding sx={{ display: 'block' }} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => navigate('/NewTransaction')}  >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >

                                    <AccountBalanceWalletIcon sx={{ color: "orange", fontSize: "30px" }} />
                                </ListItemIcon>
                                <ListItemText primary="Transcation Manager" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem> */}



                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/Withdrawcoins')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >

                            <MoneyOffIcon sx={{ color: "yellow", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Withdraw Payments" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/Setting')}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Settings sx={{ color: "gray", fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )

    return (
        <div className="container-section">
            <Box sx={{
                display: 'flex', animation: `$fadeInOut} 1s`,
                transition: '0.8s !important',
                transitionDuration: '0.9s !important',
                transitionTimingFunction: 'ease !important',
            }}>
                {/* <CssBaseline /> */}
                <AppBar sx={{ justifyContent: "space-between" }} position="fixed" open={open} component="nav">
                    <Toolbar sx={{ justifyContent: "space-between", background: " #00064b " }}>
                        <IconButton
                            color="white"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                color: "white",
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <AvatarMenu />

                    </Toolbar>

                </AppBar>
                <nav>
                    {
                        swidth > 768 ? (<Drawer sx={{ background: '#00064b' }} variant="permanent" open={open} >
                            {drawer}
                        </Drawer>) : (
                            <MuiDrawer variant="persistent" sx={{ background: '#00064b' }} open={open} onClick={handleBackdropClick} >
                                {drawer}
                            </MuiDrawer>
                        )
                    }
                </nav>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 5,
                        overflow: 'auto',
                        '@media (max-width:600px)': {
                            p: 2, // Adjust padding for smaller screens
                        },
                        '@media (max-width:960px)': {
                            p: 2, // Further adjust padding for medium screens
                        },
                    }}
                >

                    <Routes>
                        {/* <Route exact path='/' element={<AdminLoginPage />}></Route> */}
                        <Route exact path='/' element={<Dashboard />}></Route>

                        <Route exact path='/register' element={<AdminRegistrationPage />}></Route>
                        <Route exact path='/Challenge' element={<Challenge />}></Route>
                        <Route exact path='/UserManager' element={<UserManager />}></Route>
                        <Route exact path='/AdminManager' element={<AdminManager />}></Route>
                        {/* <Route exact path='/NewTransaction' element={<NewTransaction />}></Route> */}
                        <Route exact path='/EditPermissionr' element={<EditPermission />}></Route>
                        <Route exact path='/AdminEarning' element={<AdminEarning />}></Route>
                        <Route exact path='/AdminProfile' element={<AdminProfile />}></Route>
                        <Route exact path='/Addcoins' element={<Addcoins />}></Route>
                        <Route exact path='/Withdrawcoins' element={<Withdrawcoins />}></Route>
                        <Route exact path='/GameJudgement' element={<GameJudgement />}></Route>
                        <Route exact path='/Setting' element={<Setting />}></Route>
                    </Routes>

                    {/* <Dashboard /> */}
                </Box>
            </Box>
        </div >
    );
}