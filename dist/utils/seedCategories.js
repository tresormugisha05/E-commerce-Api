"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategories = void 0;
const Categories_1 = __importDefault(require("../models/Categories"));
const categories = [
    { name: 'Men', description: 'Men\'s clothing and accessories' },
    { name: 'Women', description: 'Women\'s clothing and accessories' },
    { name: 'Electronics', description: 'Electronic devices and gadgets' },
    { name: 'Accessories', description: 'Fashion accessories and jewelry' },
];
const seedCategories = async () => {
    try {
        for (const categoryData of categories) {
            const existingCategory = await Categories_1.default.findOne({ name: categoryData.name });
            if (!existingCategory) {
                await Categories_1.default.create(categoryData);
                console.log(`Created category: ${categoryData.name}`);
            }
        }
        console.log('Categories seeded successfully');
    }
    catch (error) {
        console.error('Error seeding categories:', error);
    }
};
exports.seedCategories = seedCategories;
