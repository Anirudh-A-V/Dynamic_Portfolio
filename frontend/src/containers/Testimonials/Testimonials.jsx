import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import './Testimonials.scss'

const Testimonials = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const query = '*[_type == "testimonial"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      console.log(data)
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);
  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  const testimonial = testimonials[currentIndex];
  
  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(testimonial.imgUrl)} alt={testimonial.name} />
            <div className='app__testimonial-content'>
              <p className='p-text'>{testimonial.feedback}</p>
              <div>
                <h4 className='bold-text'>{testimonial.name}</h4>
                <h5 className='p-text'>{testimonial.company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>
            <div className='app__flex' onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className='app__testimonial-brands app__flex'>
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1]}}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
          ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonials'),
  'testimonial',
  'app__primarybg'
);
