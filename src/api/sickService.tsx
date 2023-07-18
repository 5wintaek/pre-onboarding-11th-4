import axios from 'axios';
import axiosClient from '@/Client/axiosClient';
import { getSickURL } from '@/utils/sickUrl';

const baseURL = 'http://localhost:4000';

export const getSickList = async (query: string) => {
  console.log(`${baseURL}/sick?q=${query}`);

  try {
    const response = await axiosClient(`${baseURL}/sick?q=${query}`).get();

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
