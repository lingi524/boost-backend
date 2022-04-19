import { Dao } from './interfaces/dao'
import { FoodItem } from './models'
import { GroceryService } from './interfaces'

export class DefaultGroceryService implements GroceryService {
    private groceryDao: Dao<FoodItem>
    constructor(dao: Dao<FoodItem>){
        this.groceryDao = dao
    }
    async getAll ():Promise<FoodItem[]> {
        return this.groceryDao.getAll()
    }
    async getById (id: string):Promise<FoodItem> {
        throw new Error('Not implemented')
    }
    async create (item: FoodItem):Promise<void> {
        throw new Error('Not implemented')
    }
    async delete (id: string):Promise<void> {
        throw new Error('Not implemented')
    }
    async update (item: FoodItem):Promise<void> {
        throw new Error('Not implemented')
    }
}