import type { DecisionTree } from "$lib/utils"
import type { Writable } from "svelte/store"
import { writable } from "svelte/store"

export const diagnosesTree: Writable<DecisionTree[]> = writable()
export const anonymizedReport = writable(Promise.resolve(""))
export const summarizedReport = writable(Promise.resolve(""))
