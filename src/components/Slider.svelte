<script>
    import Slide from './Slide.svelte'
    import ProgressBar from './ProgressBar.svelte'

    import { goto } from '@sapper/app'
    import { onMount } from 'svelte'

    export let slider = {}

    let currentIndex = 0
    let theme

    onMount(() => {
        if (slider.theme) {
            const node = document.createElement('style');
            node.innerHTML = slider.theme;
            document.body.appendChild(node);

            return () => {
                document.body.removeChild(node)
            }
        }
    })

    $: currentSlide = slider.slides[currentIndex]
    $: progress = (currentIndex + 1) / slider.slides.length * 100

    const handleKeyup = event => {
        if (event.code === 'ArrowLeft') {
            currentIndex--
        }

        if (event.code === 'ArrowRight' || event.code === 'Space') {
            currentIndex++
        }

        if (event.code === 'ArrowUp') {
            for (let i = slider.chapters.length - 1; i >= 0; i--) {
                const chapterIndex = slider.chapters[i]
                if (chapterIndex < currentIndex) {
                    currentIndex = chapterIndex
                    break
                }
            }
        }

        if (event.code === 'ArrowDown') {
            for (let i = 0; i < slider.chapters.length; i++) {
                const chapterIndex = slider.chapters[i]
                if (chapterIndex > currentIndex) {
                    currentIndex = chapterIndex
                    break
                }
            }
        }

        if (event.key === 'q') {
            goto('..')
        }

        currentIndex = Math.min(Math.max(currentIndex, 0), slider.slides.length - 1)
    }
</script>

<svelte:window on:keyup={handleKeyup} />

<Slide slide={currentSlide} background={slider.background} />

<ProgressBar progress={progress} className="progress-bar" />

<style>
    :global(.progress-bar) {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
