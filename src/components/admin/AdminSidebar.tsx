
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Mail, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onChangeTab }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'products', name: 'Productos', icon: ShoppingBag },
    { id: 'messages', name: 'Mensajes', icon: Mail },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ];
  
  return (
    <div className={`bg-white shadow-md ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16`}>
      <div className="p-4 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>
      
      <nav className="mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center py-3 px-4 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-renata-yellow text-black font-medium' 
                    : 'text-gray-600 hover:bg-renata-lightgray'
                }`}
                onClick={() => onChangeTab(item.id)}
              >
                <item.icon size={18} className={collapsed ? 'mx-auto' : 'mr-3'} />
                {!collapsed && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 p-4">
        <Link to="/" className={`flex items-center justify-center py-2 px-4 text-sm text-renata-yellow hover:underline ${collapsed ? 'flex-col' : ''}`}>
          <Home size={16} className={collapsed ? 'mb-1' : 'mr-2'} />
          {!collapsed && <span>Volver al sitio</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
