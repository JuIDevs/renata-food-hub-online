
import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';
import categories from '@/data/categories';

interface ProductsTableProps {
  products: Product[];
  isPreview?: boolean;
}

const ProductsTable = ({ products, isPreview = false }: ProductsTableProps) => {
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {!isPreview && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
            )}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            {!isPreview && (
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              {!isPreview && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.id}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-md object-cover" 
                      src={product.imageUrl} 
                      alt={product.name} 
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getCategoryName(product.categoryId)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {product.onSale ? (
                    <>
                      <span className="text-gray-400 line-through text-xs mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-renata-yellow">${product.salePrice?.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.stock} uds.
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-1">
                  {product.featured && (
                    <Badge className="bg-renata-yellow text-black">Destacado</Badge>
                  )}
                  {product.onSale && (
                    <Badge className="bg-red-500 text-white">Oferta</Badge>
                  )}
                  {product.stock < 10 && (
                    <Badge variant="outline" className="text-orange-500 border-orange-500">
                      Bajo Stock
                    </Badge>
                  )}
                  {!product.featured && !product.onSale && product.stock >= 10 && (
                    <Badge variant="outline">Normal</Badge>
                  )}
                </div>
              </td>
              {!isPreview && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                    <Trash size={16} />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
