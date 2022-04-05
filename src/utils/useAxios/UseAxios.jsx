import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "";

export const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const operation = async (params) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors[0]);
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, operation };
};
