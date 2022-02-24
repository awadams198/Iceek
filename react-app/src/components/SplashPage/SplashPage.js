import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SplashPage.css";

function SplashPage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="main-bg">
          <h1 className="title">ICEEK</h1>
          <div className="about-site-text-color">
            <p className="about-site">
              Iceek is an Airbnb clone but for ice skating. This app allows you
              to host ice arenas, find ice arenas and also leave reviews on ice
              arenas.
            </p>
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div className="main-bg-1">
        <h1 className="title">WELCOME TO ICEEK</h1>
      </div>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default SplashPage;
