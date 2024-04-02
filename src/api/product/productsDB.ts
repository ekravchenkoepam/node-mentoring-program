import { v4 as uuidv4 } from 'uuid';
import { Product } from "../../types";

const productsDb: Product[] = [
    {
        id: uuidv4(),
        title: "Book",
        description: "Interesting book",
        price: 200
    },
    {
        id: uuidv4(),
        title: "Pen",
        description: "Cute pen",
        price: 20
    }
];

export default productsDb