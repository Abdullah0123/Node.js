const fs = require('fs')

// Synchronous/blocking

// fs.writeFileSync('my-docs', 'Hello from docs')

// Async/non-blocking

// fs.writeFile('my-docs', "Hello again from docs", (err) => {
//     if (err)
//     console.log('err', err)
// })

// const data = fs.readFileSync('./my-docs', 'utf-8')
// console.log(data)

// fs.readFile('./my-docs', 'utf-8', (err, data) => {
//     if (err)
//     console.log('err', err)
// else console.log(data)
// })

// const data = fs.appendFileSync('./my-docs', "Hi there\n")

// fs.cpSync('./my-docs', './copy')

// fs.unlinkSync('./copy')

// fs.mkdirSync('my-docss/a/b')

fs.mkdirSync('my-docss/a/b', {recursive: true})
