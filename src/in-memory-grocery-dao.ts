import { Dao } from './interfaces/dao'
import { FoodItem } from './models'


export class InMemoryGroceryDao implements Dao<FoodItem>{
    private items: FoodItem[]

    constructor(){
        this.items = []
    }
    async getAll ():Promise<FoodItem[]> {
        return this.items
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