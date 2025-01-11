import { useEffect, useState } from "react";
import "./App.css";

interface ApiResponse {
  message: string;
  data: number[];
}

function App() {
  const [data, setData] = useState<ApiResponse>();

  const fetchDataFromApi = async () => {
    const apiResponse = await fetch("/api/data");
    const apiData = await apiResponse.json();
    setData(apiData);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return <>{data?.message}</>;
}

export default App;
