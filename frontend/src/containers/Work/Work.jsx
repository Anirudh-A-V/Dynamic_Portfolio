import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'
import ReactGA from 'react-ga'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Work.scss'

const Work = () => {

  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
  const [works, setWorks] = useState([])
  const [filterWork, setFilterWork] = useState([])
  const [tag, setTag] = useState([])

  useEffect(() => {
    const query = '*[_type == "works"]'
    const tags = '*[_type == "tagList"]'
    client.fetch(query).then((res) => {
      setWorks(res);
      setFilterWork(res);
    })
    client.fetch(tags).then((res) => {
      const result = res.sort((a, b) => a.name.localeCompare(b.name))
      setTag(result);
    })

  }, [])


  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === 'All') {
        setFilterWork(works)
      } else {
        const filter = works.filter((work) => work.tags.includes(item))
        setFilterWork(filter)
      }
    }, 500);
  }

  const handleLinkClick = (work, clickType) => {
    window.gtag('event', `${clickType} link clicked`, {
      'event_category': `${clickType} link`,
      'event_label': `${work} : ${clickType} link clicked`,
    })
    // ReactGA.event({
    //   category:  `${clickType} link`,
    //   action: `${work} : ${clickType} link clicked`,
    // })
  }
  
  return (
    <>
      <h2 className='head-text'>My Creative <span>Portfolio</span> </h2>

      <div className='app__work-filter'>
        {tag.map((item, index) => (
          <div key={index} onClick={() => handleWorkFilter(item.name)} className={`app__work-filter-item app__flex p-text ${activeFilter === item.name ? 'item-active' : ''}`}>
            {item.name}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'>
        {filterWork.map((work, index) => (
          <div className='app__work-item app__flex' key={index}>
            <div className='app__work-img app__flex'>
              <img src={urlFor(work.imgUrl)} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                    onClick={() => handleLinkClick(work.title, 'project')}
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                    onClick={() => handleLinkClick(work.title, 'code')}
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>

              </motion.div>
            </div>

            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{work.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>

              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);
