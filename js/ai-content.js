// AI Content Generation Simulation
class AIContentGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.generateHomeContent();
        this.generateAboutContent();
        this.generateServices();
        this.generateTestimonials();
        this.setupAIGenerator();
    }

    // AI Responses Database
    aiResponses = {
        taglines: [
            "Transforming Businesses with AI-Powered Solutions",
            "Innovating Tomorrow with Artificial Intelligence Today",
            "Where AI Meets Business Excellence",
            "Driving Digital Transformation Through Intelligent Solutions"
        ],
        
        mission: "To empower businesses with cutting-edge AI solutions that drive innovation, efficiency, and sustainable growth while maintaining the highest standards of ethical AI practices.",
        
        vision: "To be the global leader in AI-driven digital transformation, creating a future where intelligent technology enhances every aspect of business operations and human experiences.",
        
        values: "Innovation, Integrity, Excellence, Collaboration, and Customer-Centricity form the foundation of everything we do at Mastersolis Infotech.",
        
        services: [
            { name: "AI-Powered Chatbots", description: "Intelligent conversational AI that provides 24/7 customer support and enhances user engagement through natural language processing and sentiment-aware responses.", category: "ai" },
            { name: "Predictive Analytics", description: "Advanced machine learning models that forecast trends, customer behavior, and business outcomes to inform smarter business decisions.", category: "ai" },
            { name: "Computer Vision", description: "Custom computer vision systems for image/video analysis, object detection, OCR and automated visual inspection.", category: "ai" },
            { name: "NLP & Text Mining", description: "Natural Language Processing solutions including text classification, summarization, and semantic search to extract value from unstructured data.", category: "ai" },
            { name: "Custom Web Applications", description: "Scalable, responsive web applications built with modern frameworks and optimized for performance and user experience.", category: "web" },
            { name: "E-commerce Solutions", description: "Complete online store development with AI-powered recommendations, inventory management, and secure payment integration.", category: "web" },
            { name: "Progressive Web Apps (PWA)", description: "Fast, reliable PWAs that behave like native apps, offering offline support and improved user engagement.", category: "web" },
            { name: "Mobile App Development", description: "Native and cross-platform mobile applications with intuitive UI/UX and seamless performance across all devices.", category: "mobile" },
            { name: "Mobile AI Integration", description: "On-device ML and hybrid models for mobile apps — reduced latency, better privacy, and offline capabilities.", category: "mobile" },
            { name: "Cloud Migration & DevOps", description: "Secure and efficient migration to cloud platforms with CI/CD, infrastructure as code, and cost optimization.", category: "cloud" },
            { name: "Cloud-Native Architecture", description: "Design and implementation of microservices, containerization, and scalable cloud-native systems.", category: "cloud" },
            { name: "Data Engineering & Pipelines", description: "Robust ETL/ELT pipelines, data lakes, and feature stores to prepare reliable data for analytics and ML.", category: "ai" }
        ],
        
        testimonials: [
            {
                name: "Sarah Chen",
                company: "TechInnovate Inc.",
                content: "Mastersolis transformed our customer service with their AI chatbot. Response times improved by 70% and customer satisfaction skyrocketed.",
                avatar: "SC"
            },
            {
                name: "James Rodriguez",
                company: "Global Retail Solutions",
                content: "The predictive analytics platform they built helped us reduce inventory costs by 35% while improving product availability.",
                avatar: "JR"
            },
            {
                name: "Priya Patel",
                company: "FinTech Leaders",
                content: "Their mobile banking app revolutionized our customer experience. The AI features made financial management intuitive and secure.",
                avatar: "PP"
            }
        ],
        
        team: [
            {
                name: "Dr. Ananya Sharma",
                role: "Chief AI Officer",
                bio: "PhD in Machine Learning from Stanford. 10+ years in AI research and implementation.",
                avatar: "AS"
            },
            {
                name: "Rajiv Mehta",
                role: "Head of Technology",
                bio: "Former Google engineer with expertise in scalable systems and cloud architecture.",
                avatar: "RM"
            },
            {
                name: "Lisa Thompson",
                role: "UX Design Lead",
                bio: "Award-winning designer focused on creating intuitive AI-powered interfaces.",
                avatar: "LT"
            }
        ],
        
        milestones: [
            { year: "2018", event: "Company Founded with focus on AI solutions" },
            { year: "2019", event: "Launched first AI-powered product - SmartChat Assistant" },
            { year: "2020", event: "Expanded to international markets" },
            { year: "2021", event: "Reached 100+ enterprise clients worldwide" },
            { year: "2022", event: "Opened new R&D center for AI innovation" },
            { year: "2023", event: "Recognized as Top AI Solution Provider by TechAwards" }
        ]
    };

    generateHomeContent() {
        // Dynamic tagline
        const taglineElement = document.getElementById('dynamic-tagline');
        const contentElement = document.getElementById('ai-generated-content');
        
        if (taglineElement) {
            const randomTagline = this.aiResponses.taglines[
                Math.floor(Math.random() * this.aiResponses.taglines.length)
            ];
            taglineElement.textContent = randomTagline;
        }
        
        if (contentElement) {
            contentElement.textContent = "At Mastersolis Infotech, we harness the power of artificial intelligence to create innovative solutions that drive business growth. Our AI-powered platforms are transforming industries by automating complex processes, generating valuable insights, and enhancing customer experiences.";
        }
    }

    generateAboutContent() {
        // Mission, Vision, Values
        const missionElement = document.getElementById('mission-content');
        const visionElement = document.getElementById('vision-content');
        const valuesElement = document.getElementById('values-content');
        
        if (missionElement) missionElement.textContent = this.aiResponses.mission;
        if (visionElement) visionElement.textContent = this.aiResponses.vision;
        if (valuesElement) valuesElement.textContent = this.aiResponses.values;
        
        // Team
        const teamContainer = document.getElementById('team-container');
        if (teamContainer) {
            this.aiResponses.team.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.className = 'team-member';
                memberElement.innerHTML = `
                    <div class="member-avatar">${member.avatar}</div>
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <p>${member.bio}</p>
                `;
                teamContainer.appendChild(memberElement);
            });
        }
        
        // Milestones
        const timelineElement = document.getElementById('milestones-timeline');
        if (timelineElement) {
            this.aiResponses.milestones.forEach(milestone => {
                const milestoneElement = document.createElement('div');
                milestoneElement.className = 'timeline-item';
                milestoneElement.innerHTML = `
                    <h4>${milestone.year}</h4>
                    <p>${milestone.event}</p>
                `;
                timelineElement.appendChild(milestoneElement);
            });
        }
    }

    generateServices() {
        const servicesContainer = document.getElementById('services-container');
        if (servicesContainer) {
            this.aiResponses.services.forEach(service => {
                const serviceElement = document.createElement('div');
                serviceElement.className = `service-card ${service.category}`;
                serviceElement.innerHTML = `
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <span class="service-category">${service.category.toUpperCase()}</span>
                `;
                servicesContainer.appendChild(serviceElement);
            });
            
            // Add filter functionality
            this.setupServiceFilter();
            // Setup rotating service suggestions (4 at a time)
            this.setupServiceSuggestions();
        }
    }

    setupServiceSuggestions() {
        const suggestionsContainer = document.getElementById('service-suggestions');
        if (!suggestionsContainer) return;

        const services = this.aiResponses.services;
        const SUGGEST_COUNT = 4;
        const INTERVAL_MS = 10000; // rotate every 10s
        let timer = null;

        function getRandomIndexes(n, max) {
            const idx = new Set();
            while (idx.size < n && idx.size < max) {
                idx.add(Math.floor(Math.random() * max));
            }
            return Array.from(idx);
        }

        const render = () => {
            suggestionsContainer.innerHTML = '';
            const indexes = getRandomIndexes(SUGGEST_COUNT, services.length);
            indexes.forEach(i => {
                const s = services[i];
                const card = document.createElement('div');
                card.className = 'service-card suggestion';
                card.innerHTML = `
                    <h4>${s.name}</h4>
                    <p>${s.description.length > 120 ? s.description.slice(0, 117) + '...' : s.description}</p>
                    <span class="service-category">${s.category.toUpperCase()}</span>
                `;
                // clicking a suggestion scrolls to the full list
                card.addEventListener('click', () => {
                    const container = document.getElementById('services-container');
                    if (container) container.scrollIntoView({ behavior: 'smooth' });
                });
                suggestionsContainer.appendChild(card);
            });
        };

        // start initial render and rotation
        render();
        timer = setInterval(render, INTERVAL_MS);

        // Pause rotation on hover
        suggestionsContainer.addEventListener('mouseenter', () => clearInterval(timer));
        suggestionsContainer.addEventListener('mouseleave', () => {
            timer = setInterval(render, INTERVAL_MS);
        });
    }

    generateTestimonials() {
        const testimonialsContainer = document.getElementById('testimonials-container');
        if (testimonialsContainer) {
            this.aiResponses.testimonials.forEach(testimonial => {
                const testimonialElement = document.createElement('div');
                testimonialElement.className = 'testimonial-card';
                testimonialElement.innerHTML = `
                    <div class="testimonial-content">
                        <p>"${testimonial.content}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">${testimonial.avatar}</div>
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.company}</p>
                        </div>
                    </div>
                `;
                testimonialsContainer.appendChild(testimonialElement);
            });
        }
    }

    setupServiceFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                serviceCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    setupAIGenerator() {
        const generateBtn = document.getElementById('generateContent');
        const aiPrompt = document.getElementById('aiPrompt');
        const aiOutput = document.getElementById('aiOutput');

        // Hero-specific generator elements
        const heroBtn = document.getElementById('heroGenerate');
        const heroPrompt = document.getElementById('heroPrompt');
        const heroOutput = document.getElementById('ai-generated-content');
        const heroUseTaglineBtn = document.getElementById('heroUseTagline');

        // Utility: simulate generation (short or long)
        const simulateGeneration = (prompt, short = false) => {
            return new Promise(resolve => {
                const delay = short ? 700 : 1500;
                setTimeout(() => {
                    if (short) {
                        const variants = [
                            `AI-crafted: ${prompt} — intelligent solutions for growth.`,
                            `Smart solution for "${prompt}" — automation and insights.`,
                            `${prompt}: scalable AI systems to accelerate your business.`,
                            `Unlock growth with AI-driven ${prompt}.`
                        ];
                        resolve(variants[Math.floor(Math.random() * variants.length)]);
                    } else {
                        const solutions = [
                            `Based on your need for "${prompt}", I recommend implementing an AI-powered automation system that can reduce manual effort by up to 60%. This solution would include intelligent workflow optimization and real-time analytics.`,
                            `For "${prompt}", consider our custom AI integration platform. It provides scalable machine learning models, natural language processing capabilities, and seamless API integration with your existing systems.`,
                            `Your requirement "${prompt}" aligns perfectly with our predictive analytics suite. This solution offers data-driven insights, trend forecasting, and automated decision-making support to enhance your business outcomes.`
                        ];
                        resolve(solutions[Math.floor(Math.random() * solutions.length)]);
                    }
                }, delay);
            });
        };

        // Main AI demo (longer output)
        if (generateBtn && aiPrompt && aiOutput) {
            generateBtn.addEventListener('click', () => {
                const prompt = aiPrompt.value.trim();

                if (!prompt) {
                    aiOutput.innerHTML = '<p style="color: var(--error);">Please enter a description of what you need!</p>';
                    return;
                }

                // Show loading state
                aiOutput.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> AI is generating your solution...</p>';

                simulateGeneration(prompt, false).then(randomSolution => {
                    aiOutput.innerHTML = `
                        <h4>AI-Generated Solution</h4>
                        <p>${randomSolution}</p>
                        <div style="margin-top: 15px; padding: 10px; background: #e0f2fe; border-radius: 5px;">
                            <small><i class="fas fa-robot"></i> This solution was generated by AI. Contact us for a detailed consultation.</small>
                        </div>
                    `;
                });
            });
        }

        // Hero generator: shorter, hero-friendly copy into #ai-generated-content
        if (heroBtn && heroPrompt && heroOutput) {
            const showHeroLoading = () => {
                heroOutput.textContent = '';
                const loading = document.createElement('span');
                loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
                heroOutput.appendChild(loading);
            };

            const generateHero = (usePromptAsTagline = false) => {
                const prompt = heroPrompt.value.trim() || 'AI-driven growth';
                showHeroLoading();
                simulateGeneration(prompt, true).then(result => {
                    // result is short single-line text
                    heroOutput.textContent = result;
                    // If user chose to use as tagline, also update the main headline
                    if (usePromptAsTagline && typeof result === 'string') {
                        const headline = document.getElementById('dynamic-tagline');
                        if (headline) {
                            headline.textContent = result;
                        }
                    }
                });
            };

            heroBtn.addEventListener('click', () => generateHero(false));
            // Allow Enter key to trigger generation
            heroPrompt.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    generateHero(false);
                }
            });

            if (heroUseTaglineBtn) {
                heroUseTaglineBtn.addEventListener('click', () => generateHero(true));
            }
        }
    }
}

// Initialize AI Content Generator
document.addEventListener('DOMContentLoaded', function() {
    new AIContentGenerator();
});