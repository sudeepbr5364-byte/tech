// Projects Management
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "AI-Powered Customer Service Platform",
                description: "An intelligent customer service platform that uses natural language processing to handle customer queries and provide instant solutions.",
                tags: ["ai", "web", "cloud"],
                image: "🤖",
                client: "Global E-commerce Giant",
                duration: "6 months"
            },
            {
                id: 2,
                title: "Predictive Maintenance System",
                description: "Machine learning system that predicts equipment failures and schedules maintenance, reducing downtime by 45%.",
                tags: ["ai", "data", "cloud"],
                image: "📊",
                client: "Manufacturing Leader",
                duration: "8 months"
            },
            {
                id: 3,
                title: "Mobile Banking Application",
                description: "Secure mobile banking app with AI-powered fraud detection and personalized financial insights.",
                tags: ["mobile", "ai", "data"],
                image: "📱",
                client: "Financial Institution",
                duration: "9 months"
            },
            {
                id: 4,
                title: "E-commerce Analytics Dashboard",
                description: "Real-time analytics dashboard that provides insights into customer behavior and sales performance.",
                tags: ["web", "data", "ai"],
                image: "📈",
                client: "Retail Chain",
                duration: "4 months"
            },
            {
                id: 5,
                title: "Cloud Migration Solution",
                description: "Comprehensive cloud migration strategy and implementation for enterprise-scale applications.",
                tags: ["cloud", "web"],
                image: "☁️",
                client: "Technology Company",
                duration: "5 months"
            },
            {
                id: 6,
                title: "Supply Chain Optimization",
                description: "AI-driven supply chain management system that optimizes inventory and reduces operational costs.",
                tags: ["ai", "data"],
                image: "🔗",
                client: "Logistics Provider",
                duration: "7 months"
            }
            ,
            {
                id: 7,
                title: "Medical Imaging Assistant",
                description: "A computer-vision system that assists radiologists by detecting anomalies in medical images and suggesting likely diagnoses.",
                tags: ["ai", "data"],
                image: "🩺",
                client: "Healthcare Network",
                duration: "10 months",
                skills: ["Python", "TensorFlow/PyTorch", "OpenCV", "DICOM", "Medical data compliance"]
            },
            {
                id: 8,
                title: "Precision Agriculture Platform",
                description: "ML models and IoT integration to predict crop yield, optimize irrigation, and detect pests from drone imagery.",
                tags: ["ai", "cloud", "data"],
                image: "🌾",
                client: "AgriTech Startup",
                duration: "8 months",
                skills: ["IoT", "Computer Vision", "Time-series ML", "AWS/GCP", "GIS"]
            },
            {
                id: 9,
                title: "Smart Home Energy Manager",
                description: "An edge+cloud system that learns household usage patterns and optimizes energy consumption and battery storage.",
                tags: ["iot", "cloud"],
                image: "🏠",
                client: "Utility Partner",
                duration: "6 months",
                skills: ["Embedded C/Arduino", "MQTT", "Edge ML", "Power systems", "React"]
            },
            {
                id: 10,
                title: "Autonomous Inspection Drones",
                description: "Autonomous drones with onboard computer vision for inspection of infrastructure (bridges, pipelines) and automated reporting.",
                tags: ["ai", "robotics"],
                image: "� drone",
                client: "Infrastructure Services",
                duration: "9 months",
                skills: ["ROS", "Drone SDKs", "Computer Vision", "SLAM", "C++/Python"]
            },
            {
                id: 11,
                title: "Adaptive Learning Platform",
                description: "An EdTech platform using reinforcement learning to personalize learning pathways and content for students.",
                tags: ["web", "ai"],
                image: "🎓",
                client: "Education Group",
                duration: "7 months",
                skills: ["Recommendation Systems", "Reinforcement Learning", "React", "Node.js", "Data Analytics"]
            },
            {
                id: 12,
                title: "Smart Grid Optimization",
                description: "A platform for optimizing distributed energy resources using forecasting and optimization models to balance load and reduce costs.",
                tags: ["cloud", "data"],
                image: "⚡",
                client: "Energy Provider",
                duration: "11 months",
                skills: ["Optimization", "Time-series Forecasting", "Power Systems", "Python", "Kubernetes"]
            }
        ];
        
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupSearch();
        this.setupFilter();
    }

    renderProjects(filteredProjects = null) {
        const container = document.getElementById('projects-container');
        if (!container) return;

        const projectsToRender = filteredProjects || this.projects;
        
        container.innerHTML = projectsToRender.map(project => `
            <div class="project-card" data-tags="${project.tags.join(' ')}">
                <div class="project-image">
                    ${project.image}
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-skills">
                        <strong>Skills required:</strong>
                        ${project.skills ? project.skills.map(s => `<span class="skill">${s}</span>`).join(' ') : '<span class="skill">Full-stack development</span>'}
                    </div>
                    <div class="project-meta">
                        <small><strong>Client:</strong> ${project.client}</small><br>
                        <small><strong>Duration:</strong> ${project.duration}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupSearch() {
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = this.projects.filter(project => 
                    project.title.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.client.toLowerCase().includes(searchTerm) ||
                    project.tags.some(tag => tag.includes(searchTerm))
                );
                this.renderProjects(filtered);
            });
        }
    }

    setupFilter() {
        const tagButtons = document.querySelectorAll('.tag-btn');
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const selectedTag = button.getAttribute('data-tag');
                this.filterProjects(selectedTag);
            });
        });
    }

    filterProjects(tag) {
        if (tag === 'all') {
            this.renderProjects();
            return;
        }

        const filtered = this.projects.filter(project => 
            project.tags.includes(tag)
        );
        this.renderProjects(filtered);
    }
}

// Initialize Projects Manager
document.addEventListener('DOMContentLoaded', function() {
    new ProjectsManager();
});