const path = require('path')
const http = require('http')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
server.listen(8080, () => console.log('server running at 8080'))
let io = require('socket.io')(server)

const Client = require('./socket.utility')
// const Clients = new Client()
const Grid = require('./grid.utility')
const Grids = new Grid()

io.on('connection', socket => {
    const Clients = new Client(socket)

    const clientId = socket.id
    console.log('connection', clientId)

    socket.emit('connection', { id: clientId })

    socket.on('screen', d => {
        console.log('screen', socket.id, d)
        const parse = {
            id: clientId,
            screenOption: {
                ...d
            }
        }
        Clients.addClient(parse)
        const parsedGrid = {
            id: clientId,
            screenOption: {
                width: d.pixel.width,
                height: d.pixel.height
            }
        }
        Grids.addGrid(parsedGrid)
    })

    socket.on('disconnect', () => {
        if (clientId) {
            Clients.removeClient(clientId)
            Grids.removeGrid(clientId)
        }
        console.log('user disconnected')
    })

    setInterval(() => {
        const broadcast = Grids.pixel.draw([{ x: 900, y: 600 }, { x: 0, y: 100 }, { x: 4, y: 100 }, { x: 4, y: 120 }])
        Clients.broadcast(broadcast)
    }, 2000)
})

// setInterval(() => {
//     io.on('connection', socket => {
//         socket.emit('connection', { id: 'eueo' })
//     })
// }, 2000);




// setInterval(() => {
//     //     // Grids.showGrid()
//     //     // Grids.pixel.findScreen(100, 100)
//     //     // Grids.pixel.findScreen(600, 600)
//     //     // Grids.pixel.findScreen(1200, 600)
//     //     // Grids.pixel.findScreen(0, 0)
//     //     // Grids.pixel.findScreen(900, 900)
//     //     // Grids.pixel.draw([{ x: 1000, y: 120 }, { x: 9, y: 20 }, { x: 1000, y: 900 }])
//     //     // console.log('pixelMap', Grids.pixel.pixelMap)
//     //     // Grids.pixel.findScreen(1000, 120)
//     //     // Grids.pixel.draw([{ x: 1000, y: 900 }])
//     //     // const broadcast = Grids.pixel.draw([{ x: 900, y: 600 }, { x: 0, y: 100 }])
//     //     // Clients.broadcast(broadcast)

//     console.log('update')
//     const broadcast = Grids.pixel.draw([{ x: 900, y: 600 }, { x: 0, y: 100 }])
//     Clients.broadcast(broadcast)
// }, 1000)

// setTimeout(() => {
//     console.log('update')
//     const broadcast = Grids.pixel.draw([{ x: 900, y: 600 }, { x: 0, y: 100 }])
//     console.log('hhhh', broadcast)
//     Clients.broadcast(broadcast)
// }, 4000);
// Grids.pixel.draw([{ x: 900, y: 600 }, { x: 0, y: 100 }]).then(data => {
//     console.log('dataaaaaa', data)
// })
// Clients.broadcast(broadcast)


