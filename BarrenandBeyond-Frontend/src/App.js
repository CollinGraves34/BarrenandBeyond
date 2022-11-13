import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import LogoutPage from './Pages/logoutPage';
import SignupPage from './Pages/signupPage';
import fourofourPage from './Pages/404Page';
import HomePage from './Pages/homePage';
import './Firebase/init';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index path='/' element={<LoginPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path='post' element={<postPage />} />
          <Route path="*" element={<fourofourPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
