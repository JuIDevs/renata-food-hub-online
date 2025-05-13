
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useToast } from '@/hooks/use-toast';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import NotificationsDropdown from './Notifications';

const AdminHeader = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión exitosamente",
    });
    navigate('/admin');
  };
  
  return (
    <header className="bg-white shadow-md py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-black">Distribuidora</span><span className="text-renata-yellow">Renata</span>
            </span>
            <span className="ml-2 text-sm text-gray-500">| Admin</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              
              {showNotifications && (
                <NotificationsDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 rounded-full bg-renata-lightgray flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:block text-sm">Admin</span>
                <ChevronDown size={16} />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <a 
                      href="#profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-renata-lightgray"
                    >
                      <User size={16} className="mr-2" />
                      Perfil
                    </a>
                    <a 
                      href="#settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-renata-lightgray"
                    >
                      <Settings size={16} className="mr-2" />
                      Configuración
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-renata-lightgray"
                    >
                      <LogOut size={16} className="mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AdminHeader;
