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
        Renderer.updateDiemension(width, height)
        // ImagesRenderer.resize(width, height)
        draw = ImagesRenderer.resize(width, height)
        broadcastImage()
    })

    socket.on('disconnect', () => {
        Clients.removeClient(clientId)
        Grids.removeGrid(clientId)
        const { width, height } = Grids.getDiemention()
        Renderer.updateDiemension(width, height)
        draw = ImagesRenderer.resize(width, height)
        broadcastImage()
        console.log('user disconnected')
    })
})

// draw
// setInterval(async () => {
//     // random particles
//     Renderer.update()
//     const draw = Renderer.lists
//     const broadcast = Grids.pixel.draw(draw)
//     Clients.broadcast(broadcast, io)

// }, 1000)
let draw
// ImagesRenderer.readImage(path.join(process.cwd(), 'img.png')).then(d => {
// ImagesRenderer.readFile(path.join(process.cwd(), 'img2.jpg')).then(() => {
//     // draw = d
//     // draw = ImagesRender.draw()
// })

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



