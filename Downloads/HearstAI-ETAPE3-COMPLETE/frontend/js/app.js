// Main Application Entry Point
import { dashboardTemplate, dashboardStyles } from './views/dashboard.js';
import { renderProjectsView, projectsStyles } from './views/projects.js';
import { renderJobsView, jobsStyles } from './views/jobs.js';
import { renderVersionsView, versionsStyles } from './views/versions.js';
import { renderPromptsView, promptsStyles } from './views/prompts.js';
import { renderLogsView, logsStyles } from './views/logs.js';
import API from './api.js';
import Modal from './components/modal.js';
import notify from './components/notification.js';
import CONFIG, { logEnvironment } from './config.js';
import themeManager from './theme.js';
import exportModule from './export.js';

class ClaudeCockpitApp {
    constructor() {
        this.currentView = 'dashboard';
        this.contentArea = document.getElementById('content-area');
        this.pageTitle = document.getElementById('page-title');
        this.btnNewAction = document.getElementById('btn-new-action');
        
        this.init();
    }
    
    async init() {
        logEnvironment();
        console.log('🚀 Claude CI/CD Cockpit initialized');
        
        // Check backend connection
        try {
            const health = await API.health();
            console.log('✅ Backend connected:', health);
            notify.success('Backend connected successfully');
        } catch (error) {
            console.error('❌ Backend connection failed:', error);
            notify.error('Backend connection failed');
            this.showConnectionError();
            return;
        }
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup header button
        this.setupHeaderButton();
        
        // Load initial view
        this.loadView('dashboard');
        
        // Update stats periodically
        this.updateStats();
        setInterval(() => this.updateStats(), 30000); // Every 30s
    }
    
    showConnectionError() {
        this.contentArea.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="text-danger mb-md">❌ Backend Connection Failed</h3>
                    <p class="text-secondary mb-md">Cannot connect to backend server.</p>
                    <p class="text-secondary mb-md">Make sure the backend is running:</p>
                    <pre style="background: var(--bg-tertiary); padding: 16px; border-radius: 6px; color: var(--accent-primary);">cd backend
npm install
node server.js</pre>
                    <button class="btn btn-primary mt-md" onclick="location.reload()">Retry Connection</button>
                </div>
            </div>
        `;
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                this.loadView(view);
                
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    setupHeaderButton() {
        this.btnNewAction.addEventListener('click', () => {
            this.handleNewAction();
        });
    }
    
    async loadView(viewName) {
        this.currentView = viewName;
        this.updatePageTitle(viewName);
        this.updateHeaderButton(viewName);
        
        // Show loading state
        this.contentArea.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading ${viewName}...</p>
            </div>
        `;
        
        // Load view data and render
        try {
            const data = await this.fetchViewData(viewName);
            this.renderView(viewName, data);
        } catch (error) {
            console.error('Error loading view:', error);
            this.contentArea.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h3 class="text-danger">Error loading ${viewName}</h3>
                        <p class="text-secondary">${error.message}</p>
                    </div>
                </div>
            `;
        }
    }
    
    updatePageTitle(view) {
        const titles = {
            dashboard: 'Dashboard',
            projects: 'Projects',
            jobs: 'Jobs',
            versions: 'Versions',
            prompts: 'Prompt Profiles',
            logs: 'Activity Logs'
        };
        
        this.pageTitle.textContent = titles[view] || view;
    }
    
    updateHeaderButton(view) {
        const buttons = {
            dashboard: '+ New Project',
            projects: '+ New Project',
            jobs: '+ New Job',
            versions: '+ Import Version',
            prompts: '+ New Prompt',
            logs: '🔄 Refresh'
        };
        
        this.btnNewAction.innerHTML = `<span>${buttons[view] || '+ New'}</span>`;
    }
    
    handleNewAction() {
        const actions = {
            dashboard: () => window.showCreateProjectModal(),
            projects: () => window.showCreateProjectModal(),
            jobs: () => window.showCreateJobModal(),
            versions: () => Modal.alert('Coming Soon', 'Import version feature coming soon!'),
            prompts: () => Modal.alert('Coming Soon', 'Create prompt feature coming soon!'),
            logs: () => this.loadView('logs')
        };
        
        const action = actions[this.currentView];
        if (action) action();
    }
    
    async fetchViewData(view) {
        // Use REAL API calls
        const dataFetchers = {
            dashboard: async () => {
                const [stats, projects, jobs] = await Promise.all([
                    API.getStats(),
                    API.getProjects({ status: 'active' }),
                    API.getJobs({ limit: 10 })
                ]);
                return { ...stats, ...projects, ...jobs };
            },
            projects: async () => API.getProjects(),
            jobs: async () => API.getJobs(),
            versions: async () => ({ versions: [] }),
            prompts: async () => ({ prompts: [] }),
            logs: async () => ({ logs: [] })
        };
        
        const fetcher = dataFetchers[view];
        return fetcher ? await fetcher() : {};
    }
    
    async renderView(view, data) {
        const renderers = {
            dashboard: () => this.renderDashboard(data),
            projects: async () => this.renderProjects(),
            jobs: async () => this.renderJobs(),
            versions: async () => this.renderVersions(),
            prompts: async () => this.renderPrompts(),
            logs: async () => this.renderLogs()
        };
        
        const renderer = renderers[view];
        if (renderer) await renderer();
    }
    
    renderDashboard(data) {
        const template = dashboardTemplate(data);
        this.contentArea.innerHTML = dashboardStyles + template;
        
        // Make functions globally available for onclick handlers
        window.viewProject = (id) => console.log('View project:', id);
        window.createJob = (id) => window.showCreateJobModal(id);
        window.viewJob = (id) => console.log('View job:', id);
    }
    
    async renderProjects() {
        const template = await renderProjectsView();
        this.contentArea.innerHTML = projectsStyles + template;
    }
    
    async renderJobs() {
        const template = await renderJobsView();
        this.contentArea.innerHTML = jobsStyles + template;
    }
    
    async renderVersions() {
        const template = await renderVersionsView();
        this.contentArea.innerHTML = versionsStyles + template;
    }
    
    async renderPrompts() {
        const template = await renderPromptsView();
        this.contentArea.innerHTML = promptsStyles + template;
    }
    
    async renderLogs() {
        const template = await renderLogsView();
        this.contentArea.innerHTML = logsStyles + template;
    }
    
    renderPlaceholder(message) {
        this.contentArea.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="text-primary mb-md">${message}</h3>
                    <p class="text-secondary">This view will be implemented soon.</p>
                </div>
            </div>
        `;
    }
    
    
    async updateStats() {
        try {
            const stats = await API.getStats();
            document.getElementById('stat-projects').textContent = stats.total_projects || '0';
            document.getElementById('stat-jobs').textContent = stats.active_jobs || '0';
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ClaudeCockpitApp();
});

// Build: Mon Nov 17 11:44:06 +04 2025
// Modal Functions for Projects and Jobs
import Modal from './components/modal.js';
import API from './api.js';
import notify from './components/notification.js';

// CREATE PROJECT MODAL
export function showCreateProjectModal() {
    const modal = new Modal({
        title: 'Create New Project',
        size: 'medium',
        content: `
            <form id="create-project-form" class="form">
                <div class="form-group">
                    <label for="project-name">Project Name *</label>
                    <input 
                        type="text" 
                        id="project-name" 
                        name="name" 
                        class="form-input" 
                        placeholder="my-awesome-project"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="project-description">Description</label>
                    <textarea 
                        id="project-description" 
                        name="description" 
                        class="form-input" 
                        rows="3"
                        placeholder="Brief description of your project"
                    ></textarea>
                </div>
                
                <div class="form-group">
                    <label for="project-repo">Repository URL</label>
                    <input 
                        type="url" 
                        id="project-repo" 
                        name="repository_url" 
                        class="form-input" 
                        placeholder="https://github.com/user/repo"
                    >
                </div>
            </form>
        `,
        confirmText: 'Create Project',
        onConfirm: async () => {
            const form = document.getElementById('create-project-form');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!data.name || data.name.trim() === '') {
                notify.error('Project name is required');
                return false;
            }
            
            try {
                await API.createProject(data);
                notify.success('Project created successfully!');
                setTimeout(() => window.location.reload(), 1000);
                return true;
            } catch (error) {
                notify.error('Failed to create project: ' + error.message);
                return false;
            }
        }
    });
    
    modal.open();
}

// CREATE JOB MODAL
export function showCreateJobModal(projectId = null) {
    const modal = new Modal({
        title: 'Create New Job',
        size: 'medium',
        content: `
            <form id="create-job-form" class="form">
                ${projectId ? `<input type="hidden" name="project_id" value="${projectId}">` : `
                <div class="form-group">
                    <label for="job-project">Project *</label>
                    <select id="job-project" name="project_id" class="form-input" required>
                        <option value="">Select a project...</option>
                    </select>
                </div>
                `}
                
                <div class="form-group">
                    <label for="job-type">Job Type *</label>
                    <select id="job-type" name="job_type" class="form-input" required>
                        <option value="">Select type...</option>
                        <option value="build">Build</option>
                        <option value="test">Test</option>
                        <option value="deploy">Deploy</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="job-prompt">Prompt/Command *</label>
                    <textarea 
                        id="job-prompt" 
                        name="prompt" 
                        class="form-input" 
                        rows="4"
                        placeholder="Enter the command or prompt for this job..."
                        required
                    ></textarea>
                </div>
            </form>
        `,
        confirmText: 'Create Job',
        onConfirm: async () => {
            const form = document.getElementById('create-job-form');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!data.project_id) {
                notify.error('Please select a project');
                return false;
            }
            
            if (!data.job_type) {
                notify.error('Please select a job type');
                return false;
            }
            
            if (!data.prompt || data.prompt.trim() === '') {
                notify.error('Prompt is required');
                return false;
            }
            
            try {
                await API.createJob(data);
                notify.success('Job created successfully!');
                setTimeout(() => window.location.reload(), 1000);
                return true;
            } catch (error) {
                notify.error('Failed to create job: ' + error.message);
                return false;
            }
        }
    });
    
    if (!projectId) {
        API.getProjects().then(response => {
            const select = document.getElementById('job-project');
            if (select && response.projects) {
                response.projects.forEach(project => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.name;
                    select.appendChild(option);
                });
            }
        }).catch(error => console.error('Failed to load projects:', error));
    }
    
    modal.open();
}

if (typeof window !== 'undefined') {
    window.showCreateProjectModal = showCreateProjectModal;
    window.showCreateJobModal = showCreateJobModal;
}
// Modal Functions for Projects and Jobs
import Modal from './components/modal.js';
import API from './api.js';
import notify from './components/notification.js';

// CREATE PROJECT MODAL
export function showCreateProjectModal() {
    const modal = new Modal({
        title: 'Create New Project',
        size: 'medium',
        content: `
            <form id="create-project-form" class="form">
                <div class="form-group">
                    <label for="project-name">Project Name *</label>
                    <input 
                        type="text" 
                        id="project-name" 
                        name="name" 
                        class="form-input" 
                        placeholder="my-awesome-project"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="project-description">Description</label>
                    <textarea 
                        id="project-description" 
                        name="description" 
                        class="form-input" 
                        rows="3"
                        placeholder="Brief description of your project"
                    ></textarea>
                </div>
                
                <div class="form-group">
                    <label for="project-repo">Repository URL</label>
                    <input 
                        type="url" 
                        id="project-repo" 
                        name="repository_url" 
                        class="form-input" 
                        placeholder="https://github.com/user/repo"
                    >
                </div>
            </form>
        `,
        confirmText: 'Create Project',
        onConfirm: async () => {
            const form = document.getElementById('create-project-form');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!data.name || data.name.trim() === '') {
                notify.error('Project name is required');
                return false;
            }
            
            try {
                await API.createProject(data);
                notify.success('Project created successfully!');
                setTimeout(() => window.location.reload(), 1000);
                return true;
            } catch (error) {
                notify.error('Failed to create project: ' + error.message);
                return false;
            }
        }
    });
    
    modal.open();
}

// CREATE JOB MODAL
export function showCreateJobModal(projectId = null) {
    const modal = new Modal({
        title: 'Create New Job',
        size: 'medium',
        content: `
            <form id="create-job-form" class="form">
                ${projectId ? `<input type="hidden" name="project_id" value="${projectId}">` : `
                <div class="form-group">
                    <label for="job-project">Project *</label>
                    <select id="job-project" name="project_id" class="form-input" required>
                        <option value="">Select a project...</option>
                    </select>
                </div>
                `}
                
                <div class="form-group">
                    <label for="job-type">Job Type *</label>
                    <select id="job-type" name="job_type" class="form-input" required>
                        <option value="">Select type...</option>
                        <option value="build">Build</option>
                        <option value="test">Test</option>
                        <option value="deploy">Deploy</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="job-prompt">Prompt/Command *</label>
                    <textarea 
                        id="job-prompt" 
                        name="prompt" 
                        class="form-input" 
                        rows="4"
                        placeholder="Enter the command or prompt for this job..."
                        required
                    ></textarea>
                </div>
            </form>
        `,
        confirmText: 'Create Job',
        onConfirm: async () => {
            const form = document.getElementById('create-job-form');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!data.project_id) {
                notify.error('Please select a project');
                return false;
            }
            
            if (!data.job_type) {
                notify.error('Please select a job type');
                return false;
            }
            
            if (!data.prompt || data.prompt.trim() === '') {
                notify.error('Prompt is required');
                return false;
            }
            
            try {
                await API.createJob(data);
                notify.success('Job created successfully!');
                setTimeout(() => window.location.reload(), 1000);
                return true;
            } catch (error) {
                notify.error('Failed to create job: ' + error.message);
                return false;
            }
        }
    });
    
    if (!projectId) {
        API.getProjects().then(response => {
            const select = document.getElementById('job-project');
            if (select && response.projects) {
                response.projects.forEach(project => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.name;
                    select.appendChild(option);
                });
            }
        }).catch(error => console.error('Failed to load projects:', error));
    }
    
    modal.open();
}

if (typeof window !== 'undefined') {
    window.showCreateProjectModal = showCreateProjectModal;
    window.showCreateJobModal = showCreateJobModal;
}
