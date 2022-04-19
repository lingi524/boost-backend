import express from 'express'
import { DefaultGroceryService } from './grocery-service'
import { InMemoryGroceryDao } from './in-memory-grocery-dao'

const dao = new InMemoryGroceryDao()
const service = new DefaultGroceryService(dao)

const app = express()
const PORT = 8080

app.get('/food-items', async(req, res) => {
  const items = await service.getAll()
  res.send(items)
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default server
