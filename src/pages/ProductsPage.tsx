import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import StatusMessage from "../components/StatusMessage";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data, isLoading, isError, error, refetch, isFetching } = useProducts();

  const categories = useMemo(() => {
    const values = data?.products.map((product) => product.category) ?? [];
    return ["all", ...Array.from(new Set(values)).sort()];
  }, [data]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return (data?.products ?? []).filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(term);
      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [data, search, category]);

  return (
    <section>
      <div className="page-hero">
        <div>
          <p className="eyebrow">Task 02 · Product Explorer</p>
          <h1>Product Explorer</h1>
          <p className="hero-text">
            Search and filter products while TanStack Query handles the API state.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "↻ Refresh Products"}
        </button>
      </div>

      <div className="toolbar product-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products by name..."
          />
        </div>

        <select
          className="select-control"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <StatusMessage
          type="loading"
          title="Loading products..."
          message="Fetching data from DummyJSON."
        />
      )}

      {isError && (
        <StatusMessage
          type="error"
          title="Unable to load products"
          message={error instanceof Error ? error.message : "Something went wrong."}
          action={
            <button className="primary-button small" onClick={() => refetch()}>
              Try Again
            </button>
          }
        />
      )}

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <StatusMessage
          type="empty"
          title="No Products Found"
          message="Try changing the search term or category."
        />
      )}

      {!isLoading && !isError && filteredProducts.length > 0 && (
        <>
          <div className="section-heading">
            <h2>Products</h2>
            <span>{filteredProducts.length} products</span>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}