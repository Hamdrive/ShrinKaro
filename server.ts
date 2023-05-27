import express from 'express'
import router from './router'

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.status(200).send('Hello World, Server is live'))

app.use('/api', router)

app.listen(PORT, () => console.log('Server is live on port', PORT))

