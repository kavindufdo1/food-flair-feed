
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Image, Smile } from "lucide-react";
import ChatUsersList from "@/components/chat/ChatUsersList";
import ChatMessage from "@/components/chat/ChatMessage";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState<string | null>("user1");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      // Here you would normally send the message to your backend
      setMessage("");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-180px)]">
        <Card className="w-full md:w-1/3 lg:w-1/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <ChatUsersList 
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        </Card>

        <Card className="w-full md:w-2/3 lg:w-3/4 p-4 flex flex-col h-full">
          {activeConversation ? (
            <>
              <div className="border-b pb-3 mb-3">
                <h3 className="text-lg font-medium">
                  {activeConversation === "user1" ? "Alex Chen" : 
                   activeConversation === "user2" ? "Maya Johnson" : 
                   activeConversation === "user3" ? "Sam Wilson" : "Chat"}
                </h3>
              </div>

              <ScrollArea className="flex-grow mb-4 pr-4">
                <div className="space-y-4">
                  <ChatMessage 
                    sender="other"
                    content="Hey! Have you tried that new Italian place downtown?"
                    timestamp="10:30 AM"
                  />
                  <ChatMessage 
                    sender="me"
                    content="Not yet! How was it? I heard their pasta is amazing."
                    timestamp="10:32 AM"
                  />
                  <ChatMessage 
                    sender="other"
                    content="It was incredible! The carbonara was perfect - creamy but not too heavy."
                    timestamp="10:35 AM"
                  />
                  <ChatMessage 
                    sender="me"
                    content="I'll definitely check it out this weekend. Any other recommendations?"
                    timestamp="10:38 AM"
                  />
                  <ChatMessage 
                    sender="other"
                    content="Their tiramisu is a must-try! And maybe we can go together sometime? Always better to try new places with a fellow foodie!"
                    timestamp="10:40 AM"
                  />
                </div>
              </ScrollArea>

              <form onSubmit={handleSendMessage} className="mt-auto">
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full"
                  >
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow"
                  />
                  <Button 
                    type="submit" 
                    className="rounded-full bg-food-primary hover:bg-food-primary/90"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a contact from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
