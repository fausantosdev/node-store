const app = require('../source/app')
const http = require('http')
const debug = require('debug')('nodestore:server')
const express = require('express')


//-------------------- SERVER

const port = normalizePort(process.env.PORT || '3000')

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})

server.on('error', onError)
server.on('listening', onListening)

function normalizePort(value){
    const port = parseInt(value, 10)

    if(isNaN(port))
    {
        return value
    }

    if(port >= 0)
    {
        return port
    }

    return false
}

function onError(error){
    if(error.syncall !== 'listen'){
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch(error.code){
        case 'EACCES':
            console.log(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            Console.log(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error        
    }
}

function onListening(){
    const addr = server.address()

    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    
    debug('Listening on ' + bind)
}