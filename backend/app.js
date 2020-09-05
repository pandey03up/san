const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PersonRouer = require('./routers/PersonRouter')

const link = 'mongodb+srv://uppandey:'+process.env.mongodb+'@cluster0-kzdsz.mongodb.net/Cluster?retryWrites=true&w=majority'
mongoose.connect(link,
{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> console.log('mongidb connected'))
.catch((err)=> console.log(err))

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('',PersonRouer)

module.exports = app