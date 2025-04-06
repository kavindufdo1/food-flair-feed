
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Camera, MapPin, Star, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // For demo purposes, we're just creating object URLs
    // In a real app, you'd upload these to a server
    const newPreviewImages: string[] = [];
    
    for (let i = 0; i < Math.min(files.length, 4); i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newPreviewImages.push(imageUrl);
    }
    
    setPreviewImages([...previewImages, ...newPreviewImages].slice(0, 4));
  };

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || previewImages.length > 0) {
      // Here we would normally send the post data to the backend
      console.log({
        content,
        location,
        rating: showRating ? rating : undefined,
        images: previewImages
      });
      
      toast.success("Post created successfully!");
      
      // Reset form
      setContent("");
      setLocation("");
      setRating(0);
      setShowRating(false);
      setPreviewImages([]);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <Avatar>
            <img src="/placeholder.svg" alt="Your avatar" />
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share your food experience..."
              className="resize-none min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Preview ${index}`} 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Location Input */}
            <div className="mt-3 flex items-center">
              <MapPin className="text-gray-400 mr-2 h-5 w-5" />
              <Input
                type="text"
                placeholder="Add location"
                className="flex-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            {/* Rating Input */}
            {showRating && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Rating</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 cursor-pointer ${
                          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={triggerImageUpload}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  <span>Photo</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowRating(!showRating)}
                >
                  <Star className="mr-2 h-4 w-4" />
                  <span>Rating</span>
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="bg-food-primary hover:bg-food-primary/90"
                disabled={!content.trim() && previewImages.length === 0}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePostForm;
