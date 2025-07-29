import axios from 'axios';
import Cookies from 'js-cookie';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
});

// Automatically add token to request headers
apiInstance.interceptors.request.use((config) => {
  const token = Cookies.get('hitnflop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Api = {
  login: (data) => apiInstance.post('/auth/login', data).then((res) => res.data),
  signup: (data) => apiInstance.post('/auth/signup', data).then((res) => res.data),
  profile: () => apiInstance.get('/user/profile').then((res) => res.data),
  resetPassword: (data) => apiInstance.post('/auth/reset-password', data).then((res) => res.data),
  updatePassword: (data) => apiInstance.post('/auth/update-password', data).then((res) => res.data),
};

export default Api;


// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/v1';

// const Api = {
//   signup: (data) => axios.post(`${BASE_URL}/user/register`, data),
//   login: (data) => axios.post(`${BASE_URL}/login`, data),
//   getProfile: () => axios.get(`${BASE_URL}/profile`),
// };

// export default Api;

// const Api = {
//     login: (data) => axios.post('/api/auth/login', data).then(res => res.data),
//     signup: (data) => axios.post('/api/auth/signup', data).then(res => res.data),
//     profile: () => axios.get('/api/auth/profile').then(res => res.data),
//     resetPassword: (emailOrPhone) => axios.post('/api/auth/reset-password', emailOrPhone).then(res => res.data),
//     updatePassword: (passwordData) => axios.put('/api/auth/update-password', passwordData).then(res => res.data),
// };

// export default Api;
