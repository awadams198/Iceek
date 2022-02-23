import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import "./SplashPage.css";

function SplashPage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <h1 className="heading"> ICEEK</h1>
           
        {/* <footer className="homeFooter">
          <div className="homeAboutContainer">
            <a
              className="homeAboutLink"
              href="https://www.linkedin.com/in/anthony-adams-a4221a228/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={"https://i.ibb.co/ZmrdqsC/linkedin.png"}
                className="homeAboutImg"
              />
            </a>
            <a
              className="homeAboutLink"
              href="https://github.com/awadams198"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={'https://i.ibb.co/VCwtBxh/redcharlie-ZH2-Qo9-So3-Xg-unsplash.jpg'}
                className="homeAboutImg"
              />
            </a>
          </div>
        </footer> */}
      </>
    );
  } else {
    sessionLinks = (
    <>
      <h2 className='heading'>TESTING</h2>
    </>
    );
  }

  return(
     <div className="main-bg">
             {isLoaded && sessionLinks}
      </div>);
}

export default SplashPage;
