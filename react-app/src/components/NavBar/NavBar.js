import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <nav>
        <ul className="main-nav">
          <li href="#">
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li href="#">
            <NavLink to="/arenas" exact={true} activeClassName="active">
              Arenas
            </NavLink>
          </li>
          <li href="#">
            <NavLink to="/arenas/new" exact={true} activeClassName="active">
              Host Arenas
            </NavLink>
          </li>
          <li href="#">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    );
  } else {
    sessionLinks = (
      <>
        <header className="header">
          <nav>
            <ul className="main-nav">
              <li href="#">
                <NavLink to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li href="#">
                <NavLink to="/login" exact={true} activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li href="#">
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                </NavLink>
              </li>
              <li href="#">
                <NavLink to="/arenas" exact={true} activeClassName="active">
                  Arenas
                </NavLink>
              </li>
              <li href="#">
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }

  return (
    <>
      <ul>{isLoaded && sessionLinks}</ul>
    </>
  );
};

export default NavBar;
