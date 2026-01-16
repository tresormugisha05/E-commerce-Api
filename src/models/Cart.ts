import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
    productId: mongoose.Types.ObjectId; 
    quantity: number;
    addedAt: Date;
}

const CartSchema: Schema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { type: Number, default: 1 },
    addedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICart>('Cart', CartSchema);