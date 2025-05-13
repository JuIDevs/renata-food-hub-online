
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import products from '@/data/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-r from-renata-offwhite to-renata-lightgray">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-6">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Calidad y frescura en cada <span className="text-renata-yellow">entrega</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                Somos su socio confiable en distribución de alimentos. Productos frescos y de calidad para su negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild className="bg-renata-yellow text-black hover:bg-renata-darkgold">
                  <Link to="/productos">Ver productos <ShoppingBag size={18} className="ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" className="border-renata-yellow text-renata-black hover:bg-renata-yellow hover:text-black">
                  <Link to="/contacto">Contáctenos</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop" 
                alt="Distribuidora de alimentos" 
                className="rounded-lg shadow-lg max-w-full h-64 object-cover w-full yellow-glow"
              />
            </div>
          </div>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir <span className="text-renata-yellow">Distribuidora</span><span className="text-black">Renata</span>?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-renata-lightgray p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-yellow rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calidad Superior</h3>
              <p className="text-gray-600">Seleccionamos cuidadosamente todos nuestros productos para garantizar la mejor calidad.</p>
            </div>
            
            <div className="bg-renata-lightgray p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-yellow rounded-full flex items-center justify-center">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Entrega Puntual</h3>
              <p className="text-gray-600">Cumplimos con los tiempos de entrega para que nunca falten productos en su negocio.</p>
            </div>
            
            <div className="bg-renata-lightgray p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-yellow rounded-full flex items-center justify-center">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precios Competitivos</h3>
              <p className="text-gray-600">Ofrecemos los mejores precios del mercado sin sacrificar la calidad.</p>
            </div>
            
            <div className="bg-renata-lightgray p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-yellow rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Variedad Extensa</h3>
              <p className="text-gray-600">Amplio catálogo de productos para satisfacer todas las necesidades de su negocio.</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-renata-offwhite">
        <Container>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Productos Destacados</h2>
            <Button asChild variant="link" className="text-renata-black hover:text-renata-yellow">
              <Link to="/productos">
                Ver todos <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 product-shadow">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
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
                    <Link to={`/productos/${product.id}`} className="text-renata-yellow hover:underline">
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-renata-black text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para mejorar su cadena de suministro?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Contáctenos hoy mismo para una cotización personalizada y descubra cómo podemos ayudar a su negocio.
            </p>
            <Button asChild className="bg-renata-yellow text-black hover:bg-renata-darkgold">
              <Link to="/contacto">Solicite una cotización</Link>
            </Button>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
