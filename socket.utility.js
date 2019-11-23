const util = require('util')

class Client {
    constructor() {
        this.clients = []
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
        // if (found === -1) throw new Error('cannot find id')
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
    ], socket) {
        const parsed = canvas.reduce((acc, e) => {
            return [...acc, ...e]
        }, [])

        parsed.forEach(e => {
            socket.compress(true).emit(e.id, { draw: e.canvas, pos: e.pos })
        })

        return 
    }

}

module.exports = Client