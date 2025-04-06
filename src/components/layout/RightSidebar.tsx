
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const RightSidebar = () => {
  // Mock data
  const suggestedUsers = [
    { id: 1, name: "Sarah Chen", username: "sarahchef", avatar: "/placeholder.svg" },
    { id: 2, name: "Mike Johnson", username: "mike_eats", avatar: "/placeholder.svg" },
    { id: 3, name: "Priya Patel", username: "priya_cooks", avatar: "/placeholder.svg" },
    { id: 4, name: "Tom Wilson", username: "foodie_tom", avatar: "/placeholder.svg" },
  ];

  const popularGroups = [
    { id: 1, name: "Vegan Delights", members: 2345 },
    { id: 2, name: "Italian Cuisine Lovers", members: 1876 },
    { id: 3, name: "Baking Enthusiasts", members: 3421 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Suggested Food Creators</h3>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <img src={user.avatar} alt={user.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-gray-500 text-xs">@{user.username}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/explore" className="text-food-primary hover:underline text-sm">
            See more suggestions
          </Link>
        </div>
      </Card>

      <Card className="p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Popular Food Groups</h3>
        <div className="space-y-3">
          {popularGroups.map((group) => (
            <div key={group.id} className="group hover:bg-gray-50 p-2 rounded-md transition-colors">
              <Link to={`/groups/${group.id}`}>
                <p className="font-medium">{group.name}</p>
                <p className="text-gray-500 text-sm">{group.members.toLocaleString()} members</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/groups" className="text-food-primary hover:underline text-sm">
            Discover more groups
          </Link>
        </div>
      </Card>

      <Card className="p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">FoodFlair Trends</h3>
        <ul className="space-y-2">
          <li><Link to="/tags/homecooking" className="text-food-primary hover:underline">#HomeCooking</Link></li>
          <li><Link to="/tags/foodphotography" className="text-food-primary hover:underline">#FoodPhotography</Link></li>
          <li><Link to="/tags/farmtotable" className="text-food-primary hover:underline">#FarmToTable</Link></li>
        </ul>
      </Card>
    </div>
  );
};

export default RightSidebar;
