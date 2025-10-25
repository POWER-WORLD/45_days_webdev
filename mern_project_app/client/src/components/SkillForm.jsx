import React, { useState, useEffect } from "react";
import "../assets/styles/SkillForm.css";

function SkillForm({ skill, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: "",
    yearsOfExperience: "",
    description: "",
    icon: "",
    color: "#61dafb",
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "",
        proficiency: skill.proficiency || "",
        yearsOfExperience: skill.yearsOfExperience || "",
        description: skill.description || "",
        icon: skill.icon || "",
        color: skill.color || "#61dafb",
      });
    }
  }, [skill]);

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
    const newSkill = {
      ...formData,
      createdAt: skill?.createdAt || now,
      updatedAt: now,
    };
    onSubmit(newSkill);
    onClose();
  };

  return (
    <div className="skill-form-overlay">
      <div className="skill-form-modal">
        <h2>{skill ? "Edit Skill" : "Add New Skill"}</h2>
        <form onSubmit={handleSubmit} className="skill-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Proficiency:
            <select
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              required
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>

          <label>
            Years of Experience:
            <input
              type="number"
              name="yearsOfExperience"
              min="0"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <label>
            Icon (FontAwesome class):
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="e.g. fab fa-react"
            />
          </label>

          <label>
            Color:
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>

          <div className="skill-form-actions">
            <button type="submit" className="save-btn">
              {skill ? "Update" : "Add"}
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

export default SkillForm;
