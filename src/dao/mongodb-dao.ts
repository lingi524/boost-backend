import { Dao } from '../interfaces';
import { FoodItem, foodItemSchema} from '../models';
import mongoose, { Model } from 'mongoose';

export class MongoDbDao implements Dao<FoodItem> {
    private model: Model<FoodItem>

    constructor() {
        this.model = mongoose.model('FoodItem', foodItemSchema)
    }
    private fromMongoDbToFoodItem(source: any): FoodItem {
        return {
            id: source.id,
            name: source.name,
            description: source.description,
            vegetarian: source.vegetarian,
            image: source.image,
            allergies: source.allergies
        }
    }
    async getAll ():Promise<FoodItem[]> {
        const items = await this.model.find();
        return items.map(item => this.fromMongoDbToFoodItem(item));
    }
    async getById (id: string):Promise<FoodItem> {
       const item = await this.model.findOne({id});
       return this.fromMongoDbToFoodItem(item);
    }
    async create (item: FoodItem):Promise<void> {
        this.model.create(item);
    }
    async delete (id: string):Promise<void> {
        await this.model.deleteOne({id})
    }

    async update (item: FoodItem):Promise<void> {
         await this.model.updateOne({id:item.id}, item)
    }
}