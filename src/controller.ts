import express from 'express';
import 'dotenv/config';
import { foodItemSchema } from './validation'
import { requestTimeLogger as timeLogger, authenticate } from './middlewares'
import { CustomErrors, GroceryAppError } from './errors'
import { DefaultGroceryService } from './grocery-service'
import { MongoDbDao } from './dao'
import { FoodItem } from './models'
import cors from "cors";

const app = express();
app.use(express.json);
app.use(cors());

const getExpressApp = () => {
  const dao = new MongoDbDao();
  const service = new DefaultGroceryService(dao);

  const app = express();
  app.use(express.json());
  app.use(timeLogger);
  // app.use(authenticate);

  const getSatusCodeFromError = (error: Error | GroceryAppError): number => {
    switch ((error as GroceryAppError).errorType) {
      case CustomErrors.NOT_FOUND:
        return 404    
      case CustomErrors.SERVER_ERROR:
        return 500    
      case CustomErrors.UNAUTHORIZED:
        return 501    
      default:
        return 500
    }
  }

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
    try {
      const item = await service.getById(req.params.id)
    res.send(item); 
    } catch (error) {
        console.log(error.message);
        res.sendStatus(getSatusCodeFromError(error));
    }
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
  return app
}

export {getExpressApp}