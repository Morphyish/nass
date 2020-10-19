export const createClass = (...args) => args.join(' ')

export function splitSlides(md){
    return md.split('<h1').filter(s => s).map(s => '<h1' + s)
}

export const sanitize = url => {
    url = url.toLocaleLowerCase()
    url = url.normalize('NFD')
    url = url.replace(/[\u0300-\u036f]/g, '')
    url = url.replace(/[^a-z0-9\-]+/g, '-')
    url = url.replace(/^\-+|\-+$/g, '')

    return url
}
