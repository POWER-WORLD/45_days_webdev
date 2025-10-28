import React from "react";
import { Link } from "react-router-dom";
import { FaProjectDiagram, FaUser, FaTools, FaBriefcase } from "react-icons/fa";
import heroImg from "../assets/images/2471303.gif";
// import logo from "../assets/images/nav_logo.png";
import "../assets/styles/Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-left">
          {/* <img src={logo} alt="logo" className="hero-logo" /> */}
          <h1 className="hero-title">
            Hi, I'm Pawan kumar — MERN Stack Developer
          </h1>
          <p className="hero-sub">
            I build modern, performant web applications using MongoDB, Express,
            React and Node. Explore my projects, skills, work experience and contact info below.
          </p>
          <div className="hero-ctas">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/about" className="btn btn-outline">About Me</Link>
          </div>

          <ul className="quick-links" aria-label="quick links">
            <li><Link to="/projects">Selected projects</Link></li>
            <li><Link to="/skills">Skills & tools</Link></li>
            <li><Link to="/WorkExp">Work Experience</Link></li>
            <li><Link to="/about">About & contact</Link></li>
          </ul>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <img src={heroImg} alt="hero animation" className="hero-img" />
          </div>
        </div>
      </section>

      <section className="overview">
        <h2 className="section-title">Overview</h2>
        <p className="section-desc">
          This site contains:
        </p>

        <div className="cards-grid">
          <article className="info-card">
            <div className="card-icon"><FaProjectDiagram /></div>
            <h3>Projects</h3>
            <p>Interactive demos, source links and notes for each project. See architecture and tech used.</p>
            <Link to="/projects" className="card-link">Explore Projects →</Link>
          </article>

          <article className="info-card">
            <div className="card-icon"><FaUser /></div>
            <h3>About</h3>
            <p>Background, quick facts, contact links and social profiles to connect with me.</p>
            <Link to="/about" className="card-link">Read About →</Link>
          </article>

          <article className="info-card">
            <div className="card-icon"><FaTools /></div>
            <h3>Skills</h3>
            <p>Front-end, back-end and database skills with tooling and libraries I use regularly.</p>
            <Link to="/skills" className="card-link">See Skills →</Link>
          </article>

          <article className="info-card">
            <div className="card-icon"><FaBriefcase /></div>
            <h3>Work Experience</h3>
            <p>Professional history, roles, responsibilities and notable achievements.</p>
            <Link to="/WorkExp" className="card-link">View Experience →</Link>
          </article>
        </div>
      </section>

      <section className="callout">
        <div className="callout-inner">
          <h3>Want to collaborate or hire?</h3>
          <p>Contact me through the About page — I'm open to interesting projects and full‑time roles.</p>
          <Link to="/about" className="btn btn-ghost">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;