import React from 'react'
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <a href='https://www.linkedin.com/in/anirudh-a-v/' target='_blank' rel='noreferrer'>
          <FaLinkedinIn />
        </a>
      </div>
      <div>
        <a href='https://twitter.com/anirudh_av02' target='_blank' rel='noreferrer'>
          <BsTwitter />
        </a>
      </div>
      <div>
        <a href='https://www.instagram.com/a_rudh_av11_?r=nametag' target='_blank' rel='noreferrer'>
          <BsInstagram />
        </a>
      </div>
    </div>
  )
}

export default SocialMedia