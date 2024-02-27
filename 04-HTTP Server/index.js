const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const log = `${Date.now()} requested from ${req.url}\n`
    fs.appendFile('logs.txt', log, (data, err) => {
        switch(req.url) {
            case '/':
            res.end("Homepage")
            break
            default: 
            res.end("Hello from server")

        }
    })
})

server.listen(8000, () => {
    console.log('server started')
})