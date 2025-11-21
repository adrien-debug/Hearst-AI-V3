const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage
let projects = [];
let jobs = [];
let versions = [];
let prompts = [];
let projectIdCounter = 1;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: 'vercel-serverless'
    });
});

// Projects routes
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/projects', (req, res) => {
    const newProject = {
        id: projectIdCounter++,
        name: req.body.name,
        description: req.body.description || '',
        github_url: req.body.github_url || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
});

app.put('/api/projects/:id', (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    projects[index] = {
        ...projects[index],
        ...req.body,
        updated_at: new Date().toISOString()
    };
    res.json(projects[index]);
});

app.delete('/api/projects/:id', (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    projects.splice(index, 1);
    res.json({ message: 'Project deleted' });
});

// Jobs routes
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
    const newJob = {
        id: jobs.length + 1,
        ...req.body,
        status: 'pending',
        created_at: new Date().toISOString()
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

// Versions routes
app.get('/api/versions', (req, res) => {
    res.json(versions);
});

// Prompts routes
app.get('/api/prompts', (req, res) => {
    res.json(prompts);
});

// Logs routes
app.get('/api/logs', (req, res) => {
    res.json({ logs: [] });
});

// Stats routes - FORMAT CORRECT
app.get('/api/stats', (req, res) => {
    res.json({ 
        total_projects: projects.length,
        active_jobs: jobs.filter(j => j.status === 'running').length,
        total_versions: versions.length,
        storage_used: 0
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;
