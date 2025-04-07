
import axios, { AxiosRequestConfig } from 'axios';

// Base URL - update this to your Spring Boot server URL
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions for users
export const userApi = {
  login: (email: string, password: string) => 
    api.post('/users/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/users/register', userData),
  
  getProfile: (userId: string) => 
    api.get(`/users/${userId}`),
  
  updateProfile: (userId: string, profileData: any) => 
    api.put(`/users/${userId}`, profileData),
  
  followUser: (userId: string) => 
    api.post(`/users/${userId}/follow`),
  
  unfollowUser: (userId: string) => 
    api.delete(`/users/${userId}/follow`),
};

// API functions for posts
export const postApi = {
  getPosts: (page: number = 0, size: number = 10) => 
    api.get(`/posts?page=${page}&size=${size}`),
  
  getUserPosts: (userId: string, page: number = 0, size: number = 10) => 
    api.get(`/users/${userId}/posts?page=${page}&size=${size}`),
  
  getSavedPosts: (page: number = 0, size: number = 10) => 
    api.get(`/posts/saved?page=${page}&size=${size}`),
  
  getPost: (postId: string) => 
    api.get(`/posts/${postId}`),
  
  createPost: (postData: FormData) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/posts', postData, config);
  },
  
  likePost: (postId: string) => 
    api.post(`/posts/${postId}/like`),
  
  unlikePost: (postId: string) => 
    api.delete(`/posts/${postId}/like`),
  
  savePost: (postId: string) => 
    api.post(`/posts/${postId}/save`),
  
  unsavePost: (postId: string) => 
    api.delete(`/posts/${postId}/save`),
};

// API functions for comments
export const commentApi = {
  getComments: (postId: string) => 
    api.get(`/posts/${postId}/comments`),
  
  addComment: (postId: string, content: string) => 
    api.post(`/posts/${postId}/comments`, { content }),
  
  replyToComment: (postId: string, commentId: string, content: string) => 
    api.post(`/posts/${postId}/comments/${commentId}/replies`, { content }),
};

export default api;
