const app = require('./app')
const http = require('http')

const port = process.env.port||4000

const server = http.createServer(app)
server.listen(port,()=>{
    console.log('connected to',port)
})