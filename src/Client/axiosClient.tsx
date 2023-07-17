import axios from 'axios';

const axiosClient = (baseURL: string, options: any) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...options.header,
    },
  });
};

export default axiosClient;
