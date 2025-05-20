import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post('/auth/refresh', {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data;
        localStorage.setItem('token', access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        message: error.response?.data?.message || 'An error occurred',
        status: error.response?.status || 500,
      };
    }
    throw error;
  }
};

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        message: error.response?.data?.message || 'An error occurred',
        status: error.response?.status || 500,
      };
    }
    throw error;
  }
};

export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        message: error.response?.data?.message || 'An error occurred',
        status: error.response?.status || 500,
      };
    }
    throw error;
  }
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        message: error.response?.data?.message || 'An error occurred',
        status: error.response?.status || 500,
      };
    }
    throw error;
  }
};

export default api; 