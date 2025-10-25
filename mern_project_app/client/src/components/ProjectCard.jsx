import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/ProjectCard.css";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const {
    _id,
    imageUrl,
    title,
    featured,
    description,
    technologies = [],
    status = "planned",
    startDate,
    endDate,
    githubUrl,
    liveUrl,
  } = project || {};

  return (
    <div className="project-card">
      {/* Top-right action buttons */}
      <div className="card-actions">
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={() => onEdit && onEdit(project)}
          aria-label="Edit project"
        >
          Edit
        </button>
        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => onDelete && onDelete(_id)}
          aria-label="Delete project"
        >
          Delete
        </button>
      </div>

      {/* Image */}
      <img
        src={imageUrl || "/placeholder-project.png"}
        alt={title || "Project image"}
        className="project-image"
      />

      {/* Content */}
      <div className="project-content">
        <div className="project-header">
          <h2 className="project-title">{title || "Untitled Project"}</h2>
          {featured && <span className="badge">Featured</span>}
        </div>

        <p className="project-description">
          {description || "No description provided."}
        </p>

        <div className="tech-stack">
          {technologies.length > 0 ? (
            technologies.map((tech, index) => (
              <span key={index} className="tech-item">
                {tech}
              </span>
            ))
          ) : (
            <span className="tech-item muted">No tech listed</span>
          )}
        </div>

        <div className="project-footer">
          <span className={`status ${status}`}>{status}</span>
          <span className="dates">
            {startDate ? new Date(startDate).toLocaleDateString() : "—"} -{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Present"}
          </span>
        </div>

        <div className="links">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {liveUrl && liveUrl.trim() !== "" && (
            <a href={liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    featured: PropTypes.bool,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    githubUrl: PropTypes.string,
    liveUrl: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProjectCard;
