<script>
    export let slide
    export let background
</script>

<div class="container">
    {#if background}
        <div class="background">
            {@html background}
        </div>
    {/if}
    <div class="content md">
        {@html slide}
    </div>
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
</style>
