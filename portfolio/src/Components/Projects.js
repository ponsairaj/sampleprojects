// src/pages/Projects.js
import React from "react";
import styled from "styled-components";

const ProjectsSection = styled.section`
  padding: 2rem 5%;
  min-height: 80vh;
  background-color:rgb(0, 0, 0);
  color: #333;
`;

const SectionHeading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const ProjectCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 300px;
  overflow: hidden;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  background: url(${(props) => props.img}) no-repeat center center/cover;
`;

const ProjectContent = styled.div`
  padding: 1rem;

  h3 {
    font-size: 1.5rem;
    color: #333; 
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  }

  a {
    display: inline-block;
    background-color: #e94560;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1rem;

    &:hover {
      background-color: #333;
    }
  }
`;

const Projects = () => {
  const projectData = [
    {
      title: "Todo List",
      description:
        "A simple React-based to-do list application to add, edit, and delete tasks.",
      link: "https://github.com/ponsairaj/sampleprojects/tree/main/todoplanner", 
      img: "https://via.placeholder.com/TODO-LISTS", 
    },
    {
      title: "OpenTicket",
      description:
        "A ticket management system where users can raise tickets, employees handle them, and admins manage the platform.",
      link: "https://github.com/ponsairaj/sampleprojects/tree/main/Openticket",
      img: "https://via.placeholder.com/OPENTICKET", 
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my skills, projects, and experience.",
      link: "https://github.com/ponsairaj/sampleprojects/tree/main/portfolio", 
      img: "https://via.placeholder.com/PORTFOLIO", 
    },
  ];

  return (
    <ProjectsSection>
      <SectionHeading>My Projects</SectionHeading>
      <ProjectsContainer>
        {projectData.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage img={project.img} />
            <ProjectContent>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;