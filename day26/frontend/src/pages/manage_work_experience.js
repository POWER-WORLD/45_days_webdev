import React, { useEffect, useState, useCallback } from 'react';
import './manage_work_experience.css';
import Spinner from '../components/spinner';
import WorkExperienceForm from '../components/work_experience_form';
import WorkExperienceCard from '../components/work_experience_card';
import { getAllWorkExperiences, addWorkExperience, deleteWorkExperience } from '../services/api';

function ManageWorkExperience() {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Move fetchExperiences outside useEffect and memoize it
    const fetchExperiences = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAllWorkExperiences();
            console.log("Fetched experiences:", response);

            // Extract the data array from the response
            const experiencesData = response.data || [];
            setExperiences(experiencesData);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch experiences:", error);
            setError("Failed to load experiences");
            setExperiences([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Use the memoized fetchExperiences in useEffect
    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    const handleAddExperience = async (experienceData) => {
        try {
            const response = await addWorkExperience(experienceData);
            console.log("Added experience:", response);
            // After adding, refresh the experiences list
            await fetchExperiences();
        } catch (error) {
            console.error("Failed to add experience:", error);
        }

    };

    const handleDeleteExperience = async (id) => {
        try {
            await deleteWorkExperience(id);
            // After successful deletion, refresh the experiences list
            await fetchExperiences();
        } catch (error) {
            console.error("Failed to delete experience:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="spinner-container">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="manage_experience_page">
            <div className="form_container">
                <WorkExperienceForm onSubmit={handleAddExperience} />
            </div>

            <div className="cards_container">
                {console.log("Rendering experiences:", experiences)}
                {experiences.length === 0 ? (
                    <p>No work experiences found. Please add some.</p>
                ) : (
                    experiences.map(exp => (
                        <WorkExperienceCard
                            key={exp._id || exp.id}
                            experience={exp}
                            onDelete={() => handleDeleteExperience(exp._id || exp.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ManageWorkExperience;