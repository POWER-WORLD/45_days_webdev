import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../assets/styles/About.css";
import { getAllSkills } from "../services/skillService";
import ContactForm from '../components/ContactForm';

function About() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await getAllSkills();
        const data = response.data || response;
        // Only take the first 3 skills
        setSkills(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        setError(err.message || "Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleContactSubmit = async (contactData) => {
    // TODO: Implement the API call to save contact data
    console.log('Contact form submitted:', contactData);
    // You can add API integration here
  };

  return (
    <div className="about-container">
      <div className="content-wrapper">
        <div className="about-grid">
          <div className="about-info">
            <h1 className="about-title">About Me</h1>

            <p className="about-text">
              Hi! I'm [Your Name], a passionate full-stack developer with expertise in the MERN stack.
              I love building web applications that solve real-world problems and create meaningful experiences.
            </p>

            <p className="about-text">
              With [X] years of experience in web development, I've worked on various projects ranging from
              e-commerce platforms to social media applications. My focus is on creating clean, efficient,
              and scalable code while ensuring great user experiences.
            </p>

            <div className="social-links">
              <a href="https://github.com/[your-username]" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/[your-username]" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/[your-username]" className="social-icon">
                <FaTwitter />
              </a>
              <a href="mailto:your.email@example.com" className="social-icon">
                <MdEmail />
              </a>
            </div>
          </div>

          <div className="quick-facts">
            <h2 className="facts-title">Quick Facts</h2>
            <ul className="facts-list">
              <li className="fact-item">
                <span className="fact-label">Location:</span>
                <span>Your City, Country</span>
              </li>
              <li className="fact-item">
                <span className="fact-label">Experience:</span>
                <span>X Years</span>
              </li>
              <li className="fact-item">
                <span className="fact-label">Education:</span>
                <span>Your Degree</span>
              </li>
              <li className="fact-item">
                <span className="fact-label">Languages:</span>
                <span>English, Hindi, Chinese</span>
              </li>
              <li className="fact-item">
                <span className="fact-label">Contact:</span>
                <span>
                  <div className="contact-section">
                    {/* <h2 className="contact-title">Get in Touch</h2> */}
                    <button
                      className="contact-button"
                      onClick={() => setShowContactForm(true)}
                    >
                      Contact Me
                    </button>
                    {showContactForm && (
                      <ContactForm
                        onSubmit={handleContactSubmit}
                        onClose={() => setShowContactForm(false)}
                      />
                    )}
                  </div>

                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="contact-section">
          <h2 className="contact-title">Get in Touch</h2>
          <button 
            className="contact-button"
            onClick={() => setShowContactForm(true)}
          >
            Contact Me
          </button>
          {showContactForm && (
            <ContactForm
              onSubmit={handleContactSubmit}
              onClose={() => setShowContactForm(false)}
            />
          )}
        </div> */}

        <div className="skills-section">
          <h2 className="skills-title">What I Do</h2>
          <div className="skills-grid">
            {loading ? (
              <div className="loading-spinner">Loading skills...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              skills.map((skill) => (
                <div key={skill._id} className="skill-card">
                  <h3 className="skill-card-title">{skill.name}</h3>
                  <p className="skill-card-text">{skill.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;