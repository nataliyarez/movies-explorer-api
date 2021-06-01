const express = require('express')
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env
const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true,
})

app.listen(PORT, () => {
    console.log('App listening on port 3000')
})
