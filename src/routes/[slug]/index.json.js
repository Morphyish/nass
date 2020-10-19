import { existsSync, lstatSync, readFileSync } from 'fs'
import { splitSlides } from '../../core/utils'
import { parse } from 'markdown'
import { join } from 'path'

export async function get(req, res, next) {
    const isDirectory = source => existsSync(source) && lstatSync(source).isDirectory()
    const isFile = source => existsSync(source) && lstatSync(source).isFile()

    const rootPath = '.'

    const { slug } = req.params
    const slidersPath = `sliders`
    const fullPath = join(slidersPath, slug)
    let slider = {
        link: slug,
        title: slug,
        data: {
            chapters: [0],
        },
    }

    if (isDirectory(fullPath)) {
        const sliderPath = join(fullPath, 'slider.json')
        let slidesPath = join(fullPath, 'slides.md')
        let themePath = join(fullPath, 'theme.css')
        let backgroundPath = join(fullPath, 'background.html')
        if (isFile(sliderPath)) {
            const data = JSON.parse(readFileSync(sliderPath, 'utf-8'))
            slider.title = data.title || slider.title
            if (data.slides) {
                if (typeof data.slides === 'string') {
                    slidesPath = join(rootPath, fullPath, `${data.slides}.md`)
                } else {
                    slidesPath = data.slides.map(slide => join(rootPath, fullPath, `${slide}.md`))
                }
            }
            if (data.theme) {
                themePath = join(rootPath, fullPath, `${data.theme}.css`)
            }
            if (data.background) {
                backgroundPath = join(fullPath, `${data.background}.html`)
            }
        }

        if (typeof slidesPath === 'string') {
            if (isFile(slidesPath)) {
                slider.data.slides = splitSlides(parse(readFileSync(slidesPath, 'utf-8')))
            }
        } else {
            slider.data.slides = []
            slidesPath.forEach((path, index) => {
                if (isFile(path)) {
                    const slides = splitSlides(parse(readFileSync(path, 'utf-8')))
                    slider.data.chapters[index] = slider.data.slides.length
                    slider.data.slides = [
                        ...slider.data.slides,
                        ...slides,
                    ]
                }
            })
        }

        if (isFile(themePath)) {
            slider.data.theme = readFileSync(themePath, 'utf-8')
        }

        if (isFile(backgroundPath)) {
            slider.data.background = readFileSync(backgroundPath, 'utf-8')
        }
    }

    if (slider) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(slider))
    } else {
        next()
    }
}

