/* -------------------------------------------------------------
   DE ORB | MAIN JAVASCRIPT LOGIC & EMAIL REDIRECTS
   ------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  
  // Header scroll detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Direct Email Redirect for Briefing / Demo Requests
  window.openEmailBriefing = function(event) {
    if (event) event.preventDefault();
    const email = "info@de-orb.com";
    const subject = encodeURIComponent("DE ORB — Executive Briefing / Demo Request");
    const body = encodeURIComponent("Hello DE ORB Team,\n\nI would like to request an executive briefing and demonstration of the DE ORB Sovereign Counter-Drone Intelligence Platform.\n\nOrganization:\nDeployment Requirements:\n\nBest regards,");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
