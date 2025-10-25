import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../assets/styles/footer.css";
import logo from "../assets/images/nav_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="brand">
            <span className="brand-name">My Portfolio</span>
            <span className="brand-sub">Full‑Stack MERN Developer</span>
          </div>
        </div>

        <div className="footer-center" aria-label="footer navigation">
          <nav className="footer-nav">
            <a href="/" className="footer-link">Home</a>
            <a href="/projects" className="footer-link">Projects</a>
            <a href="/about" className="footer-link">About</a>
            <a href="/skills" className="footer-link">Skills</a>
          </nav>
        </div>

        <div className="footer-right">
          <div className="social">
            <a href="https://github.com/your-username" className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/your-username" className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/your-username" className="social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;