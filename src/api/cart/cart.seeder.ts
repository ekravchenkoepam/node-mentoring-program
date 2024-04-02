import Cart from './cart.model';
import cartDb from './cartDB';

export const seedCart = async () => {
    try {
        const emptyCart = new Cart(cartDb);

        await Cart.collection.drop();
        await emptyCart.save();

        console.log('Cart seeded successfully');
    } catch (error) {
        console.error('Error seeding cart:', (error as Error).message);
    }
}
