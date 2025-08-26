import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import "../contact/contact.css";
import logo from "../../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import Footer from "../Footer/Footer";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "rohan_37",
        "template_uyncwed",
        form.current,
        "gJbxjpBvMAj9lBzo8"
      )
      .then(
        () => {
          setMessage("Message Sent Successfully!");
          setIsSent(true);
          setButtonText("Sent");
          e.target.reset();
          setTimeout(() => {
            setMessage("");
            setIsSent(false);
            setButtonText("Send");
          }, 3000);
        },
        () => {
          setMessage("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      {/* Heading */}
      <motion.h2
        className="contact-heading"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        My Contact
      </motion.h2>

      {/* Map & Contact Info */}
      <motion.div
        className="map-info-container"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
      >
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.4360167245!2d75.62573958925047!3d26.88542139428822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1755587389631!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="contact-info">
          <motion.div
            className="contact-info-item"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <FaMapMarkerAlt className="contact-icon" />
            <div className="contact-info-text">
              <h4>Address</h4>
              <p>Jaipur, Rajasthan, 302020</p>
            </div>
          </motion.div>
          <motion.div
            className="contact-info-item"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <FaEnvelope className="contact-icon" />
            <div className="contact-info-text">
              <h4>Email</h4>
              <p>rohangoyal264@gmail.com</p>
            </div>
          </motion.div>
          <motion.div
            className="contact-info-item"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <FaPhoneAlt className="contact-icon" />
            <div className="contact-info-text">
              <h4>Phone</h4>
              <p>+91 63778 - 16163</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Connect Form */}
      <motion.div
        className="connect-form"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
      >
        <motion.h3
          className="contact-heading"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
        >
          Let's Connect
        </motion.h3>

        <div className="form-logo-container">
          <motion.div
            className="logo-container"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
          >
            <img src={logo} alt="Logo" className="contact-logo" />
          </motion.div>

          <motion.div
            className="form-container"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
          >
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <input type="text" name="user_name" placeholder="Your Name" required />
              <input type="email" name="user_email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required />
              <div className="button-container">
                <button type="submit">
                  {buttonText}
                  {isSent && <FaPaperPlane className="button-icon" />}
                </button>
              </div>
              {message && <p className="message">{message}</p>}
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="contact-social-icons"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <a href="https://www.facebook.com/RohannGoyal37" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </a>
        <a href="https://github.com/RohanGoyal37" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
        <a href="https://x.com/RohanGoyal37" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={30} />
        </a>
        <a href="https://instagram.com/rohan_agarwal_37" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
        <a href="https://www.linkedin.com/in/rohan-agarwal37" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={1.2}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Contact;
