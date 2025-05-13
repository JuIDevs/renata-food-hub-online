
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductsTable from '@/components/admin/ProductsTable';
import MessagesTable from '@/components/admin/MessagesTable';
import ProductForm from '@/components/admin/ProductForm';
import CategoryForm from '@/components/admin/CategoryForm';
import MessageView from '@/components/admin/MessageView';
import Settings from '@/components/admin/Settings';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Package, Mail, TrendingUp, Plus, Grid3X3 } from 'lucide-react';
import products from '@/data/products';
import messages from '@/data/messages';
import categories from '@/data/categories';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [productsState, setProductsState] = useState([...products]);
  const [messagesState, setMessagesState] = useState([...messages]);
  const [categoriesState, setCategoriesState] = useState([...categories]);
  
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
  
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductForm(true);
  };
  
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };
  
  const handleDeleteProduct = (id: string) => {
    // Show confirmation before deleting
    const confirmDelete = window.confirm('¿Está seguro que desea eliminar este producto?');
    if (confirmDelete) {
      const updatedProducts = productsState.filter(product => product.id !== id);
      setProductsState(updatedProducts);
      
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente"
      });
    }
  };
  
  const handleSaveProduct = (productData: any) => {
    if (selectedProduct) {
      // Edit existing product
      const updatedProducts = productsState.map(product => 
        product.id === selectedProduct.id 
          ? { ...product, ...productData } 
          : product
      );
      setProductsState(updatedProducts);
      
      toast({
        title: "Producto actualizado",
        description: "El producto ha sido actualizado correctamente"
      });
    } else {
      // Add new product
      const newProduct = {
        id: `product-${productsState.length + 1}`,
        ...productData
      };
      setProductsState([...productsState, newProduct]);
      
      toast({
        title: "Producto añadido",
        description: "El producto ha sido añadido correctamente"
      });
    }
    
    setShowProductForm(false);
    setSelectedProduct(null);
  };
  
  const handleAddCategory = () => {
    setShowCategoryForm(true);
  };
  
  const handleSaveCategory = (categoryData: any) => {
    setCategoriesState([...categoriesState, categoryData]);
    
    toast({
      title: "Categoría añadida",
      description: "La categoría ha sido añadida correctamente"
    });
    
    setShowCategoryForm(false);
  };
  
  const handleViewMessage = (message: any) => {
    // Mark message as read
    const updatedMessages = messagesState.map(msg => 
      msg.id === message.id 
        ? { ...msg, read: true } 
        : msg
    );
    setMessagesState(updatedMessages);
    setSelectedMessage(message);
  };
  
  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messagesState.filter(message => message.id !== id);
    setMessagesState(updatedMessages);
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
    
    toast({
      title: "Mensaje eliminado",
      description: "El mensaje ha sido eliminado correctamente"
    });
  };
  
  const handleMarkMessageAsRead = (id: string) => {
    const updatedMessages = messagesState.map(message => 
      message.id === id 
        ? { ...message, read: true } 
        : message
    );
    setMessagesState(updatedMessages);
  };
  
  if (!isLoggedIn) {
    return null; // Don't render anything while checking auth
  }
  
  const totalProducts = productsState.length;
  const productsInStock = productsState.filter(p => p.stock > 0).length;
  const lowStockProducts = productsState.filter(p => p.stock < 10 && p.stock > 0).length;
  const unreadMessages = messagesState.filter(m => !m.read).length;
  
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
                    <ProductsTable products={productsState.slice(0, 5)} isPreview={true} />
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
                    <MessagesTable messages={messagesState.slice(0, 3)} isPreview={true} />
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'products' && !showProductForm && !showCategoryForm && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                  <div className="flex space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddCategory}>
                      <Grid3X3 size={18} className="mr-2" />
                      Añadir Categoría
                    </Button>
                    <Button className="bg-renata-yellow text-black hover:bg-renata-darkgold" onClick={handleAddProduct}>
                      <Plus size={18} className="mr-2" />
                      Añadir Producto
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ProductsTable 
                    products={productsState}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'products' && showProductForm && (
              <ProductForm 
                product={selectedProduct}
                onSubmit={handleSaveProduct}
                onCancel={() => setShowProductForm(false)}
              />
            )}
            
            {activeTab === 'products' && showCategoryForm && (
              <CategoryForm
                onSubmit={handleSaveCategory}
                onCancel={() => setShowCategoryForm(false)}
              />
            )}
            
            {activeTab === 'messages' && !selectedMessage && (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold">Mensajes de Contacto</h1>
                  <p className="text-gray-600">{unreadMessages} mensajes sin leer</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <MessagesTable 
                    messages={messagesState}
                    onViewMessage={handleViewMessage}
                    onDeleteMessage={handleDeleteMessage}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'messages' && selectedMessage && (
              <MessageView 
                message={selectedMessage}
                onClose={() => setSelectedMessage(null)}
                onDelete={handleDeleteMessage}
                onMarkAsRead={handleMarkMessageAsRead}
              />
            )}
            
            {activeTab === 'settings' && (
              <Settings />
            )}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
