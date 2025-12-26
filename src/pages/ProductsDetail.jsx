import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchProducts, updateProduct, deleteProduct } from "../api/productApi";
import toast from "react-hot-toast";
import { confirmDelete } from "../components/ConfirmDelete";

function ProductsDetail() {
  const { id } = useParams();
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const product = data.find((p) => p.id === Number(id));

  if (isLoading) return <p className="text-center">Loading...</p>;

  return <ProductEditor key={product.id} product={product} />;
}

export default ProductsDetail;

function ProductEditor({ product }) {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: (_res, variables) => {
      qc.setQueryData(["products"], (old = []) =>
        old.map((p) =>
          p.id === variables.id ? { ...p, ...variables.data } : p
        )
      );
      toast.success("Product updated successfully!");
      navigate("/products");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: (_, deletedId) => {
      qc.setQueryData(["products"], (old = []) =>
        old.filter((p) => p.id !== deletedId)
      );
      toast.success("Product deleted successfully!");
      navigate("/products");
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <div className="rounded-xl p-6 shadow-2xl">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl text-bold font-bold">{product.title}</h1>

          <p className="text-yellow-300">{product.description}</p>

          <div className="text-sm text-white">
            ⭐ {product.rating?.rate || 5} ({product.rating?.count || 100}{" "}
            reviews)
          </div>

          <div className="space-y-3 pt-4">
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border px-3 py-2 text-white"
            />

            <label className="block text-sm font-medium text-white">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded border px-3 py-2 text-white"
            />
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              disabled={updateMutation.isPending}
              onClick={() =>
                updateMutation.mutate({
                  id: product.id,
                  data: {
                    title,
                    price,
                    description: product.description,
                    category: product.category,
                  },
                })
              }
              className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              Update Product
            </button>

            <button
              onClick={() =>
                confirmDelete({
                  message: "Are you sure? This action cannot be undone.",
                  onConfirm: () => deleteMutation.mutate(product.id),
                })
              }
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete Product
            </button>

            <button
              onClick={() => navigate(-1)}
              className="text-sm text-center bg-green-400 text-white py-2 rounded hover:bg-green-700"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
