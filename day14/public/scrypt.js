document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const homeSection = document.getElementById('home-section');
    const navHome = document.getElementById('nav-home');
    const navLogin = document.getElementById('nav-login');
    const navSignup = document.getElementById('nav-signup');
    const navDashboard = document.getElementById('nav-dashboard');
    const navLogout = document.getElementById('nav-logout');
    const createPostBtn = document.getElementById('create-post-btn');
    const postFormContainer = document.getElementById('post-form-container');
    const postForm = document.getElementById('post-form');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    const userPostsDiv = document.getElementById('user-posts');
    const allPostsDiv = document.getElementById('all-posts');

    let currentUser = null;
    let posts = [];
    let authToken = localStorage.getItem('authToken');

    // API Base URL
    const API_BASE = window.location.origin;

    // --- API Utility Functions ---
    async function apiCall(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'API call failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async function loadPosts() {
        try {
            const postsData = await apiCall('/api/posts');
            posts = postsData;
        } catch (error) {
            console.error('Failed to load posts:', error);
            posts = [];
        }
    }

    async function loadComments(postId) {
        try {
            const comments = await apiCall(`/api/posts/${postId}/comments`);
            return comments;
        } catch (error) {
            console.error('Failed to load comments:', error);
            return [];
        }
    }

    async function loadReplies(postId, commentId) {
        try {
            const replies = await apiCall(`/api/posts/${postId}/comments/${commentId}/replies`);
            return replies;
        } catch (error) {
            console.error('Failed to load replies:', error);
            return [];
        }
    }

    // --- Utility Functions ---
    function showSection(section) {
        authSection.style.display = 'none';
        dashboardSection.style.display = 'none';
        homeSection.style.display = 'none';
        section.style.display = 'block';
    }

    function updateNav() {
        if (currentUser) {
            navLogin.style.display = 'none';
            navSignup.style.display = 'none';
            navDashboard.style.display = 'block';
            navLogout.style.display = 'block';
        } else {
            navLogin.style.display = 'block';
            navSignup.style.display = 'block';
            navDashboard.style.display = 'none';
            navLogout.style.display = 'none';
        }
    }

    // --- Authentication Functions ---
    function renderAuthForm(type) {
        authSection.innerHTML = '';
        const formHtml = `
            <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form id="${type}-form">
                ${type === 'signup' ? '<input type="text" id="username" placeholder="Username" required>' : ''}
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">${type === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
                ${type === 'login' ? "Don't have an account? <a href='#' id='show-signup'>Sign Up</a>" : "Already have an account? <a href='#' id='show-login'>Login</a>"}
            </p>
        `;
        authSection.innerHTML = formHtml;
        showSection(authSection);

        document.getElementById(`${type}-form`).addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                if (type === 'signup') {
                    const username = document.getElementById('username').value;
                    const response = await apiCall('/api/signup', {
                        method: 'POST',
                        body: JSON.stringify({ username, email, password })
                    });
                    
                    currentUser = { id: response.userId, username, email };
                    alert('Sign Up Successful!');
                } else { // login
                    const response = await apiCall('/api/login', {
                        method: 'POST',
                        body: JSON.stringify({ email, password })
                    });
                    
                    authToken = response.token;
                    localStorage.setItem('authToken', authToken);
                    
                    // Get user info from token (simplified - in real app, decode JWT or get from API)
                    currentUser = { email, id: 'temp' };
                    alert('Login Successful!');
                }
                
                updateNav();
                await loadPosts();
                renderDashboard();
            } catch (error) {
                alert(error.message || 'Authentication failed!');
            }
        });

        if (type === 'login') {
            document.getElementById('show-signup').addEventListener('click', (e) => {
                e.preventDefault();
                renderAuthForm('signup');
            });
        } else {
            document.getElementById('show-login').addEventListener('click', (e) => {
                e.preventDefault();
                renderAuthForm('login');
            });
        }
    }

    function logout() {
        currentUser = null;
        authToken = null;
        localStorage.removeItem('authToken');
        updateNav();
        renderAllPosts();
    }

    // --- Post Management Functions ---
    async function renderPost(post, parentElement, isUserPost = false) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.id = post._id;
        const author = post.author || 'Unknown';

        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <div class="meta">Posted by ${author} on ${new Date(post.createdAt).toLocaleString()}</div>
            <div class="actions">
                ${isUserPost ? `
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                ` : ''}
                <button class="reply-btn">Reply</button>
            </div>
            <div class="replies">
                <!-- Comments will be loaded here -->
            </div>
            <div class="reply-form-container" style="display: none;">
                <form class="reply-form">
                    <textarea placeholder="Write a comment..." rows="3" required></textarea>
                    <button type="submit">Submit Comment</button>
                </form>
            </div>
        `;
        parentElement.prepend(postElement); // Add new posts to the top

        // Load and render comments
        const repliesDiv = postElement.querySelector('.replies');
        try {
            const comments = await loadComments(post._id);
            comments.forEach(comment => renderReply(comment, repliesDiv, post._id));
        } catch (error) {
            console.error('Failed to load comments:', error);
        }

        // Event Listeners for post actions
        if (isUserPost) {
            postElement.querySelector('.edit').addEventListener('click', () => editPost(post._id));
            postElement.querySelector('.delete').addEventListener('click', () => deletePost(post._id));
        }

        postElement.querySelector('.reply-btn').addEventListener('click', () => {
            const replyFormContainer = postElement.querySelector('.reply-form-container');
            replyFormContainer.style.display = replyFormContainer.style.display === 'none' ? 'block' : 'none';
        });

        postElement.querySelector('.reply-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const replyContent = e.target.querySelector('textarea').value;
            await addComment(post._id, replyContent);
            e.target.reset();
            postElement.querySelector('.reply-form-container').style.display = 'none';
        });
    }

    function renderReply(reply, parentElement, postId) {
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        const author = reply.username || 'Unknown';
        replyElement.innerHTML = `
            <p>${reply.content}</p>
            <div class="meta">Commented by ${author} on ${new Date(reply.createdAt).toLocaleString()}</div>
        `;
        parentElement.appendChild(replyElement);
    }

    async function addPost(title, content) {
        try {
            await apiCall('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ 
                    title, 
                    content, 
                    author: currentUser.username || currentUser.email 
                })
            });
            
            await loadPosts();
            renderDashboard();
            renderAllPosts(); // Update home section as well
        } catch (error) {
            alert('Failed to create post: ' + error.message);
        }
    }

    async function editPost(postId) {
        const postToEdit = posts.find(post => post._id === postId);
        if (postToEdit && postToEdit.author === (currentUser.username || currentUser.email)) {
            const newTitle = prompt('Edit title:', postToEdit.title);
            const newContent = prompt('Edit content:', postToEdit.content);
            if (newTitle !== null && newContent !== null) {
                try {
                    await apiCall(`/api/posts/${postId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ title: newTitle, content: newContent })
                    });
                    
                    await loadPosts();
                    renderDashboard();
                    renderAllPosts();
                } catch (error) {
                    alert('Failed to edit post: ' + error.message);
                }
            }
        } else {
            alert('You can only edit your own posts.');
        }
    }

    async function deletePost(postId) {
        const postToDelete = posts.find(post => post._id === postId);
        if (postToDelete && postToDelete.author === (currentUser.username || currentUser.email)) {
            if (confirm('Are you sure you want to delete this post?')) {
                try {
                    await apiCall(`/api/deleteposts/${postId}`, {
                        method: 'DELETE'
                    });
                    
                    await loadPosts();
                    renderDashboard();
                    renderAllPosts();
                } catch (error) {
                    alert('Failed to delete post: ' + error.message);
                }
            }
        } else {
            alert('You can only delete your own posts.');
        }
    }

    async function addComment(postId, content) {
        if (currentUser) {
            try {
                await apiCall(`/api/posts/${postId}/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        username: currentUser.username || currentUser.email, 
                        content 
                    })
                });
                
                await loadPosts();
                renderAllPosts(); // Re-render all posts to show new comment
                if (currentUser) {
                    renderDashboard(); // Re-render dashboard if logged in
                }
            } catch (error) {
                alert('Failed to add comment: ' + error.message);
            }
        } else {
            alert('You must be logged in to comment.');
        }
    }

    // --- Render Sections ---
    async function renderDashboard() {
        if (!currentUser) {
            renderAuthForm('login');
            return;
        }
        showSection(dashboardSection);
        userPostsDiv.innerHTML = '<h3>Your Posts</h3>';
        const userPosts = posts.filter(post => post.author === (currentUser.username || currentUser.email));
        if (userPosts.length === 0) {
            userPostsDiv.innerHTML += '<p>You have not created any posts yet.</p>';
        } else {
            for (const post of userPosts) {
                await renderPost(post, userPostsDiv, true);
            }
        }
    }

    async function renderAllPosts() {
        showSection(homeSection);
        allPostsDiv.innerHTML = '';
        if (posts.length === 0) {
            allPostsDiv.innerHTML = '<p>No posts available yet. Be the first to create one!</p>';
        } else {
            // Posts are already sorted by createdAt in descending order from the API
            for (const post of posts) {
                await renderPost(post, allPostsDiv);
            }
        }
    }

    // --- Event Listeners ---
    navHome.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadPosts();
        await renderAllPosts();
    });

    navLogin.addEventListener('click', (e) => {
        e.preventDefault();
        renderAuthForm('login');
    });

    navSignup.addEventListener('click', (e) => {
        e.preventDefault();
        renderAuthForm('signup');
    });

    navDashboard.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadPosts();
        await renderDashboard();
    });

    navLogout.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    createPostBtn.addEventListener('click', () => {
        postFormContainer.style.display = postFormContainer.style.display === 'none' ? 'block' : 'none';
    });

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = postTitleInput.value;
        const content = postContentInput.value;
        if (title && content) {
            await addPost(title, content);
            postForm.reset();
            postFormContainer.style.display = 'none';
        } else {
            alert('Please fill in both title and content.');
        }
    });

    // --- Initial Load ---
    updateNav();
    loadPosts().then(() => renderAllPosts()); // Show all posts on initial load
});
