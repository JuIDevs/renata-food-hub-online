
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-renata-black">Distribuidora</span><span className="text-renata-yellow">Renata</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-renata-black hover:text-renata-yellow transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/productos" className="text-renata-black hover:text-renata-yellow transition-colors font-medium">
              Productos
            </Link>
            <Link to="/nosotros" className="text-renata-black hover:text-renata-yellow transition-colors font-medium">
              Nosotros
            </Link>
            <Link to="/contacto" className="text-renata-black hover:text-renata-yellow transition-colors font-medium">
              Contacto
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="hidden md:block">
              <Button variant="outline" className="border-renata-yellow text-renata-black hover:bg-renata-yellow hover:text-black">
                Admin
              </Button>
            </Link>
            <button
              className="md:hidden text-renata-black"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-renata-black hover:text-renata-yellow transition-colors px-4 py-2">
                Inicio
              </Link>
              <Link to="/productos" className="text-renata-black hover:text-renata-yellow transition-colors px-4 py-2">
                Productos
              </Link>
              <Link to="/nosotros" className="text-renata-black hover:text-renata-yellow transition-colors px-4 py-2">
                Nosotros
              </Link>
              <Link to="/contacto" className="text-renata-black hover:text-renata-yellow transition-colors px-4 py-2">
                Contacto
              </Link>
              <Link to="/admin" className="text-renata-black hover:text-renata-yellow transition-colors px-4 py-2">
                Admin
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
