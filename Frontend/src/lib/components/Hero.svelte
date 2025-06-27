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
          <span class="gradient-text">Your Space.</span>
        </h1>
        <p class="subtitle">
          A clean, minimal space for your thoughts. No distractions, just writing.
        </p>
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
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: 0 0;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    
    @media (min-width: 768px) {
      min-height: 90vh;
      padding: var(--space-xl) 0;
    }
    
    @media (max-width: 480px) {
      min-height: 100vh;
      padding: 0;
      display: flex;
      align-items: center;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    box-sizing: border-box;
    
    @media (min-width: 768px) {
      padding: 0 max(1rem, 5%);
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--space-md);
    padding: 2rem 0;
    
    @media (min-width: 768px) {
      justify-content: flex-start;
      padding: 6rem 0 4rem;
    }
    
    @media (max-width: 480px) {
      min-height: calc(100vh - 80px);
      padding: 4rem 0 2rem;
      justify-content: center;
      gap: var(--space-md);
    }
  }

  .hero-text {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 var(--space-sm);
    width: 100%;
    
    @media (min-width: 768px) {
      padding: 0;
    }
    
    @media (max-width: 480px) {
      padding: 0 var(--space-xs);
    }
  }

  h1 {
    font-family: var(--font-primary);
    font-size: clamp(3rem, 9vw, 4.5rem);
    font-weight: 600;
    margin: 0 0 var(--space-xs) 0;
    line-height: 1.1;
    letter-spacing: -0.5px;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 0.2s forwards;
    
    @media (max-width: 768px) {
      font-size: clamp(2.75rem, 9vw, 4rem);
      line-height: 1.15;
    }
    
    @media (max-width: 480px) {
      font-size: clamp(2.5rem, 10vw, 3.5rem);
      margin-bottom: 0.5rem;
      line-height: 1.15;
      letter-spacing: -0.03em;
    }
    
    @media (max-width: 360px) {
      font-size: 2.5rem;
    }
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
    
    @media (max-width: 480px) {
      display: block;
      margin-top: 0.25rem;
    }
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

  .btn.primary {
    position: relative;
    background-color: var(--color-primary);
    color: white;
    overflow: hidden;
    z-index: 1;
    transition: all 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000000, #333333);
      z-index: -1;
      transition: opacity 0.3s ease;
      opacity: 1;
      border-radius: var(--radius);
    }
    
    &:hover::before {
      opacity: 0.9;
    }
    
    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
    }
    border-color: var(--color-primary);
  }

  .btn.primary .arrow {
    position: relative;
    right: 0;
    transition: transform 0.3s ease;
  }

  .btn.primary:hover .arrow {
    transform: translateX(4px);
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
    font-size: 1.25rem;
    color: var(--color-text-light);
    margin: 0 auto var(--space-md) auto;
    max-width: 600px;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 0.5s forwards;
    
    @media (max-width: 992px) {
      font-size: 1.1rem;
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      font-size: 1.05rem;
      text-align: center;
      margin: 0 auto var(--space-md) auto;
      max-width: 90%;
      line-height: 1.5;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 0 1rem;
      line-height: 1.5;
      margin-bottom: 1.25rem;
      max-width: 100%;
    }
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
    gap: 1.5rem;
    margin-top: 2.5rem;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 0.6s forwards;
    
    @media (max-width: 480px) {
      gap: 0.75rem;
      padding: 0 1rem;
      gap: 1.5rem;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
      
      @media (min-width: 480px) {
        width: auto;
        min-width: 160px;
        padding: 0.75rem 1.5rem;
      }
    }
  }

  @media (max-width: 1024px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    h1 {
      font-size: 3rem;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: var(--space-lg) 0;
      min-height: 60vh;
    }

    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.125rem;
      margin-bottom: var(--space-md);
    }


    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 300px;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }

    .hero {
      padding: 1rem 0;
    }

    .subtitle {
      font-size: 1rem;
    }

    .btn {
      width: 100%;
      padding: 0.75rem 1.5rem;
    }
  }

  /* Typing container styles removed as they're not being used */

  /* Landscape mode optimization */
  @media (max-height: 500px) and (orientation: landscape) {
    .hero {
      min-height: auto;
      padding: 5rem 1rem 1.5rem;
    }

    h1 {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      margin-bottom: 0.75rem;
    }

    .subtitle {
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
      max-width: 80%;
    }
  }
</style>
