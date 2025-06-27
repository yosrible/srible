<script lang="ts">
  export let title: string;
  export let subtitle: string = '';
</script>

<div class="section-header">
  <h2 class="section-title gradient-text">
    {title}
  </h2>
  {#if subtitle}
    <p class="section-subtitle">
      {subtitle}
    </p>
  {/if}
</div>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      filter: blur(5px);
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  .section-header {
    margin-bottom: 2.5rem;
    text-align: center;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  
  .section-title {
    display: inline-block;
    font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 1rem 0;
    line-height: 1.1;
    background: linear-gradient(90deg, #000 0%, #222 25%, #555 50%, #222 75%, #000 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    filter: blur(5px);
    transform: translateY(10px);
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  }
  
  .section-subtitle {
    font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 400;
    color: var(--color-text-light, #666);
    margin: 0 auto;
    max-width: min(90%, 600px);
    line-height: 1.6;
    opacity: 0;
    filter: blur(5px);
    transform: translateY(10px);
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
  }
  
  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .section-title,
    .section-subtitle {
      animation: none !important;
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .section-header {
      margin-bottom: 2rem;
      padding: 0 1rem;
    }
    
    .section-title {
      font-size: 1.75rem;
      margin-bottom: 0.75rem;
    }
    
    .section-subtitle {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
  
  /* Small mobile devices */
  @media (max-width: 480px) {
    .section-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .section-subtitle {
      font-size: 0.9375rem;
    }
  }
</style>
