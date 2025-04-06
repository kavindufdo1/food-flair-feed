
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreHorizontal 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export interface PostProps {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  timestamp: string;
  location?: string;
  rating?: number;
}

const PostCard = ({
  id,
  user,
  content,
  images,
  likes,
  comments,
  timestamp,
  location,
  rating
}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card className="post-card mb-6">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to={`/profile/${user.id}`} className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <img src={user.avatar} alt={user.name} />
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <div className="flex text-gray-500 text-xs space-x-2">
                <span>{timestamp}</span>
                {location && (
                  <>
                    <span>•</span>
                    <span>{location}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 whitespace-pre-line">{content}</p>
        </div>

        {/* Rating */}
        {rating && (
          <div className="mb-4 flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg 
                key={index}
                className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Post Images */}
        {images && images.length > 0 && (
          <div className={`mb-4 grid gap-2 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-lg ${images.length === 1 ? 'col-span-1 aspect-video' : 'aspect-square'}`}
              >
                <img 
                  src={image} 
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex justify-between border-t border-b py-2 border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1"
            onClick={toggleComments}
          >
            <MessageSquare className="h-5 w-5" />
            <span>{comments}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <Share2 className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center space-x-1 ${saved ? 'text-food-primary' : ''}`}
            onClick={handleSave}
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            <CommentList postId={id} />
            <CommentForm postId={id} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
