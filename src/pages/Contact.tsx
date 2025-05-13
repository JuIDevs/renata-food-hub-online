
import { useState, FormEvent } from 'react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import messages from '@/data/messages';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      const newMessage = {
        id: (messages.length + 1).toString(),
        ...formValues,
        date: new Date(),
        read: false
      };
      
      messages.push(newMessage);
      
      setFormValues({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Responderemos a la brevedad.",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleWhatsApp = () => {
    const { name, email, phone, message } = formValues;
    if (!name || !email || !phone || !message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos del formulario.",
        variant: "destructive"
      });
      return;
    }
    
    // Format the message for WhatsApp
    const whatsappMessage = `Hola, mi nombre es ${name}. Email: ${email}. Teléfono: ${phone}. Mensaje: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/5493512742582?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Contact Hero */}
      <section className="pt-32 pb-16 bg-renata-offwhite">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contáctenos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Estamos aquí para ayudarle. Póngase en contacto con nosotros para cualquier consulta o cotización.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-renata-lightgray p-3 rounded-full mr-4">
                    <MapPin className="text-renata-yellow" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Dirección</h3>
                    <p className="text-gray-600">Mariano Fragueiro 3746, Córdoba, Argentina</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-renata-lightgray p-3 rounded-full mr-4">
                    <Mail className="text-renata-yellow" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:info@distribuidorarenata.com" className="text-gray-600 hover:text-renata-yellow transition-colors">
                      info@distribuidorarenata.com
                    </a>
                    <p className="text-gray-600">Para consultas generales</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-renata-lightgray p-3 rounded-full mr-4">
                    <Phone className="text-renata-yellow" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Teléfono</h3>
                    <a href="tel:+5493512742582" className="text-gray-600 hover:text-renata-yellow transition-colors">
                      +54 9 351 274-2582
                    </a>
                    <p className="text-gray-600">Horario de atención</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Nuestra Ubicación</h2>
                <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.3213025538196!2d-64.1799567!3d-31.3726236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329877662af9ef%3A0x12612f7c18ee7afc!2sMariano%20Fragueiro%203746%2C%20C%C3%B3rdoba%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1715472822957!5m2!1ses-419!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Distribuidora Renata"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Envíenos un Mensaje</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Su nombre completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Su correo electrónico"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formValues.phone}
                        onChange={handleChange}
                        placeholder="Su número de teléfono"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                        placeholder="¿En qué podemos ayudarle?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-renata-yellow text-black hover:bg-renata-darkgold flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                        <Send size={16} className="ml-2" />
                      </Button>
                      
                      <Button 
                        type="button"
                        variant="outline"
                        className="border-renata-yellow text-renata-black hover:bg-renata-yellow hover:text-black flex-1"
                        onClick={handleWhatsApp}
                      >
                        Contactar por WhatsApp
                        <svg 
                          className="w-4 h-4 ml-2" 
                          fill="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-8 bg-renata-lightgray p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Horario de Atención</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes a Viernes:</span>
                    <span>8:30 - 13:00 y 17:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábados:</span>
                    <span>8:30 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingo:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-renata-offwhite">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">¿Cuál es el pedido mínimo?</h3>
              <p className="text-gray-600">
                Nuestro pedido mínimo es de $100. Para pedidos más pequeños, le recomendamos visitar nuestros distribuidores minoristas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">¿Cuánto tiempo tarda la entrega?</h3>
              <p className="text-gray-600">
                La entrega generalmente se realiza en un plazo de 24-48 horas después de confirmar el pedido, dependiendo de su ubicación.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">¿Ofrecen descuentos por volumen?</h3>
              <p className="text-gray-600">
                Sí, ofrecemos descuentos especiales para pedidos grandes y clientes recurrentes. Contáctenos para obtener una cotización personalizada.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">¿Qué áreas cubren con su servicio?</h3>
              <p className="text-gray-600">
                Actualmente cubrimos toda el área metropolitana y algunas ciudades cercanas. Póngase en contacto con nosotros para verificar si su ubicación está dentro de nuestra área de servicio.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
