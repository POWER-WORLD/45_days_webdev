import React, { useState } from "react";
import "./work_experience_form.css";

function WorkExperienceForm({ onSubmit }) {
    const initialState = {company: "",position: "",startDate: "",endDate: "",location: "",isCurrent: false,description: "",achievements: "",technologies: "",companySize: "",industry: "",website: ""};

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Handle input change
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

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Validate required fields
            if (!formData.company || !formData.position || !formData.startDate || (!formData.isCurrent && !formData.endDate) || !formData.description || !formData.achievements || !formData.technologies || !formData.companySize || !formData.industry || !formData.website) {
                throw new Error('Please fill in all required fields');
            }

            // Format the payload
            const payload = {
                ...formData,
                achievements: formData.achievements
                    ? formData.achievements.split(',').map(a => a.trim()).filter(Boolean)
                    : [],
                technologies: formData.technologies
                    ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
                    : [],
                // Format dates to ISO string
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.isCurrent ? null : 
                        formData.endDate ? new Date(formData.endDate).toISOString() : null
            };

            // Validate website URL if provided
            if (payload.website && !isValidUrl(payload.website)) {
                throw new Error('Please enter a valid website URL');
            }

            await onSubmit(payload);
            setFormData(initialState); // Reset form after successful submission
            
        } catch (err) {
            setError(err.message || 'Failed to submit form');
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // URL validation helper
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div className="work_experience_form">
            <h2>Work Experience</h2>
            {error && <div className="error_message">{error}</div>}
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="company" 
                    placeholder="Company *" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="position" 
                    placeholder="Position *" 
                    value={formData.position} 
                    onChange={handleChange} 
                    required 
                />
                <label>
                    Start Date *
                    <input 
                        type="date" 
                        name="startDate" 
                        value={formData.startDate} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <label>
                    End Date
                    <input 
                        type="date" 
                        name="endDate" 
                        value={formData.endDate} 
                        onChange={handleChange} 
                        disabled={formData.isCurrent}
                        min={formData.startDate} 
                    />
                </label>
                <label className="checkbox_label">
                    <input 
                        type="checkbox" 
                        name="isCurrent" 
                        checked={formData.isCurrent} 
                        onChange={handleChange} 
                    />
                    Current Job
                </label>
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Location" 
                    value={formData.location} 
                    onChange={handleChange} 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                <textarea 
                    name="achievements" 
                    placeholder="Achievements (comma separated)" 
                    value={formData.achievements} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="technologies" 
                    placeholder="Technologies (comma separated)" 
                    value={formData.technologies} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="companySize" 
                    placeholder="Company Size" 
                    value={formData.companySize} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="industry" 
                    placeholder="Industry" 
                    value={formData.industry} 
                    onChange={handleChange} 
                />
                <input 
                    type="url" 
                    name="website" 
                    placeholder="Website URL" 
                    value={formData.website} 
                    onChange={handleChange} 
                />
                <button 
                    type="submit" 
                    className="submit_button" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Experience'}
                </button>
            </form>
        </div>
    );
}

export default WorkExperienceForm;
