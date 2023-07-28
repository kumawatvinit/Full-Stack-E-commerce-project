import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 400) {
      return Promise.resolve(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default customAxios;
