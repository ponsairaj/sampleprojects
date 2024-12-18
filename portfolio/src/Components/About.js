// src/pages/About.js
import React from "react";
import styled from "styled-components";
import profile from "../assets/profile.png";

const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 5%;
  min-height: 80vh;
  background-color:rgb(0, 0, 0);
  color: #333;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-right: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 350px;
    height: 400px;
    border-radius: 50%;
    border: 5px solid #e94560;
   

    @media (max-width: 768px) {
      width: 250px;
      height: 250px;
      margin-top: 2rem;
    }
  }
`;

const About = () => {
  return (
    <AboutSection>
      <TextContainer>
        <h1>About Me:</h1>
        <p>
          Hi, I'm <strong>Ponsairaj</strong>, a passionate and detail-oriented
          full-stack developer with expertise in technologies like React,
          Node.js, MySQL, and Python. I thrive on building user-centric web
          applications that are efficient, scalable, and visually appealing.
        </p>
        <p>
          My journey in tech has been fueled by curiosity and a relentless drive
          to solve complex problems. Whether crafting seamless user interfaces
          or building robust back-end APIs, I bring dedication and precision to
          every project I work on.
        </p>
        <p>
          When I’m not coding, you’ll find me exploring new tools and
          technologies, contributing to open-source projects, or sharing
          knowledge with the community.
        </p>
        <h1>Personal Information:</h1>
        <p>
          Full Name :- Ponsairaj siva
        </p>
        <p>
          Qualification :- B.E (Computer Science)
        </p>
        <p>  
          CGPA:- 8.4
        </p>
        <p>
          College:- Apollo Engineering College
        </p>
      </TextContainer>
      <ImageContainer>
        <img src={profile} alt="Ponsairaj" />
      </ImageContainer>
    </AboutSection>
  );
};

export default About;
