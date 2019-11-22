function ranIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Render {
    constructor(w = 0, h = 0) {
        this.maxWidth = w
        this.maxHeight = h
        this.lists = []
    }

    updateDiemension(w = 0, h = 0) {
        this.maxHeight = h
        this.maxWidth = w
    }

    addObject() {
        const object = {
            x: ranIntRange(0, this.maxWidth),
            y: ranIntRange(0, this.maxHeight),
            color: getRandomColor()
        }
        this.lists.push(object)
    }

    removeObject() {
        this.lists.pop()
    }

    update() {
        const newFrame = this.lists.map(e => {
            // console.log()
            // const dx= 
            return {
                ...e,
                // x: 0,
                // y: 0
                x: ranIntRange(0, this.maxWidth),
                y: ranIntRange(0, this.maxHeight),
            }
        })
        this.lists = newFrame
        return this.lists
    }

    showList() {
        console.log(this.lists)
    }


}

// const test = new Render(100, 100)
// test.addObject()
// test.addObject()
// test.addObject()
// test.showList()
// test.update()
// test.showList()


module.exports = Render