
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import categories from '@/data/categories';
import { Product } from '@/data/products';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: categories[0]?.id || '',
      imageUrl: 'https://via.placeholder.com/150',
      featured: false,
      onSale: false,
      salePrice: 0
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast({
        title: "Error",
        description: "Por favor complete los campos requeridos",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={18} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-renata-yellow focus:outline-none focus:ring-renata-yellow sm:text-sm"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              URL de Imagen
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Vista previa" 
                  className="h-20 w-20 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="featured"
                checked={formData.featured || false}
                onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Producto destacado
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="onSale"
                checked={formData.onSale || false}
                onCheckedChange={(checked) => handleSwitchChange('onSale', checked)}
              />
              <label htmlFor="onSale" className="text-sm font-medium text-gray-700">
                En oferta
              </label>
            </div>
          </div>
          
          {formData.onSale && (
            <div>
              <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                Precio de oferta
              </label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                step="0.01"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-renata-yellow text-black hover:bg-renata-darkgold">
              {product ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
