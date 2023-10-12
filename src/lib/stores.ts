import type { Writable } from "svelte/store"
import { writable } from "svelte/store"
import type { TreeNode } from "./utils"

export const diagnosesTree: Writable<TreeNode[]> = writable()
export const anonymizedReport = writable(Promise.resolve(""))
export const summarizedReport = writable(Promise.resolve(""))
