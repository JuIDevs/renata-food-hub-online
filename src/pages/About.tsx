
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-renata-offwhite">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Conoce más sobre Distribuidora Renata, una empresa comprometida con la calidad y el servicio.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
                alt="Nuestra historia" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">De un sueño a la realidad</h2>
              <p className="text-gray-700 mb-4">
                Distribuidora Renata nació en 2005 con una visión clara: proporcionar a restaurantes y comercios locales los mejores productos alimenticios, con un servicio personalizado y precios justos.
              </p>
              <p className="text-gray-700 mb-4">
                Lo que comenzó como un pequeño negocio familiar se ha convertido en una empresa reconocida en la industria, gracias a nuestro enfoque en la calidad, la puntualidad y las relaciones duraderas con nuestros clientes.
              </p>
              <p className="text-gray-700 mb-6">
                Hoy, contamos con una amplia red de distribución y un equipo comprometido que trabaja día a día para superar las expectativas de nuestros clientes.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-renata-yellow">15+</span>
                <span className="text-gray-700">Años de experiencia en el mercado</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-renata-black text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
            <p className="text-xl mb-8">
              Ser el socio estratégico preferido en la cadena de suministro alimentaria, brindando productos de calidad superior que impulsen el éxito de nuestros clientes.
            </p>
            <h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
            <p className="text-xl mb-8">
              Liderar la industria de distribución de alimentos, siendo reconocidos por nuestra excelencia operativa, innovación constante y compromiso con la satisfacción del cliente.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Values */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-renata-yellow">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-lightgray rounded-full flex items-center justify-center">
                <Award size={32} className="text-renata-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calidad</h3>
              <p className="text-gray-600">Seleccionamos los mejores productos para garantizar la satisfacción total de nuestros clientes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-renata-yellow">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-lightgray rounded-full flex items-center justify-center">
                <Clock size={32} className="text-renata-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Puntualidad</h3>
              <p className="text-gray-600">Cumplimos con los plazos de entrega, porque sabemos que su tiempo es valioso.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-renata-yellow">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-lightgray rounded-full flex items-center justify-center">
                <Users size={32} className="text-renata-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Servicio</h3>
              <p className="text-gray-600">Ofrecemos atención personalizada y soluciones adaptadas a las necesidades de cada cliente.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-renata-yellow">
              <div className="w-16 h-16 mx-auto mb-4 bg-renata-lightgray rounded-full flex items-center justify-center">
                <TrendingUp size={32} className="text-renata-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovación</h3>
              <p className="text-gray-600">Buscamos constantemente nuevas formas de mejorar nuestros procesos y servicios.</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-renata-offwhite">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Carlos Méndez</h3>
              <p className="text-renata-yellow mb-3">CEO y Fundador</p>
              <p className="text-gray-600">Con más de 20 años de experiencia en la industria de distribución alimentaria.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Ana Martínez</h3>
              <p className="text-renata-yellow mb-3">Directora de Operaciones</p>
              <p className="text-gray-600">Especialista en logística y cadena de suministro, enfocada en la eficiencia operativa.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" 
                  alt="Sales Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Roberto Sánchez</h3>
              <p className="text-renata-yellow mb-3">Director Comercial</p>
              <p className="text-gray-600">Experto en desarrollo de negocios y relaciones con clientes corporativos.</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-renata-yellow rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">¿Quieres formar parte de nuestra historia?</h2>
            <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo y descubre cómo podemos ser tu socio estratégico en la distribución de alimentos.
            </p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link to="/contacto">
                Contáctanos <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
