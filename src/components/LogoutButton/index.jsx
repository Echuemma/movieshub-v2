import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";

const LogoutButton = ({ className = "", variant = "default" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show toast notification
    }
  };

  // Different button styles
  const variants = {
    default: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors",
    outline: "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md transition-colors",
    text: "text-red-600 hover:text-red-800 underline cursor-pointer",
    icon: "p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${variants[variant]} ${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title="Logout"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Logging out...</span>
        </div>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default LogoutButton;