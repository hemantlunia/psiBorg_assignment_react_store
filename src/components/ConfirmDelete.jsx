import toast from "react-hot-toast";

export const confirmDelete = ({ onConfirm, message }) => {
  toast((t) => (
    <div className="space-y-3">
      <p className="font-semibold">{message}</p>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
  });
};
