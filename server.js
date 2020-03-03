if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected mongoose'))


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port ' + (process.env.PORT || 3000))
})