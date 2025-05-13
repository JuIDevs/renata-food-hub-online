
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-renata-black text-white pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              Distribuidora <span className="text-renata-yellow ml-2">Renata</span>
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Somos su aliado estratégico en la distribución de alimentos de calidad. 
              Comprometidos con la excelencia y el servicio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-renata-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-renata-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-renata-yellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctenos</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-renata-yellow" />
                <span className="text-gray-300">Av. Principal #123, Ciudad</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-renata-yellow" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-renata-yellow" />
                <a href="mailto:info@distribuidorarenata.com" className="text-gray-300 hover:text-renata-yellow transition-colors">
                  info@distribuidorarenata.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {year} Distribuidora Renata. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/politica-privacidad" className="text-gray-400 text-sm hover:text-renata-yellow transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/terminos-condiciones" className="text-gray-400 text-sm hover:text-renata-yellow transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
