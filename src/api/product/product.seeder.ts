import ProductModel from './product.model';
import productsDb from './productsDB';

export const seedProducts = async () => {
    try {
        await ProductModel.collection.drop();
        await ProductModel.insertMany(productsDb);
        
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', (error as Error).message);
    }
}
