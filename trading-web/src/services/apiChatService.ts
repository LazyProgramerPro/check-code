import axios from 'axios';
import { chatconfig } from '../config';
import { authService } from './authService';

const apiChatClient = axios.create(chatconfig.api);

// Request interceptor
apiChatClient.interceptors.request.use(
  (chatconfig: any) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      chatconfig.headers.common.Authorization = `${accessToken}`;
    }

    chatconfig.headers.common['Content-Type'] = 'application/json';
    chatconfig.headers.common['Accept'] = 'application/json';

    return chatconfig;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiChatClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Clear local storage data and redirect to login page if request is 401 - Unauthorized
    if (error.response.status === 401) {
      authService.removeAccessToken();
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default apiChatClient;
