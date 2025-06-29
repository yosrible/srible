<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#ffffff">
  <meta name="HandheldFriendly" content="true">
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
  
  // Reactive statement to check if current route should hide navbar/footer
  $: isDashboardRoute = $page?.url?.pathname?.startsWith('/dashboard') || false;
  
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

{#if !useMinimalLayout && !isDashboardRoute}
  <Navbar />
{/if}

<main class="content" class:minimal-layout={useMinimalLayout} class:dashboard-layout={isDashboardRoute}>
  <slot />
</main>

{#if !useMinimalLayout && !isDashboardRoute}
  <Footer />
{/if}

<style>
  /* Content container */
  .content {
    flex: 1;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* Dashboard specific overrides */
  :global(body.dashboard-mode) {
    background: #f8f8f5;
  }

  :global(body.dashboard-mode .content) {
    padding-top: 0;
  }

  /* Minimal layout styles */
  :global(html.minimal-layout) {
    height: 100%;
  }
  
  :global(html.minimal-layout body) {
    min-height: 100%;
  }
  
  /* Mobile menu styles */
  @media (max-width: 768px) {
    .content:not(.dashboard-layout) {
      padding-top: 70px;
    }
  }
</style>