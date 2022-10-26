import React from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/lib/hi'
import { motion } from 'framer-motion'

import './Navbar.scss'

import { images } from '../../constants'

const Navbar = () => {

  const [toggle, setToggle] = React.useState(false);

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.logo} alt='logo' />
      </div>
      <ul className='app__navbar-links'>
        {['home', 'about', 'contact', 'work', 'skills'].map((item) => (
          <li key={`link-${item}`} className='app__flex p-text'>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (

          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            >
          {/* <div> */}
            <HiX onClick={() => setToggle(false)} />

            <ul>

              {['home', 'about', 'contact', 'work', 'skills'].map((item) => (
                <li key={`link-${item}`} >
                  <a href={`#${item}`} onClick={() => setToggle(false)} >{item}</a>
                </li>
              ))}

            </ul>
          {/* </div> */}
          </motion.div>

        )}
      </div>
    </nav>
  )
}

export default Navbar
