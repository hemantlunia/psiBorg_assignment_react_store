import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/productApi";
import Loader from "../components/Loader";
import Productcard from "../components/Productcard.jsx";
import { useNavigate } from "react-router";
import ProductCards from "../components/ProductCards.jsx";

const ITEMS_PER_PAGE = 8;

function Products() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = useMemo(() => {
    return data.filter((p) =>
      p?.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleBack = () => {
    setSearch("");
    setCurrentPage(1);
    navigate("/products");
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500">Error loading products...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 mb-6 w-full md:w-1/3 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-20">
          <p className="font-semibold text-gray-600">
            No products found. Try another keyword.
          </p>
          <button
            onClick={handleBack}
            className="mt-6 px-6 py-2 rounded-full bg-indigo-600 text-white"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((p) => (
              <ProductCards key={p.id} product={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`border px-3 py-1 rounded disabled:opacity-40 ${currentPage ===1 ? "cursor-progress":""}`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border hover:bg-green-300 ${
                      page === currentPage
                        ? "bg-green-600 text-white"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`border px-3 py-1 rounded disabled:opacity-40 ${currentPage ===totalPages ? "cursor-progress":""}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
