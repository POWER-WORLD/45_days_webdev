import React, { useState, useEffect } from "react";
import SkillCard from "../components/SkillCard";
import SkillForm from "../components/SkillForm";
import "../assets/styles/Skills.css";
import Spinner from "../components/Spinner";
import { getAllSkills, createSkill, updateSkill, deleteSkill } from "../services/skillService";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await getAllSkills();
      const data = response.data || response; // Handle both response formats
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message || "Failed to fetch skills");
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (skillData) => {
    try {
      setError(null);
      await createSkill(skillData);
      await fetchSkills(); // Refresh the skills list
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message || "Failed to add skill");
    }
  };

  const handleEditSkill = async (skillData) => {
    try {
      setError(null);
      if (!editingSkill?._id) {
        throw new Error("Invalid skill ID");
      }
      await updateSkill(editingSkill._id, skillData);
      await fetchSkills();
      setIsModalOpen(false);
      setEditingSkill(null);
    } catch (error) {
      setError(error.message || "Failed to update skill");
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      setError(null);
      await deleteSkill(skillId);
      await fetchSkills();
    } catch (error) {
      setError(error.message || "Failed to delete skill");
    }
  };

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1>My Skills</h1>
        <button
          className="add-skill-btn"
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
        >
          Add New Skill
        </button>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className='error-button' onClick={fetchSkills}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="skills-grid">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                onEdit={() => {
                  setError(null);
                  setEditingSkill(skill);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteSkill(skill._id)}
              />
            ))
          ) : (
            <div className="no-skills-message">
              No skills found. Click "Add New Skill" to get started.
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <SkillForm
          skill={editingSkill}
          onSubmit={editingSkill ? handleEditSkill : handleAddSkill}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSkill(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
}

export default Skills;