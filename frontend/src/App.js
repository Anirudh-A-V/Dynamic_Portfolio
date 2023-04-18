import React, { useEffect } from 'react'
import ReactGA from "react-ga4";

import './App.scss'

import { About, Footer, Header, Skills, Testimonials, Work } from './containers';
import { Navbar } from './components';
import { SocialMedia } from './components';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(trackingId);

const App = () => {

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: 'Home Page'
    });
  }, []);

  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Footer />
      <SocialMedia />

    </div>
  );
}

export default App
