import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import LogoutPage from './Pages/logoutPage';
import SignupPage from './Pages/signupPage';
import ErrorPage from './Pages/ErrorPage';
import LatestPostPage from './Pages/latestPost';
import AccountPage from './Pages/accountPage';
import HomePage from './Pages/homePage';
import './Firebase/init';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index path='/' element={<LoginPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path='post' element={<postPage />} />
          <Route path='latest-posts' element={<LatestPostPage />} />
          <Route path='account' element={<AccountPage />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
