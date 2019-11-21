class Render {

    constructor() {
        this.rowGrid = 0
        this.maxRowGrid = 0
        this.colGrid = 0
        this.maxColGrid = 0
        this.nextGrid = 'col'
        this.grid = []
        this.list = []
        this.maxWidth = 0
        this.maxHeight = 0
    }

    addGrid(setting = { id: '', screen: { width: 0, height: 0 } }) {
        this.list.push(setting)
        this.arrage()
    }

    arrage() {
        this.grid = []
        const n = this.list.length
        function solveColRow(n) {
            const x = Math.sqrt(n)
            const xFloor = Math.round(x)
            const yFloor = Math.round(n - x)
            return { col: xFloor, row: yFloor }
        }
        const { col, row } = solveColRow(n)
        this.maxColGrid = col
        this.maxRowGrid = row

        for (let i = 0, g = 0, nLeft = n; i < row - 1; i++) {
            this.grid.push([])
            for (let j = 0; j < col && nLeft > 0; j++ , nLeft-- , g++) {
                this.grid[i].push(this.list[g])
            }
        }
    }

    showList() {
        console.log(this.list)
    }

    showGrid() {
        console.log(this.grid)
    }

}

const test = new Render()
test.addGrid({ id: 1, screen: { width: 10, height: 20 } })
test.addGrid({ id: 2, screen: { width: 13, height: 20 } })
test.addGrid({ id: 3, screen: { width: 10, height: 420 } })
test.addGrid({ id: 4, screen: { width: 10, height: 420 } })
test.addGrid({ id: 5, screen: { width: 10, height: 420 } })
test.addGrid({ id: 6, screen: { width: 10, height: 420 } })
test.addGrid({ id: 7, screen: { width: 10, height: 420 } })

// test.showList()
// test.arrage()
test.showGrid()

module.exports = Render