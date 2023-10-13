import { writable, type Writable } from "svelte/store"

export const diagnosisText: Writable<string | undefined> = writable("")
