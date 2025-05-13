
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, these would be stored securely, not hardcoded
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'password123';
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // In a real app, we would set a token in localStorage or use a proper auth system
        localStorage.setItem('isAdminLoggedIn', 'true');
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Correo electrónico o contraseña incorrectos",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-renata-offwhite flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              Distribuidora <span className="text-renata-yellow">Renata</span>
            </h2>
            <h3 className="mt-2 text-xl">Panel de Administración</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-renata-yellow text-black hover:bg-renata-darkgold"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                {!isLoading && <Lock size={16} className="ml-2" />}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-renata-yellow hover:underline">
              Volver al sitio principal
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Para fines de demo, use:</p>
          <p>Email: admin@example.com</p>
          <p>Contraseña: password123</p>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
