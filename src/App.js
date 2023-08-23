import React from 'react';
import "./App.css";
import Header from './Components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Challenge from './Components/Challenge';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <> 
  
      <BrowserRouter>
      
        <Header />

     </BrowserRouter>

    </>
  )
}

export default App;