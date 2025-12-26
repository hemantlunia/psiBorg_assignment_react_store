import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900 px-4">
      <div
        className="
          max-w-md
          w-full
          text-center
          rounded-2xl
          border border-white/10
          bg-white/10
          backdrop-blur-xl
          p-10
          shadow-2xl
        "
      >
        <h1 className="text-7xl font-extrabold text-white tracking-wider">
          404
        </h1>

        <p className="mt-2 text-xl font-semibold text-gray-200">
          Page not found
        </p>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/products")}
            className="
              w-full
              rounded-lg
              bg-indigo-600
              hover:bg-indigo-700
              py-2.5
              font-semibold
              text-white
              transition
              active:scale-[0.98]
            "
          >
            Go to Products
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              w-full
              rounded-lg
              border border-white/20
              py-2.5
              text-gray-200
              hover:bg-white/10
              transition
            "
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
