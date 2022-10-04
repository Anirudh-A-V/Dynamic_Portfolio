import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip'

import { AppWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Skills.scss'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    const query_exp = '*[_type == "experiences"]'
    const query_skills = '*[_type == "skills"]'

    client.fetch(query_exp).then((res) => {
      setExperience(res);
    })

    client.fetch(query_skills).then((res) => {
      setSkills(res);
    })
  }, [])

  return (
    <>
      <h2 className='head-text'> Skills & Experiences</h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name}
            >
              <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </>
  )
}

export default AppWrap(Skills, 'skills')
