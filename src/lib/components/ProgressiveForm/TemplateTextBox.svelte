<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { Textarea, Toolbar, ToolbarButton } from "flowbite-svelte"
  import { CopySolid } from "flowbite-svelte-icons"
  import { diagnosisText } from "./componentStore"

  let triggerCopyToast = false
  function onCopyButtonClick(text: string) {
    triggerCopyToast = true
    return () => {
      navigator.clipboard.writeText(text)
    }
  }
</script>

{#if $diagnosisText}
  <Textarea disabled rows="10" value={$diagnosisText}>
    <Toolbar slot="header" embedded color="gray">
      <b>Template Text</b>
      <ToolbarButton name="copy" slot="end" on:click={onCopyButtonClick($diagnosisText)}
        ><div class="flex align-middle"><CopySolid disabled />Copy</div></ToolbarButton
      >
    </Toolbar>
  </Textarea>
{/if}

<Toast bind:open={triggerCopyToast} message="Copied to clipboard" type="success" />
