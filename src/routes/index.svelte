<script context="module">
    import { loading } from '../stores'

    export async function preload() {
        loading.start()

        const res = await this.fetch(`sliders.json`)
        const sliders = await res.json()

        loading.end()
        return { sliders }
    }
</script>

<script>
    export let sliders
</script>

<h1 class:loaded={sliders}>N<span class="small">ot</span> A S<span class="small">imple</span> S<span class="small">lider</span></h1>

{#if sliders}
    <section class="slides">
        {#each sliders as slider (slider.id)}
            <a class="slide" href={slider.link}>{slider.title}</a>
        {/each}
    </section>
{/if}

<style>
    h1 {
        text-align: center;
        font-size: 10vw;
        font-weight: 600;
        letter-spacing: 5vw;
        margin: 20vh 0 0 0;
        color: var(--primary);
    }

    h1.loaded {
        margin: 5vh 0 0 0;
        transition: margin 500ms ease;
    }

    .small {
        font-size: 3vw;
        letter-spacing: normal;
        margin-left: -5vw;
    }

    .slides {
        display: flex;
        flex-wrap: wrap;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        grid-template-rows: 1fr;
        grid-gap: 2rem;

        margin-top: 5vh;
    }

    .slide {
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 12rem;
        border: 1px solid rgba(var(--primary-rgb), .2);
        border-radius: .25rem;
        transition: border 225ms ease;
    }

    .slide:hover,
    .slide:focus,
    .slide:active {
        outline: none;
        border: 1px solid rgba(var(--primary-rgb), 1);
    }

    @media (min-width: 500px) {
        .small {
            font-size: 2vw;
        }
    }
</style>
