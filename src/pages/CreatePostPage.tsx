
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import CreatePostForm from "@/components/posts/CreatePostForm";

const CreatePostPage = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create Post</h1>
          <CreatePostForm />
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreatePostPage;
