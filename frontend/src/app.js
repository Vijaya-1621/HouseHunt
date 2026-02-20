import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import "./App.css";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";

import AdminHome from "./modules/admin/AdminHome";
import OwnerHome from "./modules/user/Owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

export const UserContext = createContext();

function App() {
  const year = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserData(storedUser);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log("Error loading user:", error);
    }
  }, []);

  useEffect(() => {
    document.title = "RentEase | Smart Rental Management";
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="app-container">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />

              <Route
                path="/adminhome"
                element={userLoggedIn ? <AdminHome /> : <Login />}
              />
              <Route
                path="/ownerhome"
                element={userLoggedIn ? <OwnerHome /> : <Login />}
              />
              <Route
                path="/renterhome"
                element={userLoggedIn ? <RenterHome /> : <Login />}
              />
            </Routes>
          </div>

          <footer className="footer">
            © {year} RentEase — Smart Rental Management Platform
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
