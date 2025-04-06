
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  type: "like" | "comment" | "follow" | "mention" | "groupInvite";
  content: string;
  timestamp: string;
  read: boolean;
  link: string;
}

const NotificationsPage = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif1",
      user: {
        id: "user2",
        name: "Mark Davis",
        avatar: "/placeholder.svg"
      },
      type: "like",
      content: "liked your post about the Italian restaurant",
      timestamp: "5 minutes ago",
      read: false,
      link: "/post/1"
    },
    {
      id: "notif2",
      user: {
        id: "user3",
        name: "Sophia Kim",
        avatar: "/placeholder.svg"
      },
      type: "comment",
      content: "commented on your homemade pasta photo",
      timestamp: "30 minutes ago",
      read: false,
      link: "/post/2"
    },
    {
      id: "notif3",
      user: {
        id: "user4",
        name: "Alex Johnson",
        avatar: "/placeholder.svg"
      },
      type: "follow",
      content: "started following you",
      timestamp: "2 hours ago",
      read: true,
      link: "/profile/user4"
    },
    {
      id: "notif4",
      user: {
        id: "user5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg"
      },
      type: "mention",
      content: "mentioned you in a comment",
      timestamp: "1 day ago",
      read: true,
      link: "/post/3"
    },
    {
      id: "notif5",
      user: {
        id: "user6",
        name: "David Lee",
        avatar: "/placeholder.svg"
      },
      type: "groupInvite",
      content: "invited you to join the group Pasta Lovers",
      timestamp: "2 days ago",
      read: true,
      link: "/groups/pasta-lovers"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Card
                key={notification.id}
                className={`p-4 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Link to={notification.link} className="flex items-start space-x-4">
                  <Avatar>
                    <img src={notification.user.avatar} alt={notification.user.name} />
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className={`${!notification.read ? 'font-medium' : ''}`}>
                      <span className="font-medium">{notification.user.name}</span>
                      {" "}
                      {notification.content}
                    </p>
                    <p className="text-sm text-gray-500">{notification.timestamp}</p>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-2 h-2 bg-food-primary rounded-full mt-2"></div>
                  )}
                </Link>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">You have no notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
