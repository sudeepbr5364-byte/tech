// Contact Form Handling
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormSubmission();
    }

    setupFormSubmission() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmission(form);
            });
        }
    }

    async handleSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            subject: formData.get('subject') || document.getElementById('subject').value,
            service: formData.get('service') || document.getElementById('service').value,
            message: formData.get('message') || document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateAPICall(data);
            
            // Show success message
            this.showSuccessMessage(form, data.name);
            
            // Send AI-generated response email (simulated)
            this.sendAIResponseEmail(data);
            
        } catch (error) {
            this.showErrorMessage(form);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateAPICall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Store in localStorage (simulating database)
                const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                submissions.push(data);
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                resolve(true);
            }, 2000);
        });
    }

    showSuccessMessage(form, name) {
        form.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 20px;"></i>
                <h3>Thank You, ${name}!</h3>
                <p>Your message has been received. Our AI system is analyzing your inquiry and we'll get back to you within 24 hours with a personalized solution.</p>
                <div style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-radius: 10px;">
                    <small><i class="fas fa-robot"></i> <strong>AI Note:</strong> Based on your inquiry about ${document.getElementById('service').value}, I've already started preparing some initial recommendations for our discussion.</small>
                </div>
            </div>
        `;
    }

    showErrorMessage(form) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p style="color: var(--error); text-align: center;">
                <i class="fas fa-exclamation-triangle"></i> 
                There was an error sending your message. Please try again or contact us directly at info@mastersolisinfotech.com
            </p>
        `;
        form.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    sendAIResponseEmail(data) {
        // Simulate AI-generated email response
        const aiResponses = {
            ai: `Dear ${data.name},\n\nThank you for your interest in our AI Solutions. Based on your inquiry about "${data.subject}", I've prepared an initial assessment suggesting our machine learning platform would be ideal for your needs.\n\nWe'll contact you within 24 hours to discuss how our AI can transform your business operations.\n\nBest regards,\nAI Assistant\nMastersolis Infotech`,
            
            web: `Dear ${data.name},\n\nThank you for inquiring about our Web Development services. Your project "${data.subject}" sounds exciting! Our team specializes in creating responsive, high-performance websites that drive results.\n\nWe'll reach out shortly to discuss your vision and requirements in detail.\n\nBest regards,\nAI Assistant\nMastersolis Infotech`,
            
            mobile: `Dear ${data.name},\n\nGreat to hear about your mobile app idea! Based on "${data.subject}", our cross-platform development approach would ensure maximum reach and user engagement.\n\nOur mobile experts will contact you to explore the perfect solution for your needs.\n\nBest regards,\nAI Assistant\nMastersolis Infotech`,
            
            cloud: `Dear ${data.name},\n\nThank you for considering our Cloud Solutions. Your inquiry about "${data.subject}" aligns perfectly with our expertise in scalable, secure cloud infrastructure.\n\nWe'll connect you with our cloud architects to discuss migration strategies and optimization.\n\nBest regards,\nAI Assistant\nMastersolis Infotech`,
            
            other: `Dear ${data.name},\n\nThank you for reaching out to Mastersolis Infotech. We're excited to learn more about "${data.subject}" and how we can help bring your vision to life with our technology solutions.\n\nOur team will contact you within 24 hours to discuss the perfect approach for your project.\n\nBest regards,\nAI Assistant\nMastersolis Infotech`
        };

        const response = aiResponses[data.service] || aiResponses.other;
        
        // In a real application, this would send an actual email
        console.log('AI-Generated Email Response:', response);
        
        // Store email in localStorage for admin to see
        const emails = JSON.parse(localStorage.getItem('aiEmails') || '[]');
        emails.push({
            to: data.email,
            subject: `Re: ${data.subject}`,
            content: response,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('aiEmails', JSON.stringify(emails));
    }
}

// Initialize Contact Form
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
});