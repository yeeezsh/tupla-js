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
        this.lists = []

        Jimp.read(path, (err, image) => {
            const imagesArray = []
            const { width, height } = image.bitmap
            for (let w = 0; w <= width; w++) {
                imagesArray.push([])
                for (let h = w; h <= height; h++) {
                    const pixel = image.getPixelColour(w, h)
                    const { r, g, b } = Jimp.intToRGBA(pixel)
                    const color = rgbToHex(r, g, b)
                    imagesArray[w].push({
                        x: w,
                        y: h,
                        color
                    })
                }
            }
            return imagesArray
        })
    }


}

const test = new Render('./img.jpg')

module.exports = Render