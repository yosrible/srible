<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let count = 0;
  const targetCount = 112;
  const duration = 2000; // Animation duration in ms
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  
  onMount(() => {
    // Animation is handled by CSS
    const animateCount = () => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        count = Math.min(Math.floor(easeOutQuad(frame / totalFrames) * targetCount), targetCount);
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };
    
    // Start animation when component mounts
    const timer = setTimeout(animateCount, 500); // Small delay to ensure smooth animation
    
    // Easing function for smooth animation
    function easeOutQuad(t: number): number {
      return t * (2 - t);
    }
    
    return () => {
      clearTimeout(timer);
    };
  });
</script>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <h1 in:fade={{ duration: 800 }}>
          Write freely.
          <span class="gradient-text">Share beautifully.</span>
        </h1>
        <p class="subtitle">
          A minimal blogging platform that stays out of your way. Focus on your words, we'll handle the rest.
        </p>
        <div class="badge-container">
          <div class="product-hunt-badge">
            <a href="https://www.producthunt.com/products/srible?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-srible" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=984996&theme=light&t=1751089449700" 
                alt="Srible - Minimal blogging site | Product Hunt" 
                width="200" 
                height="auto" 
              />
            </a>
          </div>
          <div class="github-badge">
            <a href="https://github.com/yosrible/srible" target="_blank" rel="noopener noreferrer" class="github-button">
              <svg class="github-logo" height="20" viewBox="0 0 16 16" width="20" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>Star on GitHub</span>
              <svg class="star-icon" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="waitlist-count">
          <span class="green-dot"></span>
          <span class="count-text">Over <strong>{count}+</strong> people have joined the waitlist</span>
        </div>
        <div class="cta-buttons">
          <a href="/signup" class="btn primary">Create a Blog <span class="arrow">→</span></a>
          <a href="#features" class="btn secondary">Discover</a>
        </div>
      </div>
      <div class="hero-visual">
        <!-- Editor content removed -->
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cal+Sans:wght@600&family=Inter:wght@400;500;600&display=swap');
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  :global(:root) {
    --font-primary: 'Cal Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --color-text: #1a1a1a;
    --color-text-light: #666;
    --color-primary: #000;
    --color-bg: #fff;
    --color-border: #eaeaea;
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 2rem;
    --space-lg: 4rem;
    --space-xl: 6rem;
    --radius: 8px;
    --transition: all 0.2s ease;
  }

  .hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #ffffff;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: 0 0;
    flex: 1;
    isolation: isolate;
  }

  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.5rem;
    padding: 1rem 0;
    box-sizing: border-box;
  }

  .hero-text {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-family: var(--font-primary);
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 600;
    margin: 0 0 var(--space-sm) 0;
    line-height: 1.1;
    letter-spacing: -0.5px;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 0.2s forwards;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gradient-text {
    display: inline-block;
    font-family: var(--font-primary);
    font-weight: 600;
    letter-spacing: -0.01em;
    background: linear-gradient(90deg, #000 0%, #222 25%, #555 50%, #222 75%, #000 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    filter: blur(5px);
    transform: translateY(10px);
    animation: fadeInUp 0.8s ease-out 0.4s forwards, gradientShift 8s ease-in-out infinite;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    h1, .gradient-text, .subtitle, .cta-buttons {
      animation: none !important;
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }

  @keyframes gradientShift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

  .btn.primary:hover .arrow {
    transform: translateX(4px);
  }

  .badge-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 1rem 0;
    width: 100%;
  }

  .product-hunt-badge,
  .github-badge {
    transition: transform 0.2s ease;
    width: 100%;
    max-width: 200px;
    display: flex;
    justify-content: center;
  }

  .product-hunt-badge {
    margin-bottom: 0.5rem;
  }

  .product-hunt-badge a,
  .github-badge a {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .product-hunt-badge img {
    width: 100%;
    height: auto;
    max-width: 200px;
  }

  .github-badge a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #1a1a1a;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }

  @media (min-width: 480px) {
    .badge-container {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .product-hunt-badge,
    .github-badge {
      width: auto;
      margin: 0;
    }
  }

  .product-hunt-badge:hover,
  .github-badge:hover {
    transform: translateY(-2px);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: var(--font-secondary);
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: 1px solid transparent;
  }

  .github-badge a:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .github-badge a:active {
    transform: translateY(0);
  }

  .github-badge a:hover .star-icon {
    fill: #ffd700;
  }

  .github-badge .github-logo {
    fill: white;
    height: 1.2rem;
    width: 1.2rem;
    transition: transform 0.2s ease;
  }

  .github-badge .star-icon {
    fill: #aaa;
    height: 1rem;
    width: 1rem;
    margin-left: 0.25rem;
    transition: all 0.2s ease;
  }

  .btn.secondary {
    background-color: #f8f8f8;
    color: var(--color-text);
    border: 1px solid #e0e0e0;
    font-family: var(--font-secondary);
    font-weight: 500;
    font-size: 0.9rem;
    padding: 0.6rem 1.25rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  .btn.secondary:hover {
    background: #f0f0f0;
    border-color: #d0d0d0;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  }
  
  .btn.secondary:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .hero-visual {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    background: white;
    border: 1px solid var(--color-border);
  }

  /* Editor window styles removed as they're not being used */

  .subtitle {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    font-size: 0.9375rem; /* 15px */
    color: var(--color-text-light);
    margin: 0 auto 1.5rem auto;
    max-width: 32rem; /* 512px */
    line-height: 1.6;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 0.5s forwards;
    box-sizing: border-box;
    padding: 0 1rem;
    text-align: center;
    width: 100%;
  }

  .product-hunt-badge {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    animation: float 6s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    will-change: transform;
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0.5deg);
    }
    50% {
      transform: translateY(-5px) rotate(-0.5deg);
    }
    100% {
      transform: translateY(0) rotate(0.5deg);
    }
  }

  
  .product-hunt-badge:hover {
    animation-play-state: paused;
    transform: scale(1.05) translateY(-2px);
    filter: drop-shadow(0 5px 12px rgba(0, 0, 0, 0.1));
  }
  
  .product-hunt-badge:active {
    transform: scale(0.98) translateY(0);
  }
  
  .product-hunt-badge a {
    display: inline-block;
    line-height: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

.waitlist-count {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1.5rem 0;
    color: var(--color-text-light);
    font-size: 0.95rem;
  }

  .green-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .waitlist-count strong {
    color: var(--color-text);
    font-weight: 600;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    margin: 1.5rem auto 0;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .btn {
    min-width: 180px;
  }

  /* Mobile (up to 767px) */
  @media (max-width: 767px) {
    .hero {
      min-height: 100vh;
      min-height: 100dvh;
      padding: 3rem 1rem 2rem;
      overflow-x: hidden;
    }

    .hero-content {
      gap: 1rem;
      padding: 0.5rem 0;
      width: 100%;
      box-sizing: border-box;
    }

    h1 {
      font-size: 2.25rem;
      margin-bottom: 1rem;
      line-height: 1.2;
      padding: 0 0.5rem;
    }

    .subtitle {
      font-size: 1rem;
      line-height: 1.5;
      padding: 0 0.5rem;
      margin: 0 auto 1.5rem auto;
      max-width: 90%;
    }

    .cta-buttons {
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      max-width: 300px;
      margin: 1.5rem auto 0;
      padding: 0;
      box-sizing: border-box;
    }

    .btn {
      width: 100%;
      justify-content: center;
      margin: 0;
    }
  }

  /* Small Tablets (600px - 767px) */
  @media (min-width: 600px) and (max-width: 767px) {
    .hero {
      padding: 4rem 2rem 2rem;
    }

    .hero-content {
      max-width: 90%;
      margin: 0 auto;
    }

    h1 {
      font-size: 2.75rem;
      line-height: 1.2;
      margin: 0 0 1.25rem 0;
    }

    .subtitle {
      font-size: 1.1rem;
      max-width: 80%;
      margin: 0 auto 2rem auto;
      line-height: 1.6;
    }
  }

  /* Large Desktops (1025px - 1280px) */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .hero {
      min-height: 100vh;
      min-height: 100dvh;
      padding: 6rem 2rem 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
    }

    .hero-content {
      min-height: 0;
      width: 100%;
      max-width: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--space-md);
      padding: 1rem 0;
      box-sizing: border-box;
      flex: 0 0 auto;
    }

    h1 {
      font-size: 3.25rem;
      line-height: 1.2;
      margin: 0 0 1.75rem 0;
      padding: 0 2rem;
      text-align: center;
      width: 100%;
    }

    .subtitle {
      font-size: 1.2rem;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto 2.5rem auto;
      padding: 0 2rem;
      text-align: center;
    }

    .cta-buttons {
      margin: 0 auto;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      padding: 0 2rem;
      width: 100%;
      max-width: 500px;
    }

    .btn {
      min-width: 180px;
      margin: 0.5rem;
      padding: 1rem 2rem;
    }

    .btn {
      padding: 0.9rem 2rem;
      font-size: 1.1rem;
    }
  }

  /* Mobile Devices (up to 480px) */
  @media (max-width: 480px) {
    .hero {
      padding: 3rem 1rem 2rem;
    }

    h1 {
      font-size: 2.25rem;
      margin-bottom: 1rem;
      line-height: 1.2;
      padding: 0 0.5rem;
    }

    .subtitle {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0 auto 1.5rem;
      max-width: 90%;
    }

    .cta-buttons {
      max-width: 300px;
      margin: 1.5rem auto 0;
      padding: 0;
    }
    
    .btn {
      width: 100%;
      padding: 0.75rem 1.5rem;
      margin: 0 0 1rem 0;
      justify-content: center;
    }
  }

  /* Landscape mode optimization */
  @media (max-height: 500px) and (orientation: landscape) {
    .hero {
      min-height: auto;
      padding: 4rem 1rem 1.5rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    .subtitle {
      font-size: 1rem;
      margin: 0 auto 1.25rem;
      max-width: 90%;
    }

    .cta-buttons {
      margin-top: 1rem;
    }
  }

  
  /* Fix for very small mobile devices */
  @media (max-width: 360px) {
    h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 0.9375rem;
    }
    
    .btn {
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
    }
  }
</style>
