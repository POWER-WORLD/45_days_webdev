import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/ExpCard.css';

function ExpCard({ experience, onEdit, onDelete }) {
  const {
    _id,
    company = 'Company',
    position = 'Position',
    location,
    startDate,
    endDate,
    description,
    achievements = [],
    technologies = [],
    color = '#6c63ff',
    type = 'Work',
    createdAt,
    updatedAt,
  } = experience || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="exp-card" style={{ borderTopColor: color }}>
      {/* Top-right action buttons */}
      <div className="card-actions">
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={(e) => { e.stopPropagation(); onEdit && onEdit(experience); }}
          aria-label="Edit experience"
        >
          Edit
        </button>
        <button
          type="button"
          className="action-btn delete-btn"
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(_id); }}
          aria-label="Delete experience"
        >
          Delete
        </button>
      </div>

      <div className="exp-top">
        <div className="exp-left">
          <h3 className="exp-company">{company}</h3>
          <span className="badge">{type}</span>
        </div>
        <div className="exp-dates-short">
          <span>{formatDate(startDate)}</span>
          <span> — </span>
          <span>{formatDate(endDate)}</span>
        </div>
      </div>

      <h4 className="exp-position">{position}</h4>
      {location && <div className="exp-location">{location}</div>}

      <p className="exp-description">{description}</p>

      {achievements && achievements.length > 0 && (
        <div className="exp-achievements">
          <h5>Key Achievements:</h5>
          <ul>
            {achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {technologies && technologies.length > 0 && (
        <div className="exp-technologies">
          {technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      )}

      <div className="exp-footer-dates">
        <small>Created: {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}</small>
        <small>Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : '—'}</small>
      </div>
    </div>
  );
}

ExpCard.propTypes = {
  experience: PropTypes.shape({
    _id: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string,
    achievements: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    type: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ExpCard;