<script>
    export let progress = 0
    export let className = ''
</script>

<div class="{`container ${className}`}">
    <div class="progress" style="{`width: ${progress}%`}" ></div>
</div>

<style>
    .container {
        width: 100%;
        height: 10px;
    }

    .progress {
        height: 100%;
        background: #B31734;
        transition: width 500ms ease-in;
    }
</style>
