<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  
  // State
  let isScrolled = false;
  let isMenuOpen = false;
  let windowWidth = 0;

  // Computed properties
  $: isMobile = windowWidth <= 768;

  // Handle window scroll
  function handleScroll() {
    if (typeof window !== 'undefined') {
      isScrolled = window.scrollY > 50;
    }
  }
  
  // Check if current page is create page
  $: isCreatePage = $page?.url?.pathname === '/create';

  // Toggle mobile menu
  function toggleMenu(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Toggle the menu state
    isMenuOpen = !isMenuOpen;
    
    // Update the menu state in the DOM
    updateMenuState();
  }

  // Close mobile menu
  function closeMenu() {
    if (browser && (isMenuOpen || document.body.style.overflow === 'hidden')) {
      isMenuOpen = false;
      updateMenuState();
    }
  }

  // Update menu state in the DOM
  function updateMenuState() {
    const navLinks = document.querySelector<HTMLElement>('.nav-links');
    
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      
      if (navLinks) {
        navLinks.style.display = 'flex';
        navLinks.classList.add('active');
      }
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      
      if (navLinks) {
        navLinks.classList.remove('active');
        // Don't set display: none to prevent layout shifts
      }
    }
  }

  // Navigate to section with smooth scroll
  function navigateToSection(section: string) {
    closeMenu();

    if (browser && $page?.url?.pathname !== '/') {
      const url = section === 'faq' ? '/#faq' : `/#${section}`;
      goto(url);
    } else if (browser) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Handle window resize
  function handleResize() {
    if (browser) {
      windowWidth = window.innerWidth;
      if (windowWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    }
  }

  // Handle click outside to close menu
  function handleClickOutside(event: MouseEvent) {
    if (!isMenuOpen) return;
    
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.center-section');
    const toggleButton = document.querySelector('.menu-toggle');
    
    if (menu && !menu.contains(target) && toggleButton && !toggleButton.contains(target)) {
      closeMenu();
    }
  }

  // Component lifecycle
  onMount(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial states
    windowWidth = window.innerWidth;
    closeMenu();
    handleScroll();

    // Remove any duplicate navbars
    const navs = document.querySelectorAll('nav');
    if (navs.length > 1) {
      navs.forEach((nav, index) => index > 0 && nav.remove());
    }

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleClickOutside);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  });
</script>

<nav class:scrolled={isScrolled} style="opacity: 1; visibility: visible;">
  <div class="container">
    <div class="nav-content">
      <div class="left-section">
        <a href="/" class="logo" on:click={closeMenu}>
          <span class="logo-text">Srible</span>
        </a>
      </div>

      {#if !isCreatePage}
        <div class="center-section" class:active={isMenuOpen}>
          <div class="nav-links" role="navigation" aria-label="Main navigation" id="mobile-nav-links">
            <button class="nav-link" on:click={() => navigateToSection('why')}>Why Srible?</button>
            <button class="nav-link" on:click={() => navigateToSection('pricing')}>Pricing</button>
            <a href="/docs" class="nav-link" on:click={closeMenu}>Docs</a>
            <button class="nav-link" on:click={() => navigateToSection('faq')}>FAQ</button>
            
            {#if isMobile}
              <div class="mobile-buttons">
                <a href="/login" class="nav-link mobile-login" on:click={closeMenu}>Log in</a>
                <a href="/signup" class="nav-link mobile-signup" on:click={closeMenu}>
                  <span>Create a Blog</span>
                  <span class="arrow">→</span>
                </a>
              </div>
            {/if}
          </div>
        </div>

        <div class="right-section">
          {#if !isMobile}
            <a href="/login" class="nav-link login-btn">Log in</a>
            <a href="/signup" class="btn primary signup-btn">
              <span>Create a Blog</span>
              <span class="arrow">→</span>
            </a>
          {/if}
          <button 
            class="menu-toggle {isMenuOpen ? 'active' : ''}" 
            on:click={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-links"
          >
            <span class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Matter:wght@400;500&display=swap');

  nav {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    z-index: 1000 !important;
    background: #f9fafb !important;
    padding: 1rem 0 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.3s ease !important;
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .nav-content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    height: 100%;
  }
  
  .center-section {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2;
    width: 100%;
  }

  .left-section {
    display: flex;
    align-items: center;
    justify-self: flex-start;
    z-index: 2;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
  }



  .nav-link {
    background: none;
    border: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0;
    margin: 0 1rem;
    position: relative;
    transition: all 0.3s ease;
    text-decoration: none;
    font-family: 'Matter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: inline-block;
  }

  .nav-link:hover {
    color: #000;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: #000;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .nav-link:hover::after {
    transform: scaleX(1);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .right-section {
    display: flex;
    align-items: center;
    justify-self: flex-end;
    gap: 1.5rem;
    z-index: 2;
  }

  .login-btn {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .login-btn:hover {
    color: #000;
  }

  .signup-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #000;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    font-family: sans-serif;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
  }

  .signup-btn:hover {
    background: #333;
    transform: translateY(-1px);
  }

  .arrow {
    transition: transform 0.2s ease;
  }

  .signup-btn:hover .arrow {
    transform: translateX(2px);
  }

  .menu-toggle {
    display: none; /* Hide by default, show only on mobile */
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 1rem;
    z-index: 1001;
    margin-right: 0;
    margin-left: auto;
  }

  /* Hamburger menu styles moved to mobile media query */

  .mobile-buttons {
    display: none;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  .mobile-login,
  .mobile-signup {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1.5rem;
  }

  .mobile-signup {
    background: #000;
    color: white;
    border-radius: 6px;
    font-family: sans-serif;
    font-weight: 400;
  }

  @media (max-width: 1024px) {
    .nav-links {
      gap: 1.25rem;
    }
    
    .nav-link {
      margin: 0 0.5rem;
      padding: 0.5rem 0.25rem;
    }
    
    .right-section {
      gap: 1rem;
    }
    
    .menu-toggle {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      margin-left: 1rem;
      background: transparent;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      z-index: 1001;
      -webkit-tap-highlight-color: transparent;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    .menu-toggle:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-color: #3b82f6;
    }
    
    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 18px;
      position: relative;
      pointer-events: none;
      margin: 0 auto;
    }
    
    .hamburger span {
      display: block;
      width: 100%;
      height: 2px;
      background: #000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      will-change: transform, opacity;
      position: relative;
    }
    
    /* Active state - X icon */
    .menu-toggle.active .hamburger span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
      background: #000;
    }
    
    .menu-toggle.active .hamburger span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
      background: #000;
    }
    
    .menu-toggle.active .hamburger span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
      background: #000;
    }
  }

  /* Default desktop styles */
  @media (min-width: 769px) {
    .center-section {
      display: flex !important;
      position: static;
      transform: none !important;
      visibility: visible !important;
      opacity: 1 !important;
      width: auto;
      height: auto;
      background: transparent;
      box-shadow: none;
      padding: 0;
      margin: 0 2rem;
      justify-content: center;
      flex-grow: 1;
    }
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  
  .menu-toggle {
    display: none;
    visibility: hidden;
  }
  
  /* Reset mobile styles on desktop */
  @media (min-width: 769px) {
    .menu-toggle {
      display: none !important;
    }
    
    .nav-links {
      flex-direction: row !important;
      gap: 2rem;
      align-items: center;
    }
  }

  @media (max-width: 1024px) {
    .center-section {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
      padding: 6rem 2rem 2rem;
      overflow-y: auto;
      visibility: hidden;
      opacity: 0;
    }
    
    .center-section.active {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
      display: flex;
    }
  }
  
  @media (max-width: 900px) {
    .center-section {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
      padding: 6rem 2rem 2rem;
      overflow-y: auto;
      visibility: hidden;
      opacity: 0;
    }
    
    .center-section.active {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
      display: flex;
    }
    
    .nav-links {
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 400px;
      padding: 1rem 0;
    }
    
    .nav-link {
      width: 100%;
      padding: 0.75rem 0;
      font-size: 1.1rem;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
      margin: 0;
    }
    
    .mobile-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      margin-top: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    
    .mobile-login,
    .mobile-signup {
      width: 100%;
      padding: 0.75rem 1.5rem;
      text-align: center;
      border-radius: 6px;
      font-weight: 500;
    }
    
    .mobile-signup {
      background: #000;
      color: white;
    }
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 100%;
    }
    
    .nav-content {
      display: flex;
      justify-content: space-between;
      padding: 0;
      width: 100%;
    }
    
    .left-section {
      flex: 0 0 auto;
    }
    
    .right-section {
      margin-left: auto;
      flex: 0 0 auto;
    }

    .center-section {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
      padding: 6rem 2rem 2rem;
      overflow-y: auto;
      visibility: hidden;
      opacity: 0;
    }

    .center-section.active {
      transform: translateX(0);
      visibility: visible;
      opacity: 1;
      display: flex;
    }

    .nav-links {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      width: 100%;
      max-width: 400px;
      padding: 2rem 0;
      text-align: center;
    }
    
    .nav-link {
      width: 100%;
      padding: 1rem 0;
      font-size: 1.25rem;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .menu-toggle {
      display: flex;
      visibility: visible;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      margin-left: 0.5rem;
      position: relative;
      z-index: 1001;
      background: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    
    .menu-toggle {
      position: relative;
      width: 40px;
      height: 40px;
      padding: 0;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1001;
      -webkit-tap-highlight-color: transparent;
    }

    .hamburger {
      position: relative;
      width: 24px;
      height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .hamburger span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: #000;
      transition: all 0.3s ease;
      transform-origin: center;
    }
    
    /* X state when menu is open */
    .menu-toggle.active .hamburger span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .menu-toggle.active .hamburger span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    
    .menu-toggle.active .hamburger span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    .nav-link {
      font-size: 1.2rem;
      padding: 0.75rem 0;
      width: 100%;
      text-align: center;
    }

    .mobile-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(0,0,0,0.1);
    }

    .right-section {
      display: flex;
      align-items: center;
      margin-left: auto;
      order: 2;
    }
    
    .signup-btn,
    .login-btn {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }
  }
</style>
