
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import categories from '@/data/categories';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryFormProps {
  category?: Category;
  onSubmit: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSubmit, onCancel }: CategoryFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Category>(
    category || {
      id: `cat-${categories.length + 1}`,
      name: '',
      description: ''
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Por favor ingrese un nombre para la categoría",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={18} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Categoría *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre de la categoría"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Descripción de la categoría"
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-renata-yellow focus:outline-none focus:ring-renata-yellow sm:text-sm"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-renata-yellow text-black hover:bg-renata-darkgold">
              {category ? 'Actualizar Categoría' : 'Crear Categoría'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
