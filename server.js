//CONST
const PORT          = process.env.PORT || 3000
const DB_URL        = 'mongodb+srv://dmitryv2:tuaw4mqg2t@cluster0.a0lwf.mongodb.net/nodels1?retryWrites=true&w=majority'
//Modules
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')

//Routes exports
const roleRoute     = require('./src/routes/role.routes')
const authRoute     = require('./src/routes/user.routes')

//connect mongoDB
mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('db connect success')
}).catch(e => console.log(e))

//initProject
const app = express()

//middlewares
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/role', roleRoute)
app.use('/api/auth', authRoute)

app.listen(PORT, () => {
    console.log(`Server starting on port:${PORT}`)
})

app.get('/', (req, res) => {
    res.json({ messages: 'success to connect' })
})

