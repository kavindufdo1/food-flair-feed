
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  following?: boolean;
  followers?: number;
  posts?: number;
}

const UserCard = ({
  id,
  name,
  username,
  avatar,
  bio,
  following = false,
  followers,
  posts
}: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const [followerCount, setFollowerCount] = useState(followers || 0);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${id}`} className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <img src={avatar} alt={name} />
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-gray-500 text-sm">@{username}</p>
          </div>
        </Link>
        
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={handleFollowToggle}
          className={isFollowing ? "border-food-primary text-food-primary" : "bg-food-primary hover:bg-food-primary/90"}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
      
      {bio && (
        <p className="mt-3 text-sm text-gray-600">{bio}</p>
      )}
      
      {(followers !== undefined || posts !== undefined) && (
        <div className="mt-3 flex space-x-4">
          {followers !== undefined && (
            <div className="text-sm">
              <span className="font-semibold">{followerCount}</span>
              <span className="text-gray-500 ml-1">Followers</span>
            </div>
          )}
          
          {posts !== undefined && (
            <div className="text-sm">
              <span className="font-semibold">{posts}</span>
              <span className="text-gray-500 ml-1">Posts</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default UserCard;
