const MODE = 'image'
// const MODE = 'pla'

const path = require('path')
const http = require('http')
const express = require('express')

const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(process.cwd(), 'public')))

const server = http.createServer(app)
server.listen(8080, () => console.log('server running at 8080'))
let io = require('socket.io')(server)

const Client = require('./socket.utility')
const Grid = require('./grid.utility')
const Render = require('./render.random')
const ImagesRender = require('./render.images')

const Renderer = new Render()
const ImagesRenderer = new ImagesRender()
const Clients = new Client()
const Grids = new Grid()

Renderer.addObject()

io.on('connection', socket => {

    const clientId = socket.id
    console.log('connection', clientId)

    socket.emit('connection', { id: clientId })

    socket.on('screen', d => {
        console.log('rearrnage !!!!!')
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
        const { width, height } = Grids.getDiemention()
        if (MODE === 'image') {
            draw = ImagesRenderer.resize(width, height)
            broadcastImage()
        } else {
            Renderer.updateDiemension(width, height)
        }
    })

    socket.on('disconnect', () => {
        Clients.removeClient(clientId)
        Grids.removeGrid(clientId)
        const { width, height } = Grids.getDiemention()
        if (MODE === 'image') {
            draw = ImagesRenderer.resize(width, height)
            broadcastImage()
        } else {
            Renderer.updateDiemension(width, height)
        }
        console.log('user disconnected')
    })
})

let draw

// draw
if (MODE !== 'image') {
    setInterval(async () => {
        // random particles
        Renderer.update()
        draw = Renderer.lists
        const broadcast = Grids.pixel.draw(draw)
        Clients.broadcast(broadcast, io)

    }, 200)
}


ImagesRenderer.readFile('./img.jpg').then(() => {
    draw = ImagesRenderer.draw()
})

async function broadcastImage(width, height) {
    // images
    // const draw = await ImagesRenderer.readImage('./large.png')
    // draw = ImagesRenderer.resize(width, height)
    // console.log('resize', draw)
    const broadcast = Grids.pixel.draw(draw)
    console.log(broadcast)
    Clients.broadcast(broadcast, io)
}

// setTimeout(() => broadcastImage(), 2000)



