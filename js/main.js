/**
 * Template Name: Style
 * Template URL: https://bootstrapmade.com/style-bootstrap-portfolio-template/
 * Updated: Jul 02 2025 with Bootstrap v5.3.7
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
    // Guard: if header is missing, nothing to do
    if (!selectHeader) return;
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
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

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
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

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
  if (selectTyped && typeof Typed !== 'undefined') {
    try {
      let typed_strings = selectTyped.getAttribute('data-typed-items') || '';
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    } catch (e) {
      console.warn('Typed initialization failed:', e);
    }
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    try { new PureCounter(); } catch (e) { console.warn('PureCounter init failed', e); }
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  if (typeof Waypoint !== 'undefined') {
    skillsAnimation.forEach((item) => {
      try {
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
      } catch (e) { console.warn('Waypoint init failed for item', e); }
    });
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    try {
      const glightbox = GLightbox({ selector: '.glightbox' });
    } catch (e) { console.warn('GLightbox init failed', e); }
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      try {
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          try {
            initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
              itemSelector: '.isotope-item',
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            });
          } catch (e) { console.warn('Isotope init failed', e); }
        });
      } catch (e) { console.warn('imagesLoaded/isotope error', e); }
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = null;
      try {
        const cfgEl = swiperElement.querySelector(".swiper-config");
        if (!cfgEl) throw new Error('swiper-config element not found');
        config = JSON.parse(cfgEl.innerHTML.trim());
      } catch (e) {
        console.warn('Skipping swiper init due to invalid config:', e);
        return;
      }

      try {
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (e) { console.warn('Swiper init failed', e); }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Theme Toggle Functionality
   */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const body = document.body;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon and save preference
    if (body.classList.contains('dark-mode')) {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });

  /**
   * Navigation Active State Management
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.right-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  window.addEventListener('load', updateActiveNavLink);

  /**
   * Project Filtering Functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === '*' || card.classList.contains(filter.substring(1))) {
            card.style.display = 'block';
            card.classList.remove('hidden');
          } else {
            card.style.display = 'none';
            card.classList.add('hidden');
          }
        });
      });
    });
  });

  /**
   * Certificate Carousel Functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.certificate-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active from thumbnails and indicators
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      thumbnails[index].classList.add('active');
      indicators[index].classList.add('active');
      
      currentSlide = index;
    }
    
    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }
    
    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Thumbnail clicks
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => showSlide(index));
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play (optional)
    setInterval(nextSlide, 8000);
  });

  /**
   * Skills Section Modal Functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (skillCategories.length === 0) return;

    // Skills data for modal content
    const skillsData = {
      'Programming Languages': {
        description: 'Core programming language that forms the foundation of my development stack, enabling me to build robust AI/ML applications and data science solutions.',
        tools: [
          { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
        ]
      },
      'AI/ML Frameworks': {
        description: 'Cutting-edge frameworks and libraries for building intelligent systems, from neural networks to computer vision applications.',
        tools: [
          { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
          { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
          { name: 'Scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
          { name: 'Hugging Face', logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
          { name: 'OpenCV', logo: 'https://opencv.org/wp-content/uploads/2022/05/logo.png' }
        ]
      },
      'Data Science & Analytics': {
        description: 'Comprehensive toolkit for data manipulation, analysis, and visualization to extract meaningful insights from complex datasets.',
        tools: [
          { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
          { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
          { name: 'Matplotlib', logo: 'https://matplotlib.org/stable/_static/logo_dark.svg' }
        ]
      },
      'Web Development': {
        description: 'Essential web technologies and modern frameworks for building responsive web applications and APIs.',
        tools: [
          { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
          { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
          { name: 'FastAPI', logo: 'https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png' },
          { name: 'Streamlit', logo: 'https://streamlit.io/images/brand/streamlit-mark-color.svg' }
        ]
      },
      'Cloud & DevOps': {
        description: 'Cloud platforms and DevOps tools for deploying, scaling, and maintaining applications in production environments.',
        tools: [
          { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
          { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
          { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
          { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
        ]
      },
      'Databases': {
        description: 'Relational databases for data storage and management in various applications.',
        tools: [
          { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
          { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
        ]
      }
    };

    // Create modal HTML
    const modalHTML = `
      <div class="skills-modal" id="skillsModal">
        <div class="modal-content">
          <button class="close-modal" id="closeModal">&times;</button>
          <div class="modal-header">
            <div class="modal-icon" id="modalIcon"></div>
            <h2 class="modal-title" id="modalTitle"></h2>
          </div>
          <p class="modal-description" id="modalDescription"></p>
          <div class="modal-tools-grid" id="modalToolsGrid"></div>
        </div>
      </div>
    `;

    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('skillsModal');
    const closeBtn = document.getElementById('closeModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalToolsGrid = document.getElementById('modalToolsGrid');

    // Add click event to each skill category
    skillCategories.forEach(category => {
      category.addEventListener('click', () => {
        const categoryTitle = category.querySelector('.category-header h3').textContent;
        const categoryIconClass = category.querySelector('.category-icon').className;
        const skillData = skillsData[categoryTitle];

        if (skillData) {
          // Set modal content
          modalIcon.className = categoryIconClass;
          modalTitle.textContent = categoryTitle;
          modalDescription.textContent = skillData.description;

          // Generate tools grid
          modalToolsGrid.innerHTML = '';
          skillData.tools.forEach((tool, index) => {
            const toolItem = document.createElement('div');
            toolItem.className = 'modal-tool-item';
            toolItem.style.animationDelay = `${(index + 1) * 0.1}s`;
            toolItem.innerHTML = `
              <img src="${tool.logo}" alt="${tool.name}" class="modal-tool-logo">
              <span class="modal-tool-name">${tool.name}</span>
            `;
            modalToolsGrid.appendChild(toolItem);
          });

          // Show modal
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close modal functionality
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });
  });

})();