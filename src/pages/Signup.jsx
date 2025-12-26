import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    signup({ email, password });
    toast.success("Signup successful. Please login.");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          rounded-2xl
          border border-white/10
          bg-white/10
          backdrop-blur-xl
          p-8
          space-y-6
          shadow-2xl
        "
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Create Account
        </h1>
        <p className="text-center text-sm text-gray-300">
          Join us and get started
        </p>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            placeholder="yourEmail"
            className="
              w-full
              rounded-lg
              bg-white/10
              border border-white/20
              px-4
              py-2.5
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            required
            placeholder="•••"
            className="
              w-full
              rounded-lg
              bg-white/10
              border border-white/20
              px-4
              py-2.5
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Confirm Password</label>
          <input
            type="password"
            required
            placeholder="•••"
            className="
              w-full
              rounded-lg
              bg-white/10
              border border-white/20
              px-4
              py-2.5
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
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
          Create Account
        </button>

        <p
          onClick={() => navigate("/auth/login")}
          className="
            text-center
            text-sm
            text-gray-300
            cursor-pointer
            hover:text-white
            transition
            underline
          "
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
}
