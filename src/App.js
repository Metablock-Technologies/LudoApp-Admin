import React from 'react';
import "./App.css";
import Header from './Components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Challenge from './Components/Challenge';
import Dashboard from './Components/Dashboard';
import { Login } from '@mui/icons-material';
import AdminLoginPage from './Components/Authentication/LoginPage';

function App() {

  
  return (
    <> 
     
      <BrowserRouter>
        <AdminLoginPage  />
        {/* <Header /> */}
       

     </BrowserRouter>

    </>
  )
}

export default App;