import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
import { useState, useEffect} from 'react';
import { Product } from "./types";

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1bcXpGUzJUyUwITOqEn8QPj8ZOgUbTGQD/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places


type ProductProps = {
  id: number;
  name: string;
  availableCount: number;
  price: number;
  orderedQuantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  total: (price: number, quantity: number) => number;
};

type OrderProduct = Product & {
  orderedQuantity: number;
};

const ProductComponent = ({id, name, availableCount, price, orderedQuantity, onIncrease, onDecrease, total}: ProductProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price.toFixed(2)}</td>
      <td>{orderedQuantity}</td>
      <td>${total(price, orderedQuantity).toFixed(2)}</td>
      <td>
        <button
          className={styles.actionButton}
          onClick={() => onIncrease(id)}
          disabled={orderedQuantity >= availableCount}
        >
          +
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onDecrease(id)}
          disabled={orderedQuantity <= 0}
        >
          -
        </button>
      </td>
    </tr>    
  );
};


const Checkout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [orderProducts, setOrderProducts] = useState<Record<number, OrderProduct>>({});

  useEffect(() => {
    getProducts().then(products => {
      setProducts(products);
      const initialOrderProducts: Record<number, OrderProduct> = products.reduce((acc, product) => {
        acc[product.id] = {
          ...product,
          orderedQuantity: 0
        };
        return acc;
      }, {} as Record<number, OrderProduct>);
      setOrderProducts(initialOrderProducts);
      setLoading(false);
    });
  }, []);

  const handleIncrease = (id: number) => {
    setOrderProducts(prev => {
      const product = prev[id];
      if (product.orderedQuantity < product.availableCount) {
        const updatedProduct = { ...product, orderedQuantity: product.orderedQuantity + 1 };
        const updatedOrderProducts = { ...prev, [id]: updatedProduct };
        return updateOrderTotal(updatedOrderProducts);
      }
      return prev;
    });
  };

  const handleDecrease = (id: number) => {
    setOrderProducts(prev => {
      const product = prev[id];
      if (product.orderedQuantity > 0) {
        const updatedProduct = { ...product, orderedQuantity: product.orderedQuantity - 1 };
        const updatedOrderProducts = { ...prev, [id]: updatedProduct };
        return updateOrderTotal(updatedOrderProducts);
      }
      return prev;
    });
  };


  const calculateTotal = (price: number, quantity: number) => price * quantity;

  const updateOrderTotal = (orderProducts: Record<number, OrderProduct>) => {
    let total = 0;
    for (const product of Object.values(orderProducts)) {
      total += calculateTotal(product.price, product.orderedQuantity);
    }
    const discountAmount = total > 1000 ? total * 0.10 : 0;
    setOrderTotal(total - discountAmount);
    setDiscount(discountAmount);
    return orderProducts;
  };
  
  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        {loading ? <LoadingIcon /> : (
          <table className={styles.table}>
            <thead>
              <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {products.map(product => (
                <ProductComponent
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  availableCount={product.availableCount}
                  price={product.price}
                  orderedQuantity={orderProducts[product.id]?.orderedQuantity || 0}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  total={calculateTotal}
                />
              ))}
            </tbody>
        </table>
        )}
         <h2>Order summary</h2>
        {discount > 0 && <p>Discount: ${discount.toFixed(2)}</p>}
        <p>Total: ${orderTotal.toFixed(2)}</p>       
      </main>
    </div>
  );
};

export default Checkout;