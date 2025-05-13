
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import products, { Product } from '@/data/products';
import categories from '@/data/categories';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [showFilters, setShowFilters] = useState(false);
  
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
    
    filterProducts(search || searchTerm, category || selectedCategory, priceRange);
  }, [searchParams]);
  
  const filterProducts = (search: string, category: string | null, price: [number, number]) => {
    let result = [...products];
    
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      result = result.filter(p => p.categoryId === category);
    }
    
    result = result.filter(p => p.price >= price[0] && p.price <= price[1]);
    
    setFilteredProducts(result);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
    filterProducts(searchTerm, selectedCategory, priceRange);
  };
  
  const handleCategorySelect = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    
    const params = new URLSearchParams(searchParams);
    
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    
    setSearchParams(params);
    filterProducts(searchTerm, newCategory, priceRange);
  };
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    filterProducts(searchTerm, selectedCategory, newRange);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setPriceRange([minPrice, maxPrice]);
    setSearchParams({});
    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Products Header */}
      <section className="pt-32 pb-10 bg-renata-offwhite">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Productos</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore nuestra amplia gama de productos frescos y de calidad para su negocio. 
            Usamos filtros para encontrar exactamente lo que necesita.
          </p>
        </Container>
      </section>
      
      {/* Search and Filter Bar */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <form onSubmit={handleSearch} className="w-full md:w-auto flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2 w-full"
                />
              </div>
            </form>
            
            <div className="hidden md:flex items-center gap-2">
              {categories.slice(0, 4).map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category.id 
                      ? "bg-renata-yellow text-black hover:bg-renata-darkgold" 
                      : "hover:bg-renata-lightgray"
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2" />
                Filtros
              </Button>
              
              {(selectedCategory || searchTerm || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} className="mr-1" /> Limpiar
                </Button>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="md:hidden w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </Button>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-renata-lightgray rounded-lg animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Badge
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedCategory === category.id 
                            ? "bg-renata-yellow text-black hover:bg-renata-darkgold" 
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Rango de precio</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      max={maxPrice}
                      min={minPrice}
                      step={0.01}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Filtros activos</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Categoría: {categories.find(c => c.id === selectedCategory)?.name}
                        <X 
                          size={14} 
                          className="cursor-pointer" 
                          onClick={() => handleCategorySelect(selectedCategory)}
                        />
                      </Badge>
                    )}
                    {searchTerm && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Búsqueda: {searchTerm}
                        <X 
                          size={14} 
                          className="cursor-pointer" 
                          onClick={() => {
                            setSearchTerm('');
                            const params = new URLSearchParams(searchParams);
                            params.delete('search');
                            setSearchParams(params);
                            filterProducts('', selectedCategory, priceRange);
                          }}
                        />
                      </Badge>
                    )}
                    {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Precio: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
                        <X 
                          size={14} 
                          className="cursor-pointer" 
                          onClick={() => {
                            setPriceRange([minPrice, maxPrice]);
                            filterProducts(searchTerm, selectedCategory, [minPrice, maxPrice]);
                          }}
                        />
                      </Badge>
                    )}
                    
                    {(selectedCategory || searchTerm || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-500 hover:text-red-700"
                      >
                        Limpiar todos
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
      
      {/* Products Grid */}
      <section className="py-8 flex-grow">
        <Container>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 mb-6">Intente con otros criterios de búsqueda o filtros.</p>
              <Button onClick={clearFilters} className="bg-renata-yellow text-black hover:bg-renata-darkgold">
                Ver todos los productos
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">{filteredProducts.length} productos encontrados</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 product-shadow">
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      {product.featured && (
                        <Badge className="absolute top-2 right-2 bg-renata-yellow text-black">
                          Destacado
                        </Badge>
                      )}
                      {product.onSale && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          Oferta
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === product.categoryId)?.name}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">
                          {product.onSale ? (
                            <>
                              <span className="text-gray-400 line-through text-sm mr-2">${product.price.toFixed(2)}</span>
                              <span className="text-renata-yellow">${product.salePrice?.toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </span>
                        <Button variant="outline" size="sm" className="text-renata-yellow border-renata-yellow hover:bg-renata-yellow hover:text-black">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
