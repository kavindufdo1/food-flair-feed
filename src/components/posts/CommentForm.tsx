
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log("Submitting comment:", comment, "for post:", postId);
      // Here we would normally send the comment to the backend
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-start space-x-2">
      <Avatar className="h-8 w-8">
        <img src="/placeholder.svg" alt="Your avatar" />
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder="Add a comment..."
          className="resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button 
            type="submit" 
            size="sm"
            disabled={!comment.trim()}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
