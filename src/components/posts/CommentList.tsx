
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CommentProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  // Mock comments data
  const [comments, setComments] = useState<CommentProps[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "John Davis",
        avatar: "/placeholder.svg"
      },
      content: "This looks absolutely delicious! What spices did you use for this dish?",
      timestamp: "2h ago",
      likes: 5
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Emily Wilson",
        avatar: "/placeholder.svg"
      },
      content: "I've been to this restaurant before. Their service is amazing, and the ambiance is perfect for a date night.",
      timestamp: "4h ago",
      likes: 3
    }
  ]);

  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const wasLiked = prev[commentId];
      
      // Update comments like count
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: wasLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      }));
      
      return {
        ...prev,
        [commentId]: !wasLiked
      };
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <img src={comment.user.avatar} alt={comment.user.name} />
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{comment.user.name}</p>
                  <p className="text-gray-500 text-xs">{comment.timestamp}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
            </div>
            <div className="mt-1 ml-2 flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-6 text-xs flex items-center space-x-1 ${likedComments[comment.id] ? 'text-red-500' : 'text-gray-500'}`}
                onClick={() => handleLikeComment(comment.id)}
              >
                <Heart className={`h-3 w-3 ${likedComments[comment.id] ? 'fill-current' : ''}`} />
                <span>{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500">
                Reply
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
