import "./ProductOverview.css";

interface ProductOverviewProps {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tags: string[];
}

/**
 * Component that displays an image, title, subtitle, and tags for a product on the left side of the product page.
 */
export function ProductOverview(props: ProductOverviewProps) {
  return (
    <div className="productOverview">
      <img src={props.image} alt={props.title} />
      <div className="title">{props.title}</div>
      <div className="subtitle">{props.subtitle}</div>
      <div className="tags">
        {props.tags.map((tag, index) => (
          <div className="tag" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
