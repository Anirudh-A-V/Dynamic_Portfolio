import React from 'react'

import './App.scss'

import { About, Footer, Header, Skills, Testimonials, Work } from './containers';
import { Navbar } from './components';

const App = () => {
  return (
    <div className='App'>
        <Navbar />
        <Header />
        <About />
        <Skills />
        <Work />
        <Testimonials />
        <Footer />

    </div>
  );
}

export default App
