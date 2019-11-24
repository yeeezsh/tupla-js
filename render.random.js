function ranIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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
        console.log('add obj')
        if (!this.maxHeight || !this.maxWidth) return
        const object = {
            x: ranIntRange(0, this.maxWidth),
            y: ranIntRange(0, this.maxHeight),
            dx: 1,
            dy: 1,
            color: {
                r: ranIntRange(0, 255),
                g: ranIntRange(0, 255),
                b: ranIntRange(0, 255),
                a: 255
            }
        }
        this.lists.push(object)
    }

    removeObject() {
        console.log('this', this.lists)
        this.lists.pop()
        console.log('this', this.lists)
    }

    update() {
        console.log(this.lists)
        if (!this.maxHeight || !this.maxWidth) return this.lists
        const newFrame = this.lists.map(e => {
            let dx = e.dx
            let dy = e.dy
            if (e.x == this.maxWidth) {
                dx = -1
            } else if (e.x === this.maxWidth) {
                dx = 1
            } else if (e.x === 0) {
                dx = 1
            } else if(e.x > this.maxWidth) {
                dx = -1
            }

            if (e.y == this.maxHeight) {
                dy = -1
            } else if (e.y === this.maxHeight) {
                dy = 1
            } else if (e.y === 0) {
                dy = 1
            } else if (e.y > this.maxHeight) {
                dy = -1
            }
            const x = e.x + dx
            const y = e.y + dy

            return {
                ...e,
                // x: ++e.x,
                // y: ++e.y,
                x,
                y,
                dx,
                dy
                // c: e.c || 0
                // x: ranIntRange(0, this.maxWidth),
                // y: ranIntRange(0, this.maxHeight),
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