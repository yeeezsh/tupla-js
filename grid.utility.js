class Grid {

    constructor() {
        this.rowGrid = 0
        this.maxRowGrid = 0
        this.colGrid = 0
        this.maxColGrid = 0
        this.grid = []
        this.list = []
        this.maxWidth = 0
        this.maxHeight = 0
    }

    addGrid(setting = { id: '', screenOption: { width: 0, height: 0 } }, remove = false) {
        if (!remove) {
            this.list.push(setting)
        } else {
            const filtered = this.list.filter(e => e.id !== setting.id)
            this.list = filtered
        }
        const { maxWidth, maxHeight } = this.list.reduce((acc, { screenOption }) => {
            return {
                maxHeight: acc.maxHeight + screenOption.height,
                maxWidth: acc.maxWidth + screenOption.width
            }
        }, { maxHeight: 0, maxWidth: 0 })
        this.maxHeight = maxHeight
        this.maxWidth = maxWidth
        this.arrage()
    }

    removeGrid(id = '') {
        this.addGrid({ id }, true)
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
        console.log(n, col, row)
        this.maxColGrid = col
        this.maxRowGrid = row

        for (let i = 0, g = 0, nLeft = n; i <= row && nLeft > 0; i++) {
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

// const test = new Grid()
// test.addGrid({ id: 1, screenOption: { width: 10, height: 20 } })
// test.addGrid({ id: 2, screenOption: { width: 13, height: 20 } })
// test.addGrid({ id: 3, screenOption: { width: 10, height: 420 } })
// test.addGrid({ id: 4, screenOption: { width: 10, height: 420 } })
// test.addGrid({ id: 5, screenOption: { width: 10, height: 420 } })
// test.addGrid({ id: 6, screenOption: { width: 10, height: 420 } })
// test.addGrid({ id: 7, screenOption: { width: 10, height: 420 } })

// test.showList()
// console.log('show grid')
// test.showGrid()

module.exports = Grid