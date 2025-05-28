/**
 * Main JavaScript for Community Connect Wellbeing
 * Handles navigation highlighting and basic interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('nav a').forEach(link => {
    const linkHref = link.getAttribute('href');
    // Remove any query parameters or hashes for comparison
    const cleanLinkHref = linkHref.split('?')[0].split('#')[0];
    
    if (currentPage === cleanLinkHref || 
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Add loading state
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      
      // If using Netlify Forms, the form will be handled automatically
      // This is just for visual feedback
    });
  });

  // Add animation classes when elements come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        element.classList.add('animate');
      }
    });
  };

  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Simple form validation
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
      
      // Email validation
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('error');
        isValid = false;
      }
    }
  });
  
  return isValid;
}

// Add error class to invalid form fields on blur
document.addEventListener('blur', function(e) {
  if (e.target.hasAttribute('required') && !e.target.value.trim()) {
    e.target.classList.add('error');
  } else if (e.target.type === 'email' && e.target.value && 
             !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
    e.target.classList.add('error');
  } else {
    e.target.classList.remove('error');
  }
}, true);
