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
        this.pixel = new Pixel()
    }

    addGrid(setting = { id: '', screenOption: { width: 0, height: 0 } }, remove = false) {
        if (!remove) {
            this.list.push(setting)
        } else {
            const filtered = this.list.filter(e => e.id !== setting.id)
            this.list = filtered
        }

        this.arrage()

        const maxWidth = this.grid[0] && this.grid[0].reduce((acc, e) => {
            return acc + e.screenOption.width
        }, 0)
        const maxHeight = this.grid && this.grid.reduce((acc, e) => {
            return acc + e[0].screenOption.height
        }, 0)
        this.maxHeight = maxHeight
        this.maxWidth = maxWidth
        console.log('maxWidth', maxWidth)
        console.log('maxHeight', maxHeight)

        this.pixel.map(this.grid, this.maxWidth, this.maxHeight)
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
        console.log('n | col | row ', n, col, row)
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

class Pixel {
    constructor() {
        this.pixelMap = []
        this.width = 0
        this.height = 0
    }

    map(data = [
        [{
            id: '', screenOption: {
                width: 0,
                height: 0
            }
        }]
    ], maxWidth = 0, maxHeight = 0) {
        this.width = maxWidth
        this.height = maxHeight
        console.log('pixel parse', data)
        const parsed = data.map(e => {
            const sub = e.map(({ id, screenOption }) => {
                return {
                    id,
                    pixel: {
                        xstart: 0,
                        xstop: 0,
                        ystart: 0,
                        ystop: 0
                    },
                    canvas: [
                        { x: 0, y: 0 }
                    ],
                    size: {
                        width: screenOption.width,
                        height: screenOption.height
                    }
                }
            })
            return sub
        })

        // console.log('pixel parsed', parsed)
        console.log('pixel parsed', JSON.stringify(parsed, null, 2))
        // const mappingPixel = parsed
        // for(let col = 0; i < )
        // let h = 0
        // let minH
        const mappedPixel = parsed.map((e, i, arr) => {

            let h = 0
            let w = 0

            // const minH = Math.min(...e.map(c => c.size.height))
            const col = e.map((c, j) => {
                if (i === 0) {
                    h = 0
                } else {
                    h = arr[i][j].size.height
                }
                // minH.push(c.size.height)
                const cMap = {
                    ...c,
                    pixel: {
                        ...c.pixel,
                        xstart: w,
                        xstop: w + c.size.width,
                        ystart: h,
                        ystop: h + c.size.height
                    }
                }
                w += c.size.width
                // h += min
                return cMap
            })
            return col
        })

        // console.log('mapped pixel', JSON.stringify(mappedPixel, null, 1))
        console.log('mapped pixel', mappedPixel)

        // const pixelMapped = parsed.map(row => {
        //     const col
        // })
        // const parsed = data.map(e => {
        //     return {
        //         id: e.id,
        //         virtualSize: {
        //             width: 0,
        //             height: 0
        //         },
        //         actualSize: {
        //             width: e.screenOption.width,
        //             height: e.screenOption.height
        //         }
        //     }
        // })
        // this.pixelMap = parsed
        // const mapping = this.pixelMap

        // console.log(this.pixelMap, this.width, this.height)
        // for (let i = 0; i <= mapping.length - 1; i++) {
        //     console.log(mapping, i, this.pixelMap[i])
        //     for (let j = 0; i <= this.pixelMap[i].length - 1; j++) {
        //         console.log('pixel map', this.pixelMap[i][j])
        //     }
        // }
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