import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addProject, updateProject } from '../services/projectService';
import '../assets/styles/ProjectForm.css';

const ProjectForm = ({ project, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',  // Changed from githubLink
    liveUrl: '',    // Changed from liveLink
    imageUrl: '',   // Changed from image
    featured: false,
    status: '',
    startDate: '',
    endDate: '',
    isCurrent: false
  });
  const [error, setError] = useState('');

useEffect(() => {
  if (project) {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured || false,
      status: project.status || 'planned',
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      isCurrent: !project.endDate
    });
  }
}, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear end date when current job is checked
    if (name === 'isCurrent' && checked) {
      setFormData(prev => ({
        ...prev,
        endDate: ''
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formattedData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl || null,
      imageUrl: formData.imageUrl,
      featured: formData.featured === 'yes',
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.isCurrent ? null : formData.endDate
    };

    // Log the formatted data before sending
    console.log('Sending data:', formattedData);

    if (project) {
      await updateProject(project._id, formattedData);
    } else {
      await addProject(formattedData);
    }
    onSubmitSuccess();
  } catch (err) {
    console.error('Form submission error:', err);
    setError(err.response?.data?.message || 'Failed to save project');
  }
};

  return (
    <div className="project-form-overlay">
      <div className="project-form-container">
        <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies Used*</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link</label>
            <input
              type="url"
              id="githubUrl"     // Changed from githubLink
              name="githubUrl"   // Changed from githubLink
              value={formData.githubUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="liveLink">Live Demo Link</label>
            <input
              type="url"
              id="liveUrl"     // Changed from liveLink
              name="liveUrl"   // Changed from liveLink
              value={formData.liveUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL*</label>
            <input
              type="url"
              id="imageUrl"    // Changed from image
              name="imageUrl"  // Changed from image
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Current status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="featured">Featured*</label>
              <select
                name="featured"
                value={formData.featured}
                onChange={handleChange}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date*</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.isCurrent}
                min={formData.startDate}
              />
            </div>
          </div>

          {/* Current Job checkbox can go here */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
              />
              Current Project
            </label>
          </div>


          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {project ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired
};

export default ProjectForm;