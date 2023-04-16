import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import ReactGA from 'react-ga';

import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { images } from "../../constants";
import "./Footer.scss";

const Footer = () => {

  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user_name, user_email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  const handleSubmit = () => {
    setLoading(true);
    const contact = {
      _type: "contact",
      name: user_name,
      email: user_email,
      message: message,
    };

    ReactGA.event({
      category: 'Contact',
      action: 'Contact Form Submitted',
    });

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h2 className="head-text">Take a Coffee & Chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:anirudh.av02@gmail.com" className="p-text">
            anirudh.av02@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 9496-960369" className="p-text">
            +91 9496-960369
          </a>
        </div>
      </div>

      {!isSubmitted ? (
        <form className="app__footer-form app__flex" ref={form} onSubmit={sendEmail}>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="user_name" value={user_name} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="user_email" value={user_email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <input type="submit" className="send-button p-text" value={!loading ? 'Send Message' : 'Sending...'} onClick={handleSubmit}/>
        </form>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
