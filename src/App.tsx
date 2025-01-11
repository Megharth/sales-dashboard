import { useEffect, useState } from "react";
import { Header } from "./components/header";

import "./App.css";

interface Review {
  customer: string;
  review: string;
  score: number;
}

interface Sale {
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
  const [data, setData] = useState<Product[]>();

  const fetchDataFromApi = async () => {
    const apiResponse = await fetch("/api/data");
    const apiData = await apiResponse.json();
    setData(apiData);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
