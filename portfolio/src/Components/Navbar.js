import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(59, 0, 0);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;

  h1 {
    margin-left: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  img {
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    position: relative;
    padding: 0.5rem 0;

    &:hover {
      color: rgb(69, 214, 233);
    }

    &.active {
      font-weight: bold;
      color: rgb(69, 214, 233);

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background: rgb(69, 214, 233);
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }
  }
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <Nav
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Brand href="/">
        <img src={profile} alt="Profile" width={50} height={50} />
        <h1>Ponsairaj Siva</h1>
      </Brand>
      <NavLinks>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={location.pathname === "/projects" ? "active" : ""}
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          Contact
        </Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
