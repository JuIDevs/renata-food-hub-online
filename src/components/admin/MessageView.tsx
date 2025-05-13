
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { X, Reply, Trash } from 'lucide-react';
import { Message } from '@/data/messages';

interface MessageViewProps {
  message: Message;
  onClose: () => void;
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const MessageView = ({ message, onClose, onDelete, onMarkAsRead }: MessageViewProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleReply = () => {
    if (!message.email) {
      toast({
        title: "Error",
        description: "No se proporcionó un correo electrónico para responder",
        variant: "destructive"
      });
      return;
    }
    
    window.location.href = `mailto:${message.email}?subject=RE: Consulta en DistribuidoraRenata&body=Estimado/a ${message.name},\n\nGracias por su mensaje. En respuesta a su consulta:\n\n"${message.message}"\n\nSaludos cordiales,\nEquipo de DistribuidoraRenata`;
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Mark as read if not already
    if (!message.read) {
      onMarkAsRead(message.id);
    }
    
    // Delay to simulate API call
    setTimeout(() => {
      onDelete(message.id);
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado correctamente"
      });
      setIsDeleting(false);
    }, 500);
  };
  
  const handleWhatsApp = () => {
    if (!message.phone) {
      toast({
        title: "Error",
        description: "No se proporcionó un número de teléfono para contactar por WhatsApp",
        variant: "destructive"
      });
      return;
    }
    
    // Format phone for WhatsApp (removing spaces, dashes, etc.)
    const formattedPhone = message.phone.replace(/\D/g, '');
    const whatsappMessage = `Hola ${message.name}, gracias por contactarnos en DistribuidoraRenata. En respuesta a tu mensaje: "${message.message.substring(0, 50)}${message.message.length > 50 ? '...' : ''}"`;
    
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mensaje de {message.name}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Recibido: {formatDate(message.date)}</p>
          <p className="text-sm text-gray-500">{message.read ? 'Leído' : 'No leído'}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
            <p>{message.name}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="break-words">{message.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
            <p>{message.phone || 'No proporcionado'}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Mensaje</h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="whitespace-pre-line">{message.message}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            variant="outline" 
            className="border-green-500 text-green-600 hover:bg-green-50"
            onClick={handleWhatsApp}
          >
            Responder por WhatsApp
            <svg 
              className="w-4 h-4 ml-2" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </Button>
          
          <Button 
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
            onClick={handleReply}
          >
            Responder por Email
            <Reply size={16} className="ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
            <Trash size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
