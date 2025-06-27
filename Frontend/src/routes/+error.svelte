<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Initialize with default values
  let status = 500;
  let errorMessage = 'An unexpected error occurred';
  
  // Set the page to use minimal layout
  onMount(() => {
    if (browser) {
      // Add classes to ensure minimal layout
      document.documentElement.classList.add('minimal-layout', 'error-page');
      document.title = status === 404 ? 'Page Not Found | Srible' : 'Error | Srible';
      
      // Force minimal layout by adding a data attribute
      document.documentElement.dataset.layout = 'minimal';
      
      return () => {
        document.documentElement.classList.remove('minimal-layout', 'error-page');
        delete document.documentElement.dataset.layout;
      };
    }
  });
  
  // Update status and message based on URL params if available
  if (browser) {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    const statusParam = params.get('status');
    
    if (statusParam) {
      const parsedStatus = parseInt(statusParam, 10);
      if (!isNaN(parsedStatus)) {
        status = parsedStatus;
      }
    }
    
    if (errorParam) {
      errorMessage = decodeURIComponent(errorParam);
    } else if (status === 404) {
      errorMessage = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    }
  }
  
  // Set the page title and body class
  onMount(() => {
    if (browser) {
      document.title = status === 404 ? 'Page Not Found | Srible' : 'Error | Srible';
      document.documentElement.classList.add('error-page');
    }
    
    return () => {
      if (browser) {
        document.documentElement.classList.remove('error-page');
      }
    };
  });
  
  // Function to go back to the previous page
  function goBack() {
    window.history.back();
  }
  
  // Function to go to the home page
  function goHome() {
    window.location.href = '/';
  }
</script>

<svelte:head>
  <style>
    :global(html.error-page) {
      height: 100%;
    }
    :global(body.error-page) {
      min-height: 100vh;
      margin: 0;
      display: flex;
      flex-direction: column;
    }
  </style>
</svelte:head>

<main class="error-container">
  <div class="error-content">
    <div class="error-code">
      {status}
    </div>
    <h1 class="error-title">
      {status === 404 ? 'Page Not Found' : 'Something went wrong'}
    </h1>
    <p class="error-message">
      {errorMessage}
    </p>
    <div class="error-actions">
      <button on:click={goBack} class="btn secondary">
        Go Back
      </button>
      <button on:click={goHome} class="btn primary">
        Go to Homepage
      </button>
    </div>
  </div>
</main>

<style>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 2rem;
    background-color: #ffffff;
    text-align: center;
    margin: 0;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow-y: auto;
  }
  
  /* Only apply these styles when on error page */
  :global(body.error-page-active) {
    height: 100%;
    overflow: hidden;
  }
  
  :global(body.error-page-active #svelte) {
    height: 100%;
    overflow: hidden;
  }
  
  .error-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .error-code {
    font-size: 8rem;
    font-weight: 800;
    color: #f0f0f0;
    line-height: 1;
    margin-bottom: 1rem;
    font-family: sans-serif;
  }
  
  .error-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
  }
  
  .error-message {
    font-size: 1.125rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    border: 1px solid transparent;
  }
  
  .btn.primary {
    background-color: #000000;
    color: #ffffff;
  }
  
  .btn.primary:hover {
    background-color: #333333;
  }
  
  .btn.secondary {
    background-color: #ffffff;
    color: #000000;
    border-color: #e0e0e0;
  }
  
  .btn.secondary:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: 640px) {
    .error-code {
      font-size: 6rem;
    }
    
    .error-title {
      font-size: 2rem;
    }
    
    .error-message {
      font-size: 1rem;
    }
    
    .error-actions {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>
