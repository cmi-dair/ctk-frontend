<!--
The layout component for the application.

@slot - The content to be displayed in the main section of the layout.
-->
<script>
  import NavBar from "$lib/components/NavBar.svelte"
  import "../app.postcss"
</script>

<div class="app bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 antialiased">
  <NavBar />
  <main class="pt-5 w-full">
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1;
    max-width: 85%;
    margin: 0 auto;
  }
</style>
