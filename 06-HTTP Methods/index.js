const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true)
    const log = `${Date.now()} requested from ${req.method} ${req.url}\n`
    fs.appendFile('logs', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end('Homepage')
                break
            case '/about':
                const myName = myUrl.query.my_name
                res.end(`About ${myName}`)
                break
            case '/search':
                const search = myUrl.query.search_query
                res.end(`search results for ${search}`)
                break
            case '/register':
                switch (req.method) {
                    case 'GET':
                        res.end('Registration form')
                        break
                    case 'POST':
                        res.end('Submit form')
                        break
                }
            default:
                res.end(`Page not found`)

        }
    })
})

server.listen(8000)