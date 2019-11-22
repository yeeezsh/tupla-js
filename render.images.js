// const getPixels = require("get-pixels") 
const Jimp = require('jimp')

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class Render {
    constructor(path = '') {
        this.output = []

    }

    async readImage(path) {
        return new Promise((resolve, reject) => {
            Jimp.read(path, (err, image) => {
                if (err) reject(err)

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
                this.output = flat
                resolve(flat)
            })
        })
    }

    getDraw() {
        return this.output
    }


}

// const test = new Render('./img.jpg')
// console.log(test.output)
module.exports = Render