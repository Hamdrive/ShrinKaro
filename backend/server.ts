import express from 'express'
import router from './router'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({ origin: "http://localhost:3000/" }));
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

app.get('/', (req, res) => res.status(200))


app.listen(PORT, () => console.log('Server is live on port', PORT))

