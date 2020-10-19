<script>
    const boxes = Array.from({ length: 9 })

    const animationDelay = position => `${position * 400}ms`
</script>

<div class="container">
    <div class="loading">loading...</div>
    <div class="boxes">
        {#each boxes as box, index (index)}
            <div class="box" style="animation-delay: {animationDelay(index)}"></div>
        {/each}
    </div>
</div>

<style>
    .container {
        position: fixed;
        display: flex;
        align-items: center;
        bottom: 2rem;
        right: 2rem;
    }

    .loading {
        margin-right: 1rem;
        color: var(--primary);
        font-weight: 600;
        letter-spacing: .25rem;
        text-transform: uppercase;
        animation: blink 2000ms infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: .3;
        }
        100% {
            opacity: 1;
        }
    }

    .boxes {
        display: flex;
        flex-wrap: wrap;
        width: calc(1.5rem + 18px);
        height: calc(1.5rem + 18px);
        transform: rotate(45deg) rotate3d(0, 0, 0, 0deg);
        animation-name: master_gear;
        animation-duration: 4000ms;
        animation-iteration-count: infinite;
    }

    @keyframes master_gear {
        0% {
            transform: rotate(45deg);
        }
        90% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(135deg);
        }
    }

    .box {
        width: .5rem;
        height: .5rem;
        margin: 2px;
        box-sizing: content-box;
        background: var(--primary);
        opacity: .3;
        border: 1px solid #fff;
        transform: rotate3d(0, 0, 0, 0deg);
        animation-name: gears;
        animation-duration: 4000ms;
        animation-iteration-count: infinite;
    }

    @keyframes gears {
        0% {
            transform: rotate(0deg);
            opacity: .3;
        }
        5% {
            opacity: 1;
        }
        10% {
            transform: rotate(90deg);
            opacity: .3;
        }
        100% {
            transform: rotate(90deg);
        }
    }
</style>
