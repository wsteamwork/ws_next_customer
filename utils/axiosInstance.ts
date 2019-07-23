import axiosBase, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

export type AxiosRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const CUSTOMER_URL = process.env.API_URL + 'customer-api/';

const cookies = new Cookies();

const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + cookies.get('_token'),
  'Content-Language': 'en-EN'
};

const instance: AxiosInstance = axiosBase.create({
  baseURL: CUSTOMER_URL,
  withCredentials: true,
  headers
});

export const axios = instance;
