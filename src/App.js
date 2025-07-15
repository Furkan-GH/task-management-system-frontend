import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './pages/Login/login';
import MainPage from './pages/MainPage/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';

function App() {
  return( 
  <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Login />} />
        <Route
          path="/page" element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
)}

export default App;
