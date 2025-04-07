
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Grid, List, MapPin, Edit } from "lucide-react";
import { userApi, postApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  // For testing UI without backend, use mock data
  const useMockData = true; // Set to false when your backend is ready
  
  // Mock user data
  const mockUser = {
    id: userId || "user1",
    name: "Julia Chen",
    username: "juliachef",
    avatar: "/placeholder.svg",
    bio: "Food photographer & home chef 📸🍽️ Sharing culinary adventures from my kitchen and beyond.",
    location: "New York City",
    followers: 1253,
    following: 435,
    isCurrentUser: !userId || userId === "user1"
  };
  
  // Mock posts data
  const mockPosts = [
    {
      id: "post1",
      user: {
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        avatar: mockUser.avatar
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
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        avatar: mockUser.avatar
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
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        avatar: mockUser.avatar
      },
      content: "Weekend brunch vibes at Sunrise Cafe. Their avocado toast is next level!",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      likes: 87,
      comments: 12,
      timestamp: "1 day ago",
      location: "Sunrise Cafe, Seattle",
      rating: 4
    }
  ];

  // Mock saved posts
  const mockSavedPosts = [mockPosts[1]];
  
  // Fetch user data and posts from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (useMockData) {
        setUser(mockUser);
        setPosts(mockPosts);
        setSavedPosts(mockSavedPosts);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const profileId = userId || 'current'; // Use 'current' to get current user if no userId provided
        const userResponse = await userApi.getProfile(profileId);
        setUser(userResponse.data);
        
        // Fetch user posts
        const postsResponse = await postApi.getUserPosts(userResponse.data.id);
        setPosts(postsResponse.data.content || []);
        
        // Fetch saved posts if it's the current user
        if (userResponse.data.isCurrentUser) {
          const savedResponse = await postApi.getSavedPosts();
          setSavedPosts(savedResponse.data.content || []);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
        
        // Fallback to mock data on error
        setUser(mockUser);
        setPosts(mockPosts);
        setSavedPosts(mockSavedPosts);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId, toast]);
  
  const handleFollowToggle = async () => {
    if (useMockData) {
      setIsFollowing(!isFollowing);
      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: `You are ${isFollowing ? "no longer following" : "now following"} ${mockUser.name}`,
      });
      return;
    }
    
    try {
      if (isFollowing) {
        await userApi.unfollowUser(user.id);
        setIsFollowing(false);
      } else {
        await userApi.followUser(user.id);
        setIsFollowing(true);
      }
      
      // Update followers count
      setUser(prev => ({
        ...prev,
        followers: isFollowing ? prev.followers - 1 : prev.followers + 1
      }));
      
      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: `You are ${isFollowing ? "no longer following" : "now following"} ${user.name}`,
      });
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout showSidebars={false}>
        <div className="max-w-4xl mx-auto p-6 flex justify-center">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!user) {
    return (
      <MainLayout showSidebars={false}>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="text-gray-500 mt-2">The profile you are looking for does not exist.</p>
          <Button asChild className="mt-4">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout showSidebars={false}>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <img src={user.avatar} alt={user.name} />
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
                
                {user.isCurrentUser ? (
                  <Button asChild className="mt-2 md:mt-0">
                    <Link to="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    className={`mt-2 md:mt-0 ${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-food-primary hover:bg-food-primary/90'}`}
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
              </div>
              
              <p className="mb-4">{user.bio}</p>
              
              {user.location && (
                <p className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </p>
              )}
              
              <div className="flex space-x-6">
                <div>
                  <span className="font-bold">{posts.length}</span>
                  <span className="text-gray-500 ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-bold">{user.followers}</span>
                  <span className="text-gray-500 ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{user.following}</span>
                  <span className="text-gray-500 ml-1">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="posts" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-gray-100" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-gray-100" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="posts">
            {viewMode === "list" ? (
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <PostCard key={post.id} {...post} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No posts yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/post/${post.id}`} 
                      className="aspect-square relative overflow-hidden"
                    >
                      <img 
                        src={post.images?.[0] || "/placeholder.svg"} 
                        alt="Post thumbnail" 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">No posts yet</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {viewMode === "list" ? (
              <div className="space-y-6">
                {savedPosts.length > 0 ? (
                  savedPosts.map(post => (
                    <PostCard key={post.id} {...post} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No saved posts yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {savedPosts.length > 0 ? (
                  savedPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/post/${post.id}`} 
                      className="aspect-square relative overflow-hidden"
                    >
                      <img 
                        src={post.images?.[0] || "/placeholder.svg"} 
                        alt="Post thumbnail" 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">No saved posts yet</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
