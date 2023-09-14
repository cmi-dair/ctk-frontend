<script lang="ts">
  import { DarkMode, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from "flowbite-svelte"

  let divClass = "w-full ml-auto md:block md:w-auto order-1 md:order-none"
  let ulClass = "flex flex-col my-4 md:flex-row md:my-0 text-sm font-medium text-gray-900 dark:text-gray-300 gap-4"
</script>

<header
  class="sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
>
  <Navbar
    color="default"
    fluid
    navClass="flex items-center justify-between w-full mx-auto py-1.5 px-4"
    let:toggle
    let:hidden
  >
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white">
        Clinican Toolkit
      </span>
    </NavBrand>

    <NavUl
      {divClass}
      {ulClass}
      {hidden}
      on:click={() => setTimeout(toggle, 1)}
      nonActiveClass="md:!pl-3 md:!py-2 md:!pl-0 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:text-white md:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      activeClass="md:!pl-3 md:!py-2 md:!pl-0 text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-primary-700 dark:bg-primary-600 md:dark:bg-transparent cursor-default"
    >
      <NavLi href="/">Home</NavLi>
      <NavLi href="/summarization">Summarization</NavLi>
    </NavUl>

    <div class="flex items-center ml-auto">
      <DarkMode size="lg" class="inline-block dark:hover:text-white hover:text-gray-900" />
      <NavHamburger on:click={toggle} />
    </div>
  </Navbar>
</header>
