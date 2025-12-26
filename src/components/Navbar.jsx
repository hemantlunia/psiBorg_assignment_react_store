import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth/login");
  const n = JSON.parse(localStorage.getItem("user"))
//   console.log(n);
  

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully.")
    navigate("/auth/login");
  };

  return (
    <nav className="bg-purple-mesh border-b shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/products" className="text-xl font-bold">
          YouStore{isLoggedIn && `, Welcome ${n?.email}`}
        </Link>

        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              {!isAuthPage ? (
                <Link
                  to="/auth/login"
                  className="bg-blue-400 font-bold hover:bg-blue-600 hover:text-green-500 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300"
                >
                  Login
                </Link>
              ):
               <Link
                to="/auth"
                className="bg-blue-400 font-bold hover:bg-blue-600 hover:text-green-500 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300"
              >
                Signup
              </Link>
              }

            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-400 hover:bg-red-500 text-black font-semibold px-4 py-2 rounded-2xl cursor-pointer transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
