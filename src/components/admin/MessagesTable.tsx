
import { useState } from 'react';
import { Message } from '@/data/messages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, Trash } from 'lucide-react';

interface MessagesTableProps {
  messages: Message[];
  isPreview?: boolean;
  onViewMessage?: (message: Message) => void;
  onDeleteMessage?: (id: string) => void;
}

const MessagesTable = ({ messages, isPreview = false, onViewMessage, onDeleteMessage }: MessagesTableProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remitente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mensaje
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
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
          {messages.map((message) => (
            <tr key={message.id} className={`hover:bg-gray-50 ${!message.read ? 'bg-yellow-50' : ''}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-renata-yellow rounded-full flex items-center justify-center text-black font-medium">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{message.name}</div>
                    <div className="text-sm text-gray-500">{message.email}</div>
                    {message.phone && (
                      <div className="text-sm text-gray-500">{message.phone}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 line-clamp-2">{message.message}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(message.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  className={message.read ? "bg-gray-100 text-gray-800" : "bg-renata-yellow text-black"}
                >
                  {message.read ? 'Leído' : 'No leído'}
                </Badge>
              </td>
              {!isPreview && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => onViewMessage && onViewMessage(message)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onDeleteMessage && onDeleteMessage(message.id)}
                  >
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

export default MessagesTable;
