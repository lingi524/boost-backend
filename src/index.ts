import express from 'express'
import 'dotenv/config'
import { DefaultGroceryService } from './grocery-service'
import { InMemoryGroceryDao } from './in-memory-grocery-dao'
import { FoodItem } from './models'

const dao = new InMemoryGroceryDao()
const service = new DefaultGroceryService(dao)

const app = express();
app.use(express.json());
const PORT = 8080;

app.get('/food-items', async(req, res) => {
  const items = await service.getAll()
  res.send(items)
})

app.post('/food-items', async (req: express.Request, res: express.Response) => {
  const item = req.body as FoodItem;
  await service.create(item)
  res.sendStatus(201);
})

app.delete('/food-items/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  await service.delete(id);
  res.sendStatus(204);
})

app.get('/food-items/:id', async(req: express.Request, res: express.Response) => {
  const item = await service.getById(req.params.id)
  res.send(item);
})

app.put('/food-items/:id', async(req: express.Request, res: express.Response) => {
  const item = req.body as FoodItem;
  await service.update(item);
  res.sendStatus(201);
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default server
