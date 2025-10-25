import React, { useState, useEffect } from 'react';
import '../assets/styles/ExpForm.css';

function ExpForm({ experience, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: '',
    achievements: '',
    employmentType: 'Full-time',
  });

  // Prefill when editing
  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || '',
        position: experience.position || '',
        location: experience.location || '',
        startDate: experience.startDate ? experience.startDate.split('T')[0] : '',
        endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
        description: experience.description || '',
        technologies: experience.technologies ? experience.technologies.join(', ') : '',
        achievements: experience.achievements ? experience.achievements.join(', ') : '',
        employmentType: experience.employmentType || 'Full-time',
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();

    const newExperience = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      achievements: formData.achievements
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      createdAt: experience?.createdAt || now,
      updatedAt: now,
    };

    onSubmit(newExperience);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="exp-form-container">
        <h2>{experience ? 'Edit Experience' : 'Add Experience'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Employment Type:</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Technologies (comma-separated):</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, AWS, Docker"
            />
          </div>

          <div className="form-group">
            <label>Achievements (comma-separated):</label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="2"
              placeholder="Increased performance by 40%, Led team of 5 developers"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {experience ? 'Update' : 'Add'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpForm;
