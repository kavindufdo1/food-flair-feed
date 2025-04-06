
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/posts/PostCard";
import UserCard from "@/components/users/UserCard";
import CreatePostForm from "@/components/posts/CreatePostForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Users } from "lucide-react";

const GroupDetailPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  
  // Mock group data
  const group = {
    id: groupId || "group1",
    name: "Vegan Delights",
    description: "A community for sharing delicious vegan recipes, restaurant finds, and tips for plant-based eating. Connect with other plant-based food enthusiasts and discover new dishes to try!",
    members: 3567,
    avatar: "/placeholder.svg",
    banner: "/placeholder.svg",
    isJoined: true
  };
  
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
      content: "Just made this amazing vegan lasagna with cashew ricotta! It was a hit even with my non-vegan friends. Recipe in the comments!",
      images: ["/placeholder.svg"],
      likes: 56,
      comments: 12,
      timestamp: "2 hours ago"
    },
    {
      id: "post2",
      user: {
        id: "user2",
        name: "Mark Davis",
        username: "foodie_mark",
        avatar: "/placeholder.svg"
      },
      content: "Found this new vegan café downtown that has the most incredible plant-based pastries. Their croissants are unbelievably buttery despite being 100% vegan!",
      images: ["/placeholder.svg", "/placeholder.svg"],
      likes: 83,
      comments: 9,
      timestamp: "1 day ago",
      location: "Green Leaf Café, Portland",
      rating: 5
    }
  ];
  
  // Mock members data
  const members = [
    {
      id: "user1",
      name: "Julia Chen",
      username: "juliachef",
      avatar: "/placeholder.svg",
      bio: "Vegan chef and food photographer"
    },
    {
      id: "user2",
      name: "Mark Davis",
      username: "foodie_mark",
      avatar: "/placeholder.svg",
      bio: "Plant-based since 2018"
    },
    {
      id: "user3",
      name: "Sophia Kim",
      username: "sophiaeats",
      avatar: "/placeholder.svg",
      bio: "Exploring vegan cuisine around the world"
    },
    {
      id: "user4",
      name: "Alex Johnson",
      username: "chefalex",
      avatar: "/placeholder.svg",
      bio: "Professional chef | Vegan recipe developer"
    }
  ];

  return (
    <MainLayout showSidebars={false}>
      <div className="max-w-5xl mx-auto">
        {/* Group Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {group.banner && (
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={group.banner} 
                alt={`${group.name} banner`} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="h-20 w-20">
                <img src={group.avatar} alt={group.name} />
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h1 className="text-2xl font-bold">{group.name}</h1>
                  
                  <Button 
                    variant={group.isJoined ? "outline" : "default"}
                    className={group.isJoined ? "mt-2 md:mt-0 border-food-primary text-food-primary" : "mt-2 md:mt-0 bg-food-primary hover:bg-food-primary/90"}
                  >
                    {group.isJoined ? "Joined" : "Join Group"}
                  </Button>
                </div>
                
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{group.members.toLocaleString()} members</span>
                </div>
                
                <p className="text-gray-600">{group.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Group Content */}
        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            {group.isJoined && (
              <CreatePostForm />
            )}
            
            {posts.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </TabsContent>
          
          <TabsContent value="members" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map(member => (
              <UserCard key={member.id} {...member} />
            ))}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About {group.name}</h2>
              <p className="mb-6">{group.description}</p>
              
              <h3 className="text-lg font-medium mb-2">Group Rules</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Be respectful and kind to all members</li>
                <li>Only share vegan food content (no animal products)</li>
                <li>No promotional content without admin approval</li>
                <li>Share recipes and sources when possible</li>
                <li>Keep discussions food-related</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">Created</h3>
              <p>January 15, 2023</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GroupDetailPage;
