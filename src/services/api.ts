
import axios, { AxiosRequestConfig } from 'axios';

// Create axios instance with mock mode
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

// Mock handlers to simulate API responses
const mockResponses = {
  userProfile: {
    id: "user1",
    name: "Julia Chen",
    username: "juliachef",
    avatar: "/placeholder.svg",
    bio: "Food photographer & home chef 📸🍽️ Sharing culinary adventures from my kitchen and beyond.",
    location: "New York City",
    followers: 1253,
    following: 435,
    isCurrentUser: true
  },
  
  posts: [
    {
      id: "post1",
      user: {
        id: "user1",
        name: "Julia Chen",
        username: "juliachef",
        avatar: "/placeholder.svg"
      },
      content: "Just tried this amazing pasta at Villa Roma! The carbonara was perfectly creamy with just the right amount of pepper. Definitely recommend trying it if you're in the area.",
      images: ["/placeholder.svg", "/placeholder.svg"],
      likes: 42,
      comments: 7,
      timestamp: "3 hours ago",
      location: "Villa Roma, New York",
      rating: 5
    },
    {
      id: "post2",
      user: {
        id: "user1",
        name: "Julia Chen",
        username: "juliachef",
        avatar: "/placeholder.svg"
      },
      content: "Made my grandma's secret recipe cookies today. These chocolate chip beauties came out perfect! Crispy on the outside, gooey on the inside. \n\nSecret ingredient? A pinch of sea salt on top before baking! 🍪✨",
      images: ["/placeholder.svg"],
      likes: 128,
      comments: 24,
      timestamp: "5 hours ago"
    },
    {
      id: "post3",
      user: {
        id: "user1",
        name: "Julia Chen",
        username: "juliachef",
        avatar: "/placeholder.svg"
      },
      content: "Weekend brunch vibes at Sunrise Cafe. Their avocado toast is next level!",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      likes: 87,
      comments: 12,
      timestamp: "1 day ago",
      location: "Sunrise Cafe, Seattle",
      rating: 4
    }
  ],
  
  savedPosts: [
    {
      id: "post2",
      user: {
        id: "user1",
        name: "Julia Chen",
        username: "juliachef",
        avatar: "/placeholder.svg"
      },
      content: "Made my grandma's secret recipe cookies today. These chocolate chip beauties came out perfect! Crispy on the outside, gooey on the inside. \n\nSecret ingredient? A pinch of sea salt on top before baking! 🍪✨",
      images: ["/placeholder.svg"],
      likes: 128,
      comments: 24,
      timestamp: "5 hours ago"
    }
  ]
};

// API functions for users - using mock data
export const userApi = {
  login: (email: string, password: string) => {
    // Return mock success response
    return Promise.resolve({ 
      data: { 
        token: "mock-auth-token",
        user: mockResponses.userProfile
      } 
    });
  },
  
  register: (userData: any) => {
    // Return mock success response
    return Promise.resolve({ 
      data: { 
        token: "mock-auth-token",
        user: { ...mockResponses.userProfile, ...userData }
      } 
    });
  },
  
  getProfile: (userId: string) => {
    // Return mock user profile
    return Promise.resolve({ data: mockResponses.userProfile });
  },
  
  updateProfile: (userId: string, profileData: any) => {
    // Return updated profile
    return Promise.resolve({ data: { ...mockResponses.userProfile, ...profileData } });
  },
  
  followUser: (userId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
  
  unfollowUser: (userId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
};

// API functions for posts - using mock data
export const postApi = {
  getPosts: (page: number = 0, size: number = 10) => {
    // Return mock posts
    return Promise.resolve({ data: { content: mockResponses.posts } });
  },
  
  getUserPosts: (userId: string, page: number = 0, size: number = 10) => {
    // Return mock user posts
    return Promise.resolve({ data: { content: mockResponses.posts } });
  },
  
  getSavedPosts: (page: number = 0, size: number = 10) => {
    // Return mock saved posts
    return Promise.resolve({ data: { content: mockResponses.savedPosts } });
  },
  
  getPost: (postId: string) => {
    // Return specific post
    const post = mockResponses.posts.find(p => p.id === postId);
    return Promise.resolve({ data: post });
  },
  
  createPost: (postData: FormData) => {
    // Return mock response
    return Promise.resolve({ 
      data: {
        id: "new-post-" + Date.now(),
        user: mockResponses.userProfile,
        content: postData.get('content'),
        images: ["/placeholder.svg"],
        likes: 0,
        comments: 0,
        timestamp: "Just now"
      }
    });
  },
  
  likePost: (postId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
  
  unlikePost: (postId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
  
  savePost: (postId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
  
  unsavePost: (postId: string) => {
    // Return success response
    return Promise.resolve({ data: { success: true } });
  },
};

// API functions for comments - using mock data
export const commentApi = {
  getComments: (postId: string) => {
    // Return mock empty comments array
    return Promise.resolve({ data: [] });
  },
  
  addComment: (postId: string, content: string) => {
    // Return mock comment
    return Promise.resolve({ 
      data: {
        id: "comment-" + Date.now(),
        content: content,
        user: mockResponses.userProfile,
        timestamp: "Just now"
      }
    });
  },
  
  replyToComment: (postId: string, commentId: string, content: string) => {
    // Return mock reply
    return Promise.resolve({ 
      data: {
        id: "reply-" + Date.now(),
        content: content,
        user: mockResponses.userProfile,
        timestamp: "Just now"
      }
    });
  },
};

export default api;
