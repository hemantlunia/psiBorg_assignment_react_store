export const ErrorFallBack = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="p-6 rounded-xl bg-white shadow text-center space-y-3">
        <h1 className="text-xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-600">
          The page crashed. Please refresh or try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reload
        </button>
      </div>
    </div>
  );
};
