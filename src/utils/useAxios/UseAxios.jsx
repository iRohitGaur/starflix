import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "context/auth-context/auth-context";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const useAxios = () => {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common.Authorization = auth.token;
    }
  }, [auth?.token]);

  const operation = async (params) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      return result.data;
    } catch (error) {
      if (error.response && error.response.data?.error) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return new Error(error.response.data.error);
      }
      return new Error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, operation };
};
