const path = require('path')
const http = require('http')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
server.listen(8080, () => console.log('server running at 8080'))
const io = require('socket.io')(server)

const Client = require('./socket.utility')
const Clients = new Client()
const Grid = require('./grid.utility')
const Grids = new Grid()

io.on('connection', socket => {
    const clientId = socket.id
    console.log('connection', clientId)

    socket.emit('connection')


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
})

setInterval(() => {
    // Grids.showGrid()
}, 2000)
