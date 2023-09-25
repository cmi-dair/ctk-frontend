import { writable } from "svelte/store"

export const diagnosesTree = writable(Promise.resolve({}))
export const anonymizedReport = writable(Promise.resolve(""))
export const summarizedReport = writable(Promise.resolve(""))
