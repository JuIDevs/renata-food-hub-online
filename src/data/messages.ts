
export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: Date;
  read: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    message: "Quisiera saber si tienen disponibilidad para entregar pedidos grandes en la zona norte de la ciudad.",
    date: new Date('2023-05-10T10:30:00'),
    read: true
  },
  {
    id: "2",
    name: "María González",
    email: "maria.gonzalez@example.com",
    message: "Necesito información sobre sus precios mayoristas para restaurantes.",
    date: new Date('2023-05-12T14:15:00'),
    read: false
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    message: "¿Ofrecen algún descuento para pedidos recurrentes mensuales?",
    date: new Date('2023-05-15T09:45:00'),
    read: false
  }
];

export default messages;
