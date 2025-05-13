
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductsTable from '@/components/admin/ProductsTable';
import MessagesTable from '@/components/admin/MessagesTable';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Package, Mail, TrendingUp } from 'lucide-react';
import products from '@/data/products';
import messages from '@/data/messages';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      if (!isAdminLoggedIn) {
        navigate('/admin');
        toast({
          title: "Acceso denegado",
          description: "Por favor, inicie sesión para acceder al panel de administración",
          variant: "destructive"
        });
      } else {
        setIsLoggedIn(true);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
  if (!isLoggedIn) {
    return null; // Don't render anything while checking auth
  }
  
  const totalProducts = products.length;
  const productsInStock = products.filter(p => p.stock > 0).length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const unreadMessages = messages.filter(m => !m.read).length;
  
  return (
    <div className="min-h-screen bg-renata-offwhite">
      <AdminHeader />
      
      <div className="flex flex-col md:flex-row">
        <AdminSidebar activeTab={activeTab} onChangeTab={setActiveTab} />
        
        <main className="flex-1 p-6">
          <Container>
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold">Panel de Control</h1>
                  <p className="text-gray-600">Bienvenido al panel de administración</p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total de Productos</p>
                        <p className="text-2xl font-bold">{totalProducts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Productos en Stock</p>
                        <p className="text-2xl font-bold">{productsInStock}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bajo Stock</p>
                        <p className="text-2xl font-bold">{lowStockProducts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mensajes sin leer</p>
                        <p className="text-2xl font-bold">{unreadMessages}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Products */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Productos Recientes</h2>
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => setActiveTab('products')}
                    >
                      Ver todos
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <ProductsTable products={products.slice(0, 5)} isPreview={true} />
                  </div>
                </div>
                
                {/* Recent Messages */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mensajes Recientes</h2>
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => setActiveTab('messages')}
                    >
                      Ver todos
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <MessagesTable messages={messages.slice(0, 3)} isPreview={true} />
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'products' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                  <Button className="bg-renata-yellow text-black hover:bg-renata-darkgold">
                    Añadir Producto
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ProductsTable products={products} />
                </div>
              </>
            )}
            
            {activeTab === 'messages' && (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold">Mensajes de Contacto</h1>
                  <p className="text-gray-600">{unreadMessages} mensajes sin leer</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <MessagesTable messages={messages} />
                </div>
              </>
            )}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
