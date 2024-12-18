// src/components/Contact.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ContactSection = styled.section`
  padding: 3rem 1.5rem;
  background: rgb(0, 0, 0);
  color: #fff;
  min-height: 80vh;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color:rgb(255, 255, 255);
  }

  form {
    max-width: 600px;
    margin: 0 auto;
    background:rgb(175, 130, 130);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.5);

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input,
    textarea {
      width: 95%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #333;
      border-radius: 4px;
      background:rgb(255, 248, 248);
      color: #fff;
      font-size: 1rem;

      &:focus {
        border-color: #e94560;
        outline: none;
      }
    }

    button {
      background: rgb(131, 0, 22);
      color: #fff;
      border: none;
      padding: 0.8rem 1.5rem;
      cursor: pointer;
      border-radius: 4px;
      font-size: 1rem;
      margin-left:40%;

      &:hover {
        background: #d1344d;
      }
    }
  }

  .contact-info {
    text-align: center;
    margin-top: 2rem;

    p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    a {
      color:rgb(165, 6, 32);
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <h2>Contact Me</h2>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Your Name" required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Your Email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" placeholder="Your Message" required></textarea>

        <button type="submit">Send</button>
      </motion.form>
      <div className="contact-info">
        <p>Email: <a href="mailto:ponsairajsiva@gmail.com">ponsairajsiva@gmail.com</a></p>
        <p>Phone: <a href="tel:9894450184">9894450184</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/ponsairaj-s-696478272/" target="_blank" rel="noopener noreferrer">
          linkedin.com/in/ponsairaj-s-696478272/
        </a></p>
      </div>
    </ContactSection>
  );
};

export default Contact;
