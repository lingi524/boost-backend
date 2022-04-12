import express from 'express'
import hello from './hello'

const app = express()
const PORT = 8080

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/', (req, res) => {
  res.send(hello())
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default server
