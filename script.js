/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
 
 // Initialize Isotope
document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
  // Initialize isotope on the container
  let iso = new Isotope(isotopeItem.querySelector('.isotope-container'), {
      itemSelector: '.portfolio-item',
      layoutMode: 'masonry',
      filter: '*',
      sortBy: 'original-order'
  });

  // Attach event listeners for filter buttons
  isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterItem) {
      filterItem.addEventListener('click', function () {
          // Remove the active class from all filter buttons
          isotopeItem.querySelector('.filter-active').classList.remove('filter-active');
          // Add the active class to the clicked filter button
          this.classList.add('filter-active');
          // Filter the isotope items based on the clicked filter button
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });
      });
  });

  // Function to expand and collapse box content
  function toggleContent(box) {
      const content = box.querySelector('.content');
      const isVisible = content.style.display === 'block';

      if (isVisible) {
          content.style.display = 'none'; // Collapse the content
      } else {
          content.style.display = 'block'; // Expand the content
      }

      // Recalculate Isotope layout after toggling content
      iso.layout();
  }

  // Add event listeners for "read more" and "close" buttons
  document.querySelectorAll('.portfolio-item .box').forEach(function (box) {
      box.querySelector('p').addEventListener('click', function () {
          toggleContent(box); // Expand content when "Click to read more" is clicked
      });

      box.querySelector('.close-content').addEventListener('click', function () {
          toggleContent(box); // Collapse content when "Close" is clicked
      });
  });
});

 

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });
  /**Contact page */
  // Function to show contact info
  document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the contact info visibility and box size
    function info(boxId) {
        const box = document.getElementById(boxId);
        const info = box.querySelector('.contact-info');
        const arrow = box.querySelector('.expand-arrow');

        // Toggle contact info visibility
        if (info.style.display === 'block') {
            info.style.display = 'none';
            box.style.width = '200px'; // Reset width
            arrow.style.transform = 'rotate(0deg)'; // Rotate arrow back
        } else {
            info.style.display = 'block';
            box.style.width = '300px'; // Increase width (adjustable as needed)
            arrow.style.transform = 'rotate(90deg)'; // Rotate arrow to indicate expanded state
        }
    }



    document.getElementById('enquiryForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission until validation
  
      // Form validation flag
      let valid = true;
  
      // Grab input fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');
  
      // Reset all errors before validation
      document.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');
      document.querySelectorAll('.form-group input, .form-group textarea').forEach(e => e.classList.remove('error'));
  
      // Validate Name field
      if (name.value.trim() === '') {
          valid = false;
          name.classList.add('error');
          document.getElementById('name-error').style.display = 'block';
      }
  
      // Validate Email field (basic regex pattern)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
          valid = false;
          email.classList.add('error');
          document.getElementById('email-error').style.display = 'block';
      }
  
      // Validate Phone field (basic 10-digit number)
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone.value.trim())) {
          valid = false;
          phone.classList.add('error');
          document.getElementById('phone-error').style.display = 'block';
      }
  
      // Validate Message field
      if (message.value.trim() === '') {
          valid = false;
          message.classList.add('error');
          document.getElementById('message-error').style.display = 'block';
      }
  
      if (valid) {
          // Allow form submission to Web3Forms API if validation passes
          this.submit();  // Submit the form
  
          // Optionally show a success message and reset form fields after submission
          document.getElementById('success-message').style.display = 'block';
          setTimeout(() => {
              document.getElementById('success-message').style.display = 'none';
              name.value = '';
              email.value = '';
              phone.value = '';
              message.value = '';
          }, 3000);
      } else {
          // If validation fails, show submission error
          document.getElementById('submission-error').style.display = 'block';
          setTimeout(() => {
              document.getElementById('submission-error').style.display = 'none';
          }, 3000);
      }
  });
  
    // Get all arrow elements and attach the event listeners
    const phoneArrow = document.querySelector('#phone-box .expand-arrow');
    const emailArrow = document.querySelector('#email-box .expand-arrow');
    const linkedinArrow = document.querySelector('#linkedin-box .expand-arrow');
    const addressArrow = document.querySelector('#address-box .expand-arrow');

    // Attach the event listeners to call the 'info' function
    phoneArrow.addEventListener('click', function() {
        info('phone-box');
    });

    emailArrow.addEventListener('click', function() {
        info('email-box');
    });

    linkedinArrow.addEventListener('click', function() {
        info('linkedin-box');
    });
    addressArrow.addEventListener('click', function() {
      info('address-box');
  });
});

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
