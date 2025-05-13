
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl font-bold text-renata-yellow mb-4">404</h1>
        <p className="text-2xl font-medium mb-6">Página no encontrada</p>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button asChild className="bg-renata-yellow text-black hover:bg-renata-darkgold">
          <a href="/">Volver a Inicio</a>
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
