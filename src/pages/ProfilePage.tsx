
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Grid, List, MapPin, Edit } from "lucide-react";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Mock user data
  const user = {
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
  const posts = [
    {
      id: "post1",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar
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
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar
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
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar
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
  const savedPosts = [posts[1]];
  
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
                  <Button className="mt-2 md:mt-0 bg-food-primary hover:bg-food-primary/90">
                    Follow
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
                {posts.map(post => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {posts.map(post => (
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
                ))}
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
