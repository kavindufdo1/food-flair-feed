
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GroupCard from "@/components/groups/GroupCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock groups data
  const allGroups = [
    {
      id: "group1",
      name: "Vegan Delights",
      description: "A community for sharing delicious vegan recipes, restaurant finds, and tips for plant-based eating.",
      members: 3567,
      avatar: "/placeholder.svg"
    },
    {
      id: "group2",
      name: "Italian Cuisine Lovers",
      description: "Everything about Italian food - from authentic recipes to the best Italian restaurants around the world.",
      members: 2843,
      avatar: "/placeholder.svg"
    },
    {
      id: "group3",
      name: "Baking Enthusiasts",
      description: "For those who love to bake! Share your creations, recipes, and baking tips with fellow enthusiasts.",
      members: 5129,
      avatar: "/placeholder.svg"
    },
    {
      id: "group4",
      name: "Food Photography Tips",
      description: "Learn how to take stunning food photos for your blog or social media. Share tips, equipment recommendations, and critique.",
      members: 1854,
      avatar: "/placeholder.svg"
    },
    {
      id: "group5",
      name: "Restaurant Reviews",
      description: "Honest reviews of restaurants from food lovers around the world. Share your dining experiences and discover new places to try.",
      members: 4231,
      avatar: "/placeholder.svg"
    },
    {
      id: "group6",
      name: "Cooking on a Budget",
      description: "Affordable recipes, meal planning tips, and strategies for eating well without breaking the bank.",
      members: 3124,
      avatar: "/placeholder.svg"
    }
  ];
  
  const yourGroups = [
    {
      id: "group1",
      name: "Vegan Delights",
      description: "A community for sharing delicious vegan recipes, restaurant finds, and tips for plant-based eating.",
      members: 3567,
      avatar: "/placeholder.svg",
      joined: true
    },
    {
      id: "group3",
      name: "Baking Enthusiasts",
      description: "For those who love to bake! Share your creations, recipes, and baking tips with fellow enthusiasts.",
      members: 5129,
      avatar: "/placeholder.svg",
      joined: true
    }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for groups:", searchTerm);
    // Here we would normally perform the search
  };

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Food Groups</h1>
          <Button asChild className="bg-food-primary hover:bg-food-primary/90">
            <Link to="/groups/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6 relative">
          <Input
            type="search"
            placeholder="Search for food groups..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </form>
        
        <Tabs defaultValue="discover">
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="yourGroups">Your Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allGroups.map(group => (
              <GroupCard key={group.id} {...group} />
            ))}
          </TabsContent>
          
          <TabsContent value="yourGroups">
            {yourGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {yourGroups.map(group => (
                  <GroupCard key={group.id} {...group} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">You haven't joined any groups yet</p>
                <Button>Discover Groups</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GroupsPage;
