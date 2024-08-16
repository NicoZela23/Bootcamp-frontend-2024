type Product = {
  id: number;
  name: string;
  price: number;
  availableCount: number;
};

export function getProducts(): Promise<Product[]> {
  return getData('/products.json')
    .then(result => result.products as Product[]);
}

function getData(endpoint: string): Promise<{products: Product[]}> {
    const delay = (0.5 + Math.random() * 2) * 1000;
    return new Promise((resolve) => {
      setTimeout(function () {
        fetch(endpoint)
          .then(res => {
              resolve(res.json())
          });
      }, delay);
    });
}