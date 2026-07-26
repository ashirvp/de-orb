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

  // Mobile navigation toggle
  const navToggles = document.querySelectorAll('.nav-toggle');
  navToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });
  });

  // Scroll-in-view animation for sections
  const allSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });
  allSections.forEach(sec => observer.observe(sec));

});
