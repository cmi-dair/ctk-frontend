<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { Textarea, Toolbar, ToolbarButton, ToolbarGroup } from "flowbite-svelte"
  import { CopySolid, FileCheckSolid } from "flowbite-svelte-icons"
  import { createEventDispatcher } from "svelte"

  export let text = ""

  const dispatch = createEventDispatcher()

  let triggerCopyToast = false
  function onCopyButtonClick(text: string) {
    triggerCopyToast = true
    return () => {
      navigator.clipboard.writeText(text)
    }
  }
</script>

<Textarea disabled rows="10" value={text}>
  <Toolbar slot="header" embedded color="gray">
    <b>Template Text</b>
    <ToolbarGroup name="controls" slot="end">
      <ToolbarButton name="save" on:click={() => dispatch("save")}>
        <div class="flex align-middle"><FileCheckSolid disabled />Save</div>
      </ToolbarButton>
      <ToolbarButton name="copy" on:click={onCopyButtonClick(text)}
        ><div class="flex align-middle"><CopySolid disabled />Copy</div></ToolbarButton
      >
    </ToolbarGroup>
  </Toolbar>
</Textarea>

<Toast bind:open={triggerCopyToast} message="Copied to clipboard" type="success" />
