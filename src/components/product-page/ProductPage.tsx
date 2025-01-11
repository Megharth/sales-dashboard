import { Sale } from "../../App";
import "./ProductPage.css";
import { ProductOverview } from "./product-overview/ProductOverview";
import { ProductSales } from "./product-sales/ProductSales";

interface ProductPageProps {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tags: string[];
  sales: Sale[];
}

/**
 * Component that displays the product overview and sales data for a product.
 */
export function ProductPage(props: ProductPageProps) {
  return (
    <div id={props.id} className="productPage">
      <ProductOverview
        id={props.id}
        image={props.image}
        title={props.title}
        subtitle={props.subtitle}
        tags={props.tags}
      />
      <ProductSales sales={props.sales} />
    </div>
  );
}
