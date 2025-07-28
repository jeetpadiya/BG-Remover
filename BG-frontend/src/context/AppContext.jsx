// AppContextProvider.jsx

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(!!Cookies.get("token") || "");
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [resultImage, setResultImage] = useState(null);


  const BACKEND_URL = "http://localhost:4000";

  // Shared Axios config
  const axiosConfig = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const handleRegister = async ({username, email, password}) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        { username, email, password },
        axiosConfig
      );

      if (data.success) {
        Cookies.set("token", data.token, { expires: 7 });
        setToken(data.token);
        setUser(data.user);
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
        Cookies.set("token", data.token, { expires: 7, sameSite: "Lax" });
        setToken(data.token);
        setUser(data.user);
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
    setImage(imageFile)
    try {
      const formData = new FormData();
      formData.append("image", imageFile);


      // Let Axios set multipart boundaries for you
      const { data } = await axios.post(
        `${BACKEND_URL}/api/images/remove-bg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            // Do NOT manually set 'Content-Type' for FormData
          },
        }
      );

      if (data.success) {
        setResultImage(data.resultImage);      // 👈 set base64 image in context
        toast.success("Background removed");
        navigate("/result");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Background removal failed");
    }
  };

  const value = {
    handleRegister,
    handleLogin,
    removeBg,
    token,
    user,
    resultImage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;