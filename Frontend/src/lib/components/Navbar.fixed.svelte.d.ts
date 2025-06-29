// Type definitions for Navbar component
declare module '$lib/components/Navbar.fixed.svelte' {
  import type { SvelteComponentTyped } from 'svelte';
  
  interface NavbarProps {
    // Add any props your Navbar component accepts here
    // Example:
    // transparent?: boolean;
    // fixed?: boolean;
  }
  
  export default class Navbar extends SvelteComponentTyped<NavbarProps> {}
}
