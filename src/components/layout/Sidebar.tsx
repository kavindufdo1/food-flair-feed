
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Users, Search, Heart, Image } from "lucide-react";

const Sidebar = () => {
  return (
    <Card className="p-4 shadow-sm">
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/" className="flex items-center space-x-3">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/profile" className="flex items-center space-x-3">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/explore" className="flex items-center space-x-3">
            <Search className="h-5 w-5" />
            <span>Explore</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/saved" className="flex items-center space-x-3">
            <Heart className="h-5 w-5" />
            <span>Saved Posts</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/groups" className="flex items-center space-x-3">
            <Users className="h-5 w-5" />
            <span>Food Groups</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/create" className="flex items-center space-x-3">
            <Image className="h-5 w-5" />
            <span>Create Post</span>
          </Link>
        </Button>
      </nav>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button className="w-full bg-food-primary hover:bg-food-primary/90" asChild>
          <Link to="/create">
            Create Post
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default Sidebar;
