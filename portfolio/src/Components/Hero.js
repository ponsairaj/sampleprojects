// src/components/Hero.js
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:rgb(0, 0, 0);
  color: #fff;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    line-height: 1.5;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm Ponsairaj — Full-Stack Developer. 
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
       I specialize in building modern, scalable web applications using cutting-edge technologies like React, Node.js, and MySQL.
      </motion.p>
    </HeroSection>
  );
};

export default Hero;
