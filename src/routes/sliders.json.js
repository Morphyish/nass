import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export async function get(req, res, next) {
    const slidersPath = './sliders'
    const isDirectory = source => existsSync(source) && lstatSync(source).isDirectory()
    const isFile = source => existsSync(source) && lstatSync(source).isFile()

    const sliders = readdirSync(slidersPath)
        .filter(name => isDirectory(join(slidersPath, name)))
        .map((name, index) => {
            let slider = {
                id: index,
                link: name,
                title: name,
            }

            const sliderPath = join(slidersPath, name, 'slider.json')
            if (isFile(sliderPath)) {
                const data = JSON.parse(readFileSync(sliderPath, 'utf-8'))
                slider.title = data.title || slider.title
            }

            return slider
        })

    if (sliders) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(sliders))
    } else {
        next()
    }
}
