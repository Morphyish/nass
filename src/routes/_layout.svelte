<script>
    import Loading from '../components/Loading.svelte'

    import { loading } from '../stores'
</script>

<main>
    <slot></slot>

    <Loading />
    {#if $loading}
        <Loading />
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        flex: 1;
    }
</style>
