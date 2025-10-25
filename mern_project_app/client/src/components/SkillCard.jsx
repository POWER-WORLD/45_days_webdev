import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/SkillCard.css";

function SkillCard({ skill, onEdit, onDelete }) {
  const {
    _id,
    icon,
    color = "#6c63ff",
    name = "Untitled Skill",
    category = "General",
    description = "No description provided.",
    yearsOfExperience,
    proficiency,
    createdAt,
    updatedAt,
  } = skill || {};

  return (
    <div className="skill-card" style={{ borderTopColor: color }}>
      {/* Top-right action buttons (Edit/Delete) */}
      <div className="card-actions">
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={(e) => { e.stopPropagation(); onEdit && onEdit(skill); }}
          aria-label="Edit skill"
        >
          Edit
        </button>
        <button
          type="button"
          className="action-btn delete-btn"
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(_id); }}
          aria-label="Delete skill"
        >
          Delete
        </button>
      </div>

      <div className="skill-top">
        <i className={`${icon || "fas fa-star"} skill-icon`} style={{ color }} />
        <div className="skill-header">
          <h3 className="skill-name">{name}</h3>
          <span className="badge">{category}</span>
        </div>
      </div>

      <div className="skill-body">
        <p className="skill-description">{description}</p>

        <div className="skill-meta">
          <span><strong>Experience:</strong> {yearsOfExperience ?? "—"} yrs</span>
          <span><strong>Level:</strong> {proficiency || "—"}</span>
        </div>

        <div className="skill-dates">
          <small>Created: {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}</small>
          <small>Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "—"}</small>
        </div>
      </div>
    </div>
  );
}

SkillCard.propTypes = {
  skill: PropTypes.shape({
    _id: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    yearsOfExperience: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    proficiency: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default SkillCard;
