const util = require('util')

class Client {
    constructor(socket) {
        this.clients = []
        this.socket = socket
    }

    addClient(client = {
        id: '',
        screenOption: {
            pixel: {
                width: 0,
                height: 0,
            },
            size: {
                width: 0,
                height: 0,
                dpi: 0
            }
        }
    }) {
        if (!client.id) throw new Error('must defined id')
        this.clients.push(client)
    }

    removeClient(id = '') {
        const found = this.clients.findIndex(e => e.id === id)
        if (found === -1) throw new Error('cannot find id')
        const filtered = this.clients.filter(e => e.id !== id)
        this.clients = filtered
    }

    showClient() {
        console.log(util.inspect(this.clients, { showHidden: false, depth: null }))
    }

    broadcast(canvas = [
        {
            id: '',
            canvas: [{ x: 0, y: 0, color: [] }]
        }
    ]) {

        // canvas.forEach(e => {
        //     console.log('emitting', e.id)
        //     // socket.emit(e.id, 'test')
        //     // socket.emit('test', 'hello')
        //     // socket.emit(e.id, { draw: e.canvas })
        // })
        const parsed = canvas.reduce((acc, e) => {
            return [...acc, ...e]
        }, [])

        parsed.forEach(e => {
            this.socket.emit(e.id, { draw: e.canvas })
        })

        return

        // canvas.forEach(e => {
        //     console.log('emit', e.id)
        //     this.io.emit(e.id, e.canvas)
        // })
    }

}

module.exports = Client