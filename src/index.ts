import express from 'express'
import 'dotenv/config'
import { DefaultGroceryService } from './grocery-service'
import { InMemoryGroceryDao, MongoDbDao } from './dao'
import { FoodItem } from './models'
import { connectToMongoDB } from './connection'
import { foodItemSchema } from './validation'
import timeLogger from './middlewares'

const initServer = async () => {

  const dao = new MongoDbDao();
  const service = new DefaultGroceryService(dao);

  const app = express();
  app.use(express.json());
  app.use(timeLogger);
  const PORT = (process.env.PORT || 8080);

  app.get('/food-items', async(req, res) => {
    const items = await service.getAll()
    res.send(items)
  })

  app.post('/food-items', async (req: express.Request, res: express.Response) => {
    try {
      const item: FoodItem = await foodItemSchema.validateAsync(req.body);
      await service.create(item)
      res.sendStatus(201);
      
    } catch (error) {
      res.status(422).send(error.message);
    }
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
    try {
      const item: FoodItem = await foodItemSchema.validateAsync(req.body);
      await service.update(item);
      res.sendStatus(201);
    } catch (error) {
      res.status(422).send(error.message);
    }
  })

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  await connectToMongoDB();

}


initServer();