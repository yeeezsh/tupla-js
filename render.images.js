// const getPixels = require("get-pixels") 
const Jimp = require('jimp')

class Render {
    constructor() {
        this.render
        this.image
        this.origin
    }

    async readFile(path) {
        const self = this
        return new Promise((resolve, reject) => {
            Jimp.read(path, (err, image) => {
                if (err) reject(err)
                this.origin = image
                this.image = image
                // resolve(self)
                resolve()
            })
        })
    }

    draw() {
        const image = this.origin
        const imagesArray = []
        const { width, height } = image.bitmap
        for (let w = 0; w <= width; w++) {
            imagesArray.push([])
            for (let h = 0; h <= height; h++) {
                const pixel = image.getPixelColour(w, h)
                imagesArray[w].push({
                    x: w,
                    y: h,
                    color: Jimp.intToRGBA(pixel)
                })
            }
        }
        const flat = imagesArray.flat()
        this.render = flat
        return this.render
    }

    getDraw() {
        return this.render
    }

    resize(w = 0, h = 0) {
        const image = this.origin
        if(!w || ! h) return
        this.render = image.resize(w, h, Jimp.RESIZE_BEZIER)
        this.draw()
        return this.render
    }

    // getDraw() {
    //     return this.output
    // }


}

// async function test() {
//     const tester = new Render()
//     await tester.readFile('./img.jpg')
//     console.log('read')
//     tester.draw()

// }
// test()
// const tester = new Render()
// tester.readFile('./img.jpg').then(d => {
//     // setTimeout(() =>tester.getDraw(), 4000)
//     // console.log(d) 
//     tester.draw()
//     console.log(tester.resize())
// })
module.exports = Render