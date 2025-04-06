
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  members: number;
  avatar?: string;
  banner?: string;
  joined?: boolean;
}

const GroupCard = ({
  id,
  name,
  description,
  members,
  avatar = "/placeholder.svg",
  banner,
  joined = false
}: GroupCardProps) => {
  const [isJoined, setIsJoined] = useState(joined);
  const [memberCount, setMemberCount] = useState(members);

  const handleJoinToggle = () => {
    if (isJoined) {
      setMemberCount(memberCount - 1);
    } else {
      setMemberCount(memberCount + 1);
    }
    setIsJoined(!isJoined);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {banner && (
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={banner} 
            alt={`${name} banner`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <img src={avatar} alt={name} />
          </Avatar>
          <div className="flex-1">
            <Link to={`/groups/${id}`} className="hover:underline">
              <h3 className="font-semibold text-lg">{name}</h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{memberCount.toLocaleString()} members</span>
            </div>
          </div>
          
          <Button
            variant={isJoined ? "outline" : "default"}
            size="sm"
            onClick={handleJoinToggle}
            className={isJoined ? "border-food-primary text-food-primary" : "bg-food-primary hover:bg-food-primary/90"}
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Card>
  );
};

export default GroupCard;
