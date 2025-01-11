import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Sale } from "../../../App";
import { useState } from "react";
import "./ProductSales.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlySales {
  month: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

type Direction = "ascending" | "descending";

interface Config {
  key: keyof Sale;
  direction: Direction;
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sales Data Over Time",
    },
  },
};

function aggregateSalesByMonth(data: Sale[]): MonthlySales[] {
  const monthlyData: Record<string, MonthlySales> = {};

  for (const entry of data) {
    const date = new Date(entry.weekEnding);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        retailSales: 0,
        wholesaleSales: 0,
        unitsSold: 0,
        retailerMargin: 0,
      };
    }

    monthlyData[monthKey].retailSales += entry.retailSales;
    monthlyData[monthKey].wholesaleSales += entry.wholesaleSales;
    monthlyData[monthKey].unitsSold += entry.unitsSold;
    monthlyData[monthKey].retailerMargin += entry.retailerMargin;
  }

  return Object.values(monthlyData);
}

function getChartData(sales: Sale[]) {
  const monthlySales = aggregateSalesByMonth(sales);
  const labels = monthlySales.map((item) => item.month);
  const retailSales = monthlySales.map((item) => item.retailSales);
  const wholesaleSales = monthlySales.map((item) => item.wholesaleSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Retail Sales",
        data: retailSales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Wholesale Sales",
        data: wholesaleSales,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return chartData;
}

/**
 * Component that displays a line chart of sales data over time and a table of sales data.
 */
export function ProductSales(props: { sales: Sale[] }) {
  const [sortConfig, setSortConfig] = useState<Config>({
    key: "weekEnding",
    direction: "ascending",
  });

  const [data, setData] = useState(props.sales);

  const handleSort = (key: keyof Sale) => {
    let direction: Direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...props.sales].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Sale) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "▼";
  };

  const chartData = getChartData(data);

  return (
    <div className="productSales">
      <div className="chartContainer">
        <div className="chart">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className="tableContainer">
        <table>
          <thead>
            <td onClick={() => handleSort("weekEnding")}>
              Week ending {getSortIndicator("weekEnding")}
            </td>
            <td onClick={() => handleSort("retailSales")}>
              Retail Sales {getSortIndicator("retailSales")}
            </td>
            <td onClick={() => handleSort("wholesaleSales")}>
              Wholesale Sales {getSortIndicator("wholesaleSales")}
            </td>
            <td onClick={() => handleSort("unitsSold")}>
              Units Sold {getSortIndicator("unitsSold")}
            </td>
            <td onClick={() => handleSort("retailerMargin")}>
              Retailer Margin {getSortIndicator("retailerMargin")}
            </td>
          </thead>
          <tbody>
            {data.map((sale) => (
              <tr>
                <td>{sale.weekEnding}</td>
                <td>{sale.retailSales}</td>
                <td>{sale.wholesaleSales}</td>
                <td>{sale.unitsSold}</td>
                <td>{sale.retailerMargin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
