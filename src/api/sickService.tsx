import axiosClient from '@/Client/axiosClient';

const baseURL = 'http://localhost:4000';

export const getSickList = async (query: string) => {
  try {
    const response = await axiosClient(`${baseURL}/sick?q=${query}`).get();
    console.log(response);
    return response.data.slice(0, 7);
  } catch (error) {
    throw new Error(error);
  }
};
