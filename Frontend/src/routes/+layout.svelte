<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
</svelte:head>

<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.fixed.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  // Define routes where navbar and footer should be hidden
  const minimalLayoutRoutes = ['/error'];
  
  // Initialize with default values
  let useMinimalLayout = false;
  
  // Check if we're on an error page or have error page markers
  if (typeof window !== 'undefined') {
    const isErrorPage = window.location.pathname.startsWith('/error') || 
                       window.location.pathname === '/404' ||
                       document.documentElement.classList.contains('error-page') ||
                       document.documentElement.dataset.layout === 'minimal';
    
    if (isErrorPage) {
      useMinimalLayout = true;
      // Add a class to body to handle error page specific styles
      document.body.classList.add('error-page-active');
    }
  }
  
  // Update layout based on route changes
  $: if (typeof window !== 'undefined') {
    try {
      // Check if current route should use minimal layout
      const isErrorRoute = minimalLayoutRoutes.some(route => 
        $page?.url?.pathname?.startsWith(route) || 
        $page?.url?.pathname?.includes('404') ||
        $page?.status >= 400 ||
        document.documentElement.dataset.layout === 'minimal' ||
        document.documentElement.classList.contains('error-page')
      );
      
      useMinimalLayout = isErrorRoute;
      
      // Add/remove class based on layout
      if (isErrorRoute) {
        document.documentElement.classList.add('minimal-layout');
        document.documentElement.dataset.layout = 'minimal';
        document.body.classList.add('error-page-active');
      } else {
        document.documentElement.classList.remove('minimal-layout');
        document.body.classList.remove('error-page-active');
        delete document.documentElement.dataset.layout;
      }
    } catch (e) {
      console.error('Error in layout subscription:', e);
      useMinimalLayout = true;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('minimal-layout');
        document.documentElement.dataset.layout = 'minimal';
        document.body.classList.add('error-page-active');
      }
    }
  }
  
  onMount(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('hydrated');
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('minimal-layout');
      }
    };
  });
  
  // Import Vercel Analytics
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  
  // Inject analytics
  injectAnalytics();
</script>

{#if !useMinimalLayout}
  <Navbar />
{/if}

<main class="content" class:minimal-layout={useMinimalLayout}>
  <slot />
</main>

{#if !useMinimalLayout}
  <Footer />
{/if}

<style>
  /* Global styles */
  :global(html) {
    scroll-behavior: smooth;
    font-size: 16px;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    background: #f8f8f5;
    color: #000000;
    font-family: Inter, Arial, sans-serif;
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
  }

  /* Minimal layout styles */
  :global(html.minimal-layout) {
    height: 100%;
  }
  
  :global(html.minimal-layout body) {
    min-height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  
  :global(.content.minimal-layout) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
  
  :global(html.minimal-layout #svelte) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    width: 100%;
    padding-top: 80px; /* Space for fixed navbar */
    position: relative;
    z-index: 1;
    opacity: 1 !important;
    visibility: visible !important;
    will-change: transform;
    backface-visibility: hidden;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  /* Content styles */

  /* Prevent scroll when menu is open */
  :global(body.menu-open) {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    .content {
      padding-top: 70px;
    }
  }
</style>