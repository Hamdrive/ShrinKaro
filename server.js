import express from 'express'

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.status(200).send('Hello World, Server is live'))

app.listen(PORT, () => console.log('Server is live on port', PORT))

