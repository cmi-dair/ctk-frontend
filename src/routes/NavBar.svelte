<script>
  import {
    DarkMode,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Navbar,
  } from "flowbite-svelte";
</script>

<div id="nav-bar">
  <Navbar>
    <NavBrand href="/">Clinican Toolkit</NavBrand>
    <NavUl>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/summarization">Summarization</NavLi>
      <NavLi href="/contact">Placeholder</NavLi>
      <NavLi href="/placeholder">Placeholder</NavLi>
    </NavUl>
    <DarkMode />
    <NavHamburger />
  </Navbar>
</div>
