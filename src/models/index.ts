import mongoose from 'mongoose';
const { Schema } = mongoose;

type FoodItem = {
    id: string
    name: string
    description: string
    image: string
    allergies: string[]
    vegetarian: boolean
}

const foodItemSchema = new Schema ({
    id: String,
    name: String,
    description: String,
    image: String,
    allergies: [String],
    vegetarian: Boolean

})


export {FoodItem, foodItemSchema}