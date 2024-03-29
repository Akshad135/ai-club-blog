import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import "./header.css"; // Make sure to import the CSS file used for styling

const Headers = () => {
  const [userdata, setUserdata] = useState({});
  const location = useLocation(); // Get current location

  console.log("response", userdata);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", {
        withCredentials: true,
      });

      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <header>
        <nav className="navbar">
          <h1 className="navbar__header">BlogArena</h1>
          <div className="navbar__user__data">
            {Object.keys(userdata).length > 0 ? (
              <>
                <img
                  className="user"
                  src={userdata?.image}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt=""
                />
                <h1 className="signedIn">{userdata?.displayName}</h1>
              </>
            ) : (
              <NavLink
                to={location.pathname === "/login" ? "/" : "/login"}
                className="login__button"
              >
                {location.pathname === "/login" ? "Home" : "Login"}
              </NavLink>
            )}
          </div>
          {Object.keys(userdata).length > 0 && (
            <ul>
              <li>
                {location.pathname === "/create" ? (
                  <NavLink to="/dashboard" className="nav__link">
                    Dashboard
                  </NavLink>
                ) : (
                  <button className="logout__button" onClick={logout}>
                    Logout 😦
                  </button>
                )}
              </li>
              {location.pathname === "/" && (
                <li>
                  <NavLink to="/dashboard" className="nav__link">
                    Dashboard
                  </NavLink>
                </li>
              )}
              {location.pathname === "/dashboard" && (
                <li>
                  <NavLink to="/" className="nav__link">
                    Home
                  </NavLink>
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
};

export default Headers;
