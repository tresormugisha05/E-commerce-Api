import Category from '../models/Categories';

const categories = [
  { name: 'Men', description: 'Men\'s clothing and accessories' },
  { name: 'Women', description: 'Women\'s clothing and accessories' },
  { name: 'Electronics', description: 'Electronic devices and gadgets' },
  { name: 'Accessories', description: 'Fashion accessories and jewelry' },
];

export const seedCategories = async () => {
  try {
    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        await Category.create(categoryData);
        console.log(`Created category: ${categoryData.name}`);
      }
    }
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};