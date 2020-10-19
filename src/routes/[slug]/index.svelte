<script context="module">
    import { loading } from '../../stores'

    export async function preload(page) {
        loading.start()

        const { slug } = page.params;
        const res = await this.fetch(`${slug}.json`)
        const slider = await res.json()

        loading.end()
        return { slider }
    }
</script>

<script>
    import Slider from '../../components/Slider.svelte'

    export let slider
</script>

{#if slider}
    <Slider slider={slider.data} />
{/if}
