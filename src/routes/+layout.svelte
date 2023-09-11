<script>
  import "../app.postcss";
  import Footer from "./Footer.svelte";
  import NavBar from "./NavBar.svelte";
</script>

<div class="app dark:bg-gray-900 dark:text-white">
  <NavBar />
  <main>
    <slot />
    <Footer />
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
