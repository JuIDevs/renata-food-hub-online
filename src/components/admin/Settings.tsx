
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Container } from '@/components/ui/container';
import { Save } from 'lucide-react';

interface SettingsFormData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  scheduleWeekdays: string;
  scheduleSaturday: string;
  showFeaturedProducts: boolean;
  showSaleProducts: boolean;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  siteDescription: string;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SettingsFormData>({
    companyName: 'DistribuidoraRenata',
    email: 'info@distribuidorarenata.com',
    phone: '+54 9 351 274-2582',
    address: 'Mariano Fragueiro 3746, Córdoba, Argentina',
    scheduleWeekdays: '8:30 - 13:00 y 17:00 - 20:00',
    scheduleSaturday: '8:30 - 13:00',
    showFeaturedProducts: true,
    showSaleProducts: true,
    socialMedia: {
      facebook: '',
      instagram: 'https://www.instagram.com/renatadistribuidoracba',
      twitter: ''
    },
    siteDescription: 'Distribuidora de alimentos de calidad para su negocio.'
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Configuración guardada",
        description: "Los cambios han sido guardados correctamente"
      });
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <div className="p-6">
      <Container>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Configuración</h1>
          <p className="text-gray-600">Personalice la información y comportamiento de su sitio web</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Información de la empresa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la empresa
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="scheduleWeekdays" className="block text-sm font-medium text-gray-700 mb-1">
                      Horario (Lunes a Viernes)
                    </label>
                    <Input
                      id="scheduleWeekdays"
                      name="scheduleWeekdays"
                      value={formData.scheduleWeekdays}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="scheduleSaturday" className="block text-sm font-medium text-gray-700 mb-1">
                      Horario (Sábados)
                    </label>
                    <Input
                      id="scheduleSaturday"
                      name="scheduleSaturday"
                      value={formData.scheduleSaturday}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold mb-4">Redes sociales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <Input
                      id="socialMedia.facebook"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleChange}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <Input
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <Input
                      id="socialMedia.twitter"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold mb-4">Configuración general</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción del sitio
                    </label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={formData.siteDescription}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="showFeaturedProducts"
                      checked={formData.showFeaturedProducts}
                      onCheckedChange={(checked) => handleSwitchChange('showFeaturedProducts', checked)}
                    />
                    <label htmlFor="showFeaturedProducts" className="text-sm font-medium text-gray-700">
                      Mostrar productos destacados en la página de inicio
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="showSaleProducts"
                      checked={formData.showSaleProducts}
                      onCheckedChange={(checked) => handleSwitchChange('showSaleProducts', checked)}
                    />
                    <label htmlFor="showSaleProducts" className="text-sm font-medium text-gray-700">
                      Mostrar productos en oferta en la página de inicio
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                className="bg-renata-yellow text-black hover:bg-renata-darkgold"
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                <Save size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SettingsPage;
