import { useNavigate } from "react-router";

function Productcard({ product }) {
  const rupeeSymbol = import.meta.env.VITE_RUPEE_SYMBOL;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product?.id}`)}
      className="
        group
        relative
        cursor-pointer
        rounded-xl
        border border-white/10
        bg-white/80
        backdrop-blur
        p-4
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-black/10
      "
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={product?.image}
          alt="product image"
          className="
            h-40
            w-full
            object-contain
            transition-transform
            duration-300
            ease-out
            group-hover:scale-105
          "
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product?.title || "Title not found"}
        </h3>

        <p className="text-base font-bold text-indigo-600">
          {rupeeSymbol} {product?.price || "N/A"}
        </p>

        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product?.category || "Uncategorized"}
        </p>
      </div>
    </div>
  );
}

export default Productcard;
