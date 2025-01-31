const express = require('express')
const app = express()
const path = require('path')

const connectDB = require('./config/db')
connectDB()

app.use(express.json({ extended: false }))

// app.get('/', (req, res) => res.send('API is Running'))

app.use('/api/users', require('./routers/api/users'))
app.use('/api/auth', require('./routers/api/auth'))



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}.`))