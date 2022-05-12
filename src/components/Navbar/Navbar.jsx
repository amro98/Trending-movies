import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo-dark.webp";

export default function Navbar(props) {
  return (
      <nav class="navbar navbar-expand-sm navbar-light pt-3">
        <div class="container-fluid ">
          <NavLink to="/" className="px-4 pb-2">
            <img src={logo} alt="" />
          </NavLink>
          <button
            class="navbar-toggler mt-2 bg-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {props.loginUser ? (
              <ul class="navbar-nav me-auto  ">
                <li class="nav-item px-2 py-1">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li class="nav-item px-2 py-1">
                  <NavLink to="/movies">Movies</NavLink>
                </li>
                <li class="nav-item px-2 py-1">
                  <NavLink to="/tv">Series</NavLink>
                </li>
                <li class="nav-item px-2 py-1">
                  <NavLink to="/celebrities">Celebrities</NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto">
              <li className="px-2 py-1">
                <a href="/">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="px-2 py-1">
                <a href="/">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li className="px-2 py-1">
                <a href="/">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>

              {props.loginUser ? (
                <>
                  <li onClick={props.logOut} className="px-2 py-1">
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="px-2 py-1">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li className="px-2 py-1">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
}
