import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import { urlFor, client } from '../../client'

import './Header.scss'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
}

const Header = () => {
  const [profile, setProfile] = useState([]);
  const [primarySkills, setPrimarySkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "profile"]';
    const query_skills = '*[_type == "primarySkills"]';

    client.fetch(query).then((res) => {
      setProfile(res);
    });

    client.fetch(query_skills).then((res) => {
      res = res.sort((a, b) => a.priority - b.priority)
      setPrimarySkills(res);
    });

  }, []);

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: '20px' }}>
              <p className='p-text'>Hello, I am </p>
              <h1 className='head-text'>Anirudh</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className='p-text'>Web Developer</p>
            <p className='p-text'>Python Enthusiast</p>
            {/* <p className='p-text'>Freelancer</p> */}
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {profile.map((item, index) => (
          <img key={index} src={urlFor(item.imgUrl)} alt="header" />
        ))}
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_background"
          className="overlay_circle"
        />

      </motion.div>

      <motion.div
        variant={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {primarySkills.map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={urlFor(circle.icon)} alt="circle" />
          </div>
        ))}

      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');
