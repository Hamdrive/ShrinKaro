import express from 'express'
import router from './router'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.status(200))

app.use('/api', router)

app.listen(PORT, () => console.log('Server is live on port', PORT))

