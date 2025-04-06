
import MainLayout from "@/components/layout/MainLayout";
import CreatePostForm from "@/components/posts/CreatePostForm";
import PostCard from "@/components/posts/PostCard";

const Index = () => {
  // Mock posts data
  const posts = [
    {
      id: "post1",
      user: {
        id: "user1",
        name: "Julia Chen",
        username: "juliachef",
        avatar: "/placeholder.svg"
      },
      content: "Just tried this amazing pasta at Villa Roma! The carbonara was perfectly creamy with just the right amount of pepper. Definitely recommend trying it if you're in the area.",
      images: ["/placeholder.svg", "/placeholder.svg"],
      likes: 42,
      comments: 7,
      timestamp: "3 hours ago",
      location: "Villa Roma, New York",
      rating: 5
    },
    {
      id: "post2",
      user: {
        id: "user2",
        name: "Mark Davis",
        username: "foodie_mark",
        avatar: "/placeholder.svg"
      },
      content: "Made my grandma's secret recipe cookies today. These chocolate chip beauties came out perfect! Crispy on the outside, gooey on the inside. \n\nSecret ingredient? A pinch of sea salt on top before baking! 🍪✨",
      images: ["/placeholder.svg"],
      likes: 128,
      comments: 24,
      timestamp: "5 hours ago"
    },
    {
      id: "post3",
      user: {
        id: "user3",
        name: "Sophia Kim",
        username: "sophiaeats",
        avatar: "/placeholder.svg"
      },
      content: "Weekend brunch vibes at Sunrise Cafe. Their avocado toast is next level - perfectly toasted sourdough, ripe avocado, poached eggs, and that chili oil drizzle just brings everything together!",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      likes: 87,
      comments: 12,
      timestamp: "1 day ago",
      location: "Sunrise Cafe, Seattle",
      rating: 4
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <CreatePostForm />
        
        <div>
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
