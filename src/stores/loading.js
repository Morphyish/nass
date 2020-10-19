import { writable } from 'svelte/store'

function loadingStore() {
    const loading = writable(false)

    const start = () => loading.set(true)

    const end = () => loading.set(false)

    return {
        ...loading,
        start,
        end,
    }
}

export const loading = loadingStore()
