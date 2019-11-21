const path = require('path')
const http = require('http')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
server.listen(8080, () => console.log('server running at 8080'))
const io = require('socket.io')(server)


io.on('connection', socket => {
    console.log('connection', socket.id)
    
    socket.on('screen', d => {
        console.log('screen', socket.id, d)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

setInterval(() => {
    // const list = io.
    // console.log(list)
}, 2000)
