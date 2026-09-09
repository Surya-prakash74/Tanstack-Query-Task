import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-content">
        <h3>{product.title}</h3>

        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">★ {product.rating.toFixed(1)}</span>
        </div>

        <div className="stock-row">
          <span>Stock</span>
          <strong>{product.stock}</strong>
        </div>
      </div>
    </article>
  );
}