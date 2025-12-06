import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You must log in first");
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/api/auth/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-4">
          {user ? `Welcome, ${user.name || user.email}!` : "Loading..."}
        </h1>

        <p className="text-gray-600 mb-6">
          You have successfully logged into the Dashboard.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
