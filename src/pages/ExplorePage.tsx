
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import UserCard from "@/components/users/UserCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock posts data
  const posts = [
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
        id: "user2",
        name: "Mark Davis",
        username: "foodie_mark",
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
        id: "user3",
        name: "Sophia Kim",
        username: "sophiaeats",
        avatar: "/placeholder.svg"
      },
      content: "Weekend brunch vibes at Sunrise Cafe. Their avocado toast is next level - perfectly toasted sourdough, ripe avocado, poached eggs, and that chili oil drizzle just brings everything together!",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      likes: 87,
      comments: 12,
      timestamp: "1 day ago",
      location: "Sunrise Cafe, Seattle",
      rating: 4
    }
  ];
  
  // Mock users data
  const users = [
    {
      id: "user1",
      name: "Julia Chen",
      username: "juliachef",
      avatar: "/placeholder.svg",
      bio: "Food photographer & home chef 📸🍽️",
      followers: 1253,
      posts: 87
    },
    {
      id: "user2",
      name: "Mark Davis",
      username: "foodie_mark",
      avatar: "/placeholder.svg",
      bio: "Exploring local eateries and cooking at home",
      followers: 843,
      posts: 52
    },
    {
      id: "user3",
      name: "Sophia Kim",
      username: "sophiaeats",
      avatar: "/placeholder.svg",
      bio: "Pastry chef sharing recipes and restaurant finds",
      followers: 1587,
      posts: 124
    },
    {
      id: "user4",
      name: "Alex Johnson",
      username: "chefalex",
      avatar: "/placeholder.svg",
      bio: "Professional chef | Food enthusiast | Recipe developer",
      followers: 5234,
      posts: 216
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Here we would normally perform the search
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Explore</h1>
        
        <form onSubmit={handleSearch} className="mb-6 relative">
          <Input
            type="search"
            placeholder="Search for users, recipes, or restaurants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Button type="submit" className="absolute right-0 top-0 rounded-l-none">
            Search
          </Button>
        </form>
        
        <Tabs defaultValue="trending">
          <TabsList className="mb-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </TabsContent>
          
          <TabsContent value="people" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(user => (
              <UserCard key={user.id} {...user} />
            ))}
          </TabsContent>
          
          <TabsContent value="nearby" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">Enable location services to see nearby food spots</p>
              <Button>Enable Location</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
