import { useEffect, useState } from "react";
import { Header } from "./components/header";

import "./App.css";
import { ProductPage } from "./components/product-page/ProductPage";

interface Review {
  customer: string;
  review: string;
  score: number;
}

export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
}

function App() {
  const [productData, setProductData] = useState<Product[]>();
  const [currentPage] = useState(0);

  const getProducts = async () => {
    const response = await fetch("/api/data");
    const data = await response.json();
    setProductData(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const currentProduct = productData?.[currentPage];

  return (
    <>
      <Header />
      {currentProduct && (
        <ProductPage
          id={currentProduct.id}
          image={currentProduct.image}
          title={currentProduct.title}
          subtitle={currentProduct.subtitle}
          tags={currentProduct.tags}
          sales={currentProduct.sales}
        />
      )}
    </>
  );
}

export default App;
