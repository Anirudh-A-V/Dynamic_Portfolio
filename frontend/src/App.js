import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

import './App.scss'

import { About, Footer, Header, Skills, Testimonials, Work } from './containers';
import { Navbar } from './components';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(trackingId);

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
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

    </div>
  );
}

export default App
