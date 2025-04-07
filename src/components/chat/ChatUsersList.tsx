
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatUsersListProps {
  activeConversation: string | null;
  setActiveConversation: (userId: string) => void;
}

const ChatUsersList = ({ 
  activeConversation, 
  setActiveConversation 
}: ChatUsersListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for users
  const users: User[] = [
    {
      id: "user1",
      name: "Alex Chen",
      avatar: "AC",
      lastMessage: "Hey! Have you tried that new Italian place downtown?",
      time: "10:30 AM",
      unread: 0,
    },
    {
      id: "user2",
      name: "Maya Johnson",
      avatar: "MJ",
      lastMessage: "I'm going to that food festival this weekend. Want to join?",
      time: "Yesterday",
      unread: 2,
    },
    {
      id: "user3",
      name: "Sam Wilson",
      avatar: "SW",
      lastMessage: "Did you see my latest review of that sushi place?",
      time: "2 days ago",
      unread: 0,
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search conversations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
              activeConversation === user.id ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveConversation(user.id)}
          >
            <div className="h-10 w-10 rounded-full bg-food-primary text-white flex items-center justify-center font-medium flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start">
                <span className="font-medium truncate">{user.name}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-1">
                  {user.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
            </div>
            {user.unread > 0 && (
              <div className="h-5 w-5 rounded-full bg-food-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                {user.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsersList;
