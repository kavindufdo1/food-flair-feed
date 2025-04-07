
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MoreHorizontal, MessageSquareReply } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ReplyProps {
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
  replies: ReplyProps[];
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
      likes: 5,
      replies: [
        {
          id: "reply1",
          user: {
            id: "user2",
            name: "Emily Wilson",
            avatar: "/placeholder.svg"
          },
          content: "I used a mix of paprika, oregano, and thyme. It really brings out the flavors!",
          timestamp: "1h ago",
          likes: 2
        }
      ]
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
      likes: 3,
      replies: []
    }
  ]);

  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [likedReplies, setLikedReplies] = useState<Record<string, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

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

  const handleLikeReply = (commentId: string, replyId: string) => {
    setLikedReplies(prev => {
      const wasLiked = prev[replyId];
      
      // Update reply like count
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  likes: wasLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
      
      return {
        ...prev,
        [replyId]: !wasLiked
      };
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }
      return comment;
    }));
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: ReplyProps = {
      id: `reply-${Date.now()}`,
      user: {
        id: "currentUser",
        name: "Current User",
        avatar: "/placeholder.svg"
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));
    
    setReplyContent("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-3">
          <div className="flex space-x-3">
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs text-gray-500"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <MessageSquareReply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
              
              {/* Reply input */}
              {replyingTo === comment.id && (
                <div className="ml-2 mt-2 flex space-x-2">
                  <Input
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="text-sm py-1 px-2 h-8"
                  />
                  <Button 
                    size="sm" 
                    className="h-8 text-xs bg-food-primary hover:bg-food-primary/90"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              )}
              
              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-4 mt-2 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-2">
                      <Avatar className="h-6 w-6">
                        <img src={reply.user.avatar} alt={reply.user.name} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-xs">{reply.user.name}</p>
                              <p className="text-gray-500 text-xs">{reply.timestamp}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDeleteReply(comment.id, reply.id)}>
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="mt-1 text-xs">{reply.content}</p>
                        </div>
                        <div className="mt-1 ml-2 flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-5 text-xs flex items-center space-x-1 ${likedReplies[reply.id] ? 'text-red-500' : 'text-gray-500'}`}
                            onClick={() => handleLikeReply(comment.id, reply.id)}
                          >
                            <Heart className={`h-2 w-2 ${likedReplies[reply.id] ? 'fill-current' : ''}`} />
                            <span className="text-xs">{reply.likes}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
