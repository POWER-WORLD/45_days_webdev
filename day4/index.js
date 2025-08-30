// 1. Objects: Key-value pairs for storing structured data.
// We define a 'skill' as an object with 'name' and 'proficiency' keys.
// Dot notation (e.g., skill.name) is used to access values.

// 2. Arrays: An ordered list for storing a collection of data.
// 'skills' is an array that holds multiple skill objects.
const skills = [
    { name: 'HTML', proficiency: 'Advanced' },
    { name: 'CSS', proficiency: 'Advanced' },
    { name: 'JavaScript', proficiency: 'Intermediate' },
    { name: 'React', proficiency: 'Intermediate' },
    { name: 'Node.js', proficiency: 'Basic' },
    { name: 'MongoDB', proficiency: 'Basic' }
];

// 3. Array Methods: A deep dive into .map()
// .map() creates a new array by applying a function to each element of the original array.

/**
 * Transforms an array of skill objects into an array of formatted strings.
 * @param {Array<Object>} skillsArray - The array of skill objects.
 * @returns {Array<string>} A new array of strings like "HTML (Intermediate)".
 */
function formatSkills(skillsArray) {
    // We use .map() to iterate over each 'skill' object in the 'skillsArray'.
    // For each skill, we return a new string in the desired format.
    return skillsArray.map(skill => `${skill.name} (${skill.proficiency})`);
}

// Daily Challenge Execution:
// Call the function with our skills array.
const formattedSkillsArray = formatSkills(skills);

// Log the new array to the console.
console.log("Formatted Skills:");
console.log(formattedSkillsArray);


// --- Other Examples ---

// Looping: A 'for' loop for iterating a set number of times.
console.log("\nUsing a for loop:");
for (let i = 0; i < skills.length; i++) {
    // Accessing array elements by index: skills[i]
    // Accessing object properties with bracket notation: skills[i]['name']
    console.log(`${skills[i]['name']} - ${skills[i]['proficiency']}`);
}

// .forEach(): Executes a function for each array element. Does not return a new array.
console.log("\nUsing .forEach():");
skills.forEach(skill => {
    console.log(`Skill: ${skill.name}`);
});

// .filter(): Creates a new array with all elements that pass the test implemented by the provided function.
console.log("\nUsing .filter() to find 'Advanced' skills:");
const advancedSkills = skills.filter(skill => skill.proficiency === 'Advanced');

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const languageSelect = document.getElementById('language-select');
    const proficiencySelect = document.getElementById('proficiency-select');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillsList = document.getElementById('skills-list');
    const errorMessage = document.getElementById('error-message');
    const skillsDisplay = document.getElementById('skills-display'); // Select the container

    // --- State Management ---
    let userSkills = [];
    const MAX_SKILLS = 6;

    // --- Event Listener ---
    addSkillBtn.addEventListener('click', () => {
        errorMessage.textContent = '';

        if (userSkills.length >= MAX_SKILLS) {
            errorMessage.textContent = `You can add a maximum of ${MAX_SKILLS} skills.`;
            return;
        }

        const selectedLanguageValue = languageSelect.value;
        const selectedProficiency = proficiencySelect.value;
        const selectedLanguageText = languageSelect.options[languageSelect.selectedIndex].text;

        const skillExists = userSkills.some(skill => skill.name === selectedLanguageValue);
        if (skillExists) {
            errorMessage.textContent = `You have already added ${selectedLanguageText}.`;
            return;
        }

        const newSkill = {
            name: selectedLanguageValue,
            proficiency: selectedProficiency
        };
        userSkills.push(newSkill);

        // Show the skills display area if it's the first skill
        if (userSkills.length === 1) {
            skillsDisplay.style.display = 'block';
        }

        const listItem = document.createElement('li');
        
        const skillTextSpan = document.createElement('span');
        skillTextSpan.textContent = `${selectedLanguageText} (${selectedProficiency.charAt(0).toUpperCase() + selectedProficiency.slice(1)})`;

        const clearIcon = document.createElement('span');
        clearIcon.textContent = '✖';
        clearIcon.className = 'clear-icon';
        clearIcon.title = 'Remove skill';

        clearIcon.addEventListener('click', () => {
            userSkills = userSkills.filter(skill => skill.name !== newSkill.name);
            listItem.remove();

            // Hide the skills display area if no skills are left
            if (userSkills.length === 0) {
                skillsDisplay.style.display = 'none';
            }

            if (userSkills.length < MAX_SKILLS) {
                addSkillBtn.disabled = false;
                if (errorMessage.textContent.includes('Maximum')) {
                    errorMessage.textContent = '';
                }
            }
        });

        listItem.appendChild(skillTextSpan);
        listItem.appendChild(clearIcon);
        skillsList.appendChild(listItem);

        if (userSkills.length >= MAX_SKILLS) {
            addSkillBtn.disabled = true;
            errorMessage.textContent = `Maximum skills reached.`;
        }
    });
});