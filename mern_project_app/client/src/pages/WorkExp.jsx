import React, { useState, useEffect } from "react";
import ExpCard from "../components/ExpCard";
import ExpForm from "../components/ExpForm";
import "../assets/styles/WorkExp.css";
import Spinner from "../components/Spinner";
import { getAllExperiences, createExperience, updateExperience, deleteExperience } from "../services/expService";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllExperiences();
      
      // Extract the experiences array from the nested response
      const experiences = response.data?.data || [];
      
      // Update state with the experiences array
      setExperiences(experiences);
      
    } catch (error) {
      setError(error.message || "Failed to fetch experiences");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async (expData) => {
    try {
      setError(null);
      await createExperience(expData);
      await fetchExperiences();
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message || "Failed to add experience");
    }
  };

  const handleEditExperience = async (expData) => {
    try {
      setError(null);
      if (!editingExperience?._id) {
        throw new Error("Invalid experience ID");
      }
      await updateExperience(editingExperience._id, expData);
      await fetchExperiences();
      setIsModalOpen(false);
      setEditingExperience(null);
    } catch (error) {
      setError(error.message || "Failed to update experience");
    }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      setError(null);
      await deleteExperience(expId);
      await fetchExperiences();
    } catch (error) {
      setError(error.message || "Failed to delete experience");
    }
  };

  return (
    <div className="experience-container">
      <div className="experience-header">
        <div className="header-info">
          <h1 className="page-title">Work Experience</h1>
          <p className="page-description">
            Browse roles, achievements and technologies used across my previous positions.
          </p>
        </div>

        <button
          className="add-exp-btn"
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
        >
          + Add New Experience
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="experience-grid">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <ExpCard
                key={exp._id}
                experience={exp}
                onEdit={() => {
                  setError(null);
                  setEditingExperience(exp);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteExperience(exp._id)}
              />
            ))
          ) : (
            <div className="no-exp-message">
              No experiences found. Click "Add New Experience" to get started.
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <ExpForm
          experience={editingExperience}
          onSubmit={editingExperience ? handleEditExperience : handleAddExperience}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExperience(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
}

export default Experience;