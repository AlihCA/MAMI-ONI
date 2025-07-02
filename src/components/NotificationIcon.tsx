// src/components/NotificationIcon.tsx
import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline'; // or your preferred icon library

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Mock data - replace with actual API call in your app
  useEffect(() => {
    // This would typically be an API call to fetch notifications
    const fetchNotifications = async () => {
      // Simulate API call
      setTimeout(() => {
        setNotifications(3); // Mock notification count
      }, 500);
    };

    fetchNotifications();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
    // You might want to mark notifications as read here
  };

  return (
    <div className="relative">
      <button 
        onClick={handleClick}
        className="p-2 text-gray-700 hover:text-black relative"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6" />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-white-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              Notifications
            </div>
            {/* Notification items would go here */}
            <div className="px-4 py-3 text-sm text-gray-500">
              
                <p>No new notifications</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;