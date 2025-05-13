
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { X, Bell, Check, ShoppingBag, Mail } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'message' | 'product' | 'system';
}

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const { toast } = useToast();
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nuevo mensaje',
      message: 'Ha recibido un nuevo mensaje de contacto',
      date: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'Stock bajo',
      message: 'El producto "Aceite de Oliva" tiene stock bajo (2 unidades)',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      type: 'product'
    }
  ]);
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
    }
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) {
      return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
    
    const diffDays = Math.round(diffHours / 24);
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Notificaciones",
      description: "Todas las notificaciones marcadas como leídas"
    });
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    
    toast({
      title: "Notificaciones",
      description: "Todas las notificaciones han sido eliminadas"
    });
    
    // Close dropdown after clearing
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail size={18} className="text-blue-500" />;
      case 'product':
        return <ShoppingBag size={18} className="text-yellow-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500">
            {notifications.filter(n => !n.read).length} sin leer
          </span>
          <div className="space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 text-blue-600"
              onClick={handleMarkAllAsRead}
            >
              <Check size={14} className="mr-1" /> Marcar todo como leído
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Bell size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No hay notificaciones</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                notification.read ? '' : 'bg-blue-50'
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-black'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(notification.date)}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-3 text-center border-t border-gray-200">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-red-600 hover:text-red-700"
            onClick={handleClearAll}
          >
            Borrar todas las notificaciones
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
