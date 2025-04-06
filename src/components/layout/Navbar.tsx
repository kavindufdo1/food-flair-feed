
import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, MessageSquare, Search, User, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="food-container flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-food-primary text-2xl font-bold">FoodFlair</span>
          </Link>
        </div>

        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center max-w-md w-full relative"
        >
          <Input
            type="search"
            placeholder="Search for users, recipes, or restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 text-gray-400 w-4 h-4" />
        </form>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/messages" aria-label="Messages">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/groups" aria-label="Groups">
              <Users className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile" aria-label="Profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
