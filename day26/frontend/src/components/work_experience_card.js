import React from 'react';
import './work_experience_card.css';

//work experience card component
function WorkExperienceCard({ experience, onDelete }) {
    if (!experience) {
        return null;
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    const {
        company = '',
        position = '',
        startDate,
        endDate,
        location = '',
        description = '',
        technologies = [],
        achievements = []
    } = experience;

    return (
        <div className="work_experience_card">
            <div className="card_header">
                <h3>{position} at {company}</h3>
                <button 
                    className="delete_button"
                    onClick={onDelete}
                    aria-label="Delete experience"
                >
                    ×
                </button>
            </div>
            
            <div className="card_meta">
                <span className="date">
                    {formatDate(startDate)} - {formatDate(endDate)}
                </span>
                {location && <span className="location">📍 {location}</span>}
            </div>

            {description && (
                <p className="description">{description}</p>
            )}

            {achievements?.length > 0 && (
                <div className="achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                        {achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                </div>
            )}

            {technologies?.length > 0 && (
                <div className="technologies">
                    <h4>Technologies</h4>
                    <div className="tech_tags">
                        {technologies.map((tech, index) => (
                            <span key={index} className="tech_tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkExperienceCard;