
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader } from "@/components/ui/card";
import PostCard, { PostProps } from "@/components/posts/PostCard";

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState<PostProps[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "Jane Cooper",
        username: "janecooper",
        avatar: "/placeholder.svg"
      },
      content: "Just tried this amazing pasta dish at Bella Italia! The flavors were incredible - perfect balance of garlic, basil, and tomato. Definitely recommend trying their chef's special if you visit.",
      images: ["/placeholder.svg"],
      likes: 124,
      comments: 23,
      timestamp: "2 hours ago",
      location: "Bella Italia, San Francisco",
      rating: 5
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Robert Johnson",
        username: "robertj",
        avatar: "/placeholder.svg"
      },
      content: "Sunday brunch at Sunrise Cafe was such a delight. Their avocado toast with poached eggs is a must-try! The coffee was excellent too.",
      images: ["/placeholder.svg", "/placeholder.svg"],
      likes: 89,
      comments: 12,
      timestamp: "1 day ago",
      location: "Sunrise Cafe, Downtown",
      rating: 4
    }
  ]);

  return (
    <MainLayout>
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Saved Posts</h1>
          <p className="text-gray-500">Your collection of saved posts</p>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {savedPosts.length > 0 ? (
          savedPosts.map(post => (
            <PostCard key={post.id} {...post} />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No saved posts yet</h3>
            <p className="text-gray-500 mt-2">
              When you save posts, they'll appear here
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SavedPostsPage;
