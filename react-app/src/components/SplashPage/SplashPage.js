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
        {/* <h1> ICEEK</h1>
        <h2>COOL</h2> */}
        <div className="main-bg">
      <h1 className="title">WELCOME TO ICEEK</h1>
      {/* <footer className='homeFooter'>
                    <div className='homeAboutContainer'>
                        <a
                            className='homeAboutLink'
                            href='https://www.linkedin.com/in/dominique-samuels-b33233197/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img
                                src={'https://i.ibb.co/ZmrdqsC/linkedin.png'}
                                className='homeAboutImg'
                            />
                        </a>
                        <a
                            className='homeAboutLink'
                            href='https://github.com/dominisam98'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img
                                src={'https://i.ibb.co/b2ZmRL8/github.png'}
                                className='homeAboutImg'
                            />
                        </a>
                    </div>
                </footer> */}

    </div>
        {/* <div className='berkeley-map-parent-container'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26361348.14090973!2d-113.75721884302386!3d36.240999911993384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1636756177169!5m2!1sen!2sus" title='allspot' className='berkeley-map'></iframe>
      </div> */}
      </>
    );
  } else {
    sessionLinks = (
    <div className="main-bg">
      <h1 className="title">WELCOME TO ICEEK</h1>
      {/* <footer className='homeFooter'>
                    <div className='homeAboutContainer'>
                        <a
                            className='homeAboutLink'
                            href='https://www.linkedin.com/in/dominique-samuels-b33233197/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img
                                src={'https://i.ibb.co/ZmrdqsC/linkedin.png'}
                                className='homeAboutImg'
                            />
                        </a>
                        <a
                            className='homeAboutLink'
                            href='https://github.com/dominisam98'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img
                                src={'https://i.ibb.co/b2ZmRL8/github.png'}
                                className='homeAboutImg'
                            />
                        </a>
                    </div>
                </footer> */}

    </div>
    );
  }

  return(
     <div >
             {isLoaded && sessionLinks}
             
    </div>);
}

export default SplashPage;
