class Render {

    constructor() {
        this.rowGrid = 0
        this.maxRowGrid = 0
        this.colGrid = 0
        this.maxColGrid = 0
        this.nextGrid = 'col'
        this.grid = [[]]
        this.list = []
        this.maxWidth = 0
        this.maxHeight = 0
    }

    addGrid(setting = { id: '', screen: { width: 0, height: 0 } }) {
        this.list.push(setting)
    }

    arrage() {
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
    }

    showList() {
        console.log(this.list)
    }

}

const test = new Render()
test.addGrid({ id: 1, screen: { width: 10, height: 20 } })
test.addGrid({ id: 2, screen: { width: 13, height: 20 } })
test.addGrid({ id: 3, screen: { width: 10, height: 420 } })

test.showList()

module.exports = Render