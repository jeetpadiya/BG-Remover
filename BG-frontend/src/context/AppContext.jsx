import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("bg-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      localStorage.removeItem("bg-user");
      return null;
    }
  });
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const axiosConfig = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("bg-user", JSON.stringify(user));
      return;
    }

    localStorage.removeItem("bg-user");
  }, [user]);

  const storeAuth = (data) => {
    const nextToken = data.token || "";
    const nextUser = data.user || data.User || null;

    if (nextToken) {
      Cookies.set("token", nextToken, { expires: 7, sameSite: "Lax" });
    }

    setToken(nextToken);
    setUser(nextUser);
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        { username, email, password },
        axiosConfig
      );

      if (data.success) {
        storeAuth(data);
        toast.success(data.message || "Registered Successfully");
        navigate("/");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(msg);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        { email, password },
        axiosConfig
      );

      if (data.success) {
        storeAuth(data);
        toast.success(data.message || "Logged in Successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(msg);
    }
  };

  const removeBg = async (imageFile) => {
    if (!imageFile) {
      return;
    }

    if (!Cookies.get("token")) {
      toast.error("Please log in before uploading an image");
      navigate("/login");
      return;
    }

    setImage(imageFile);
    setResultImage(null);
    setIsRemovingBg(true);
    navigate("/result");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post(
        `${BACKEND_URL}/api/images/remove-bg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setResultImage(data.resultImage);
        toast.success("Background removed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Background removal failed";
      toast.error(msg);
    } finally {
      setIsRemovingBg(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    setUser(null);
    setImage(null);
    setResultImage(null);
    setIsRemovingBg(false);
    toast.success("Logged out");
    navigate("/");
  };

  const value = {
    handleRegister,
    handleLogin,
    handleLogout,
    removeBg,
    token,
    user,
    image,
    resultImage,
    isRemovingBg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
