
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  featured: boolean;
  onSale: boolean;
  salePrice?: number;
  stock: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Manzanas Rojas",
    description: "Manzanas rojas frescas y jugosas, perfectas para cualquier ocasión.",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=400&auto=format&fit=crop",
    categoryId: "fruits",
    featured: true,
    onSale: false,
    stock: 150
  },
  {
    id: "2",
    name: "Plátanos",
    description: "Plátanos frescos y maduros, fuente ideal de potasio y energía.",
    price: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=400&auto=format&fit=crop",
    categoryId: "fruits",
    featured: false,
    onSale: true,
    salePrice: 1.49,
    stock: 200
  },
  {
    id: "3",
    name: "Tomates",
    description: "Tomates rojos y firmes, cultivados por agricultores locales.",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=400&auto=format&fit=crop",
    categoryId: "vegetables",
    featured: true,
    onSale: false,
    stock: 120
  },
  {
    id: "4",
    name: "Queso Fresco",
    description: "Queso fresco artesanal, ideal para ensaladas y platos tradicionales.",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=400&auto=format&fit=crop",
    categoryId: "dairy",
    featured: false,
    onSale: false,
    stock: 80
  },
  {
    id: "5",
    name: "Pollo Entero",
    description: "Pollo entero fresco, criado sin hormonas ni antibióticos.",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=400&auto=format&fit=crop",
    categoryId: "meats",
    featured: true,
    onSale: true,
    salePrice: 7.49,
    stock: 50
  },
  {
    id: "6",
    name: "Yogurt Natural",
    description: "Yogurt natural sin azúcar añadido, rico en probióticos.",
    price: 4.29,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop",
    categoryId: "dairy",
    featured: false,
    onSale: false,
    stock: 90
  },
  {
    id: "7",
    name: "Papas",
    description: "Papas frescas y limpias, perfectas para freír, hornear o puré.",
    price: 3.29,
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop",
    categoryId: "vegetables",
    featured: false,
    onSale: false,
    stock: 200
  },
  {
    id: "8",
    name: "Helado de Vainilla",
    description: "Cremoso helado de vainilla, hecho con ingredientes naturales.",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop",
    categoryId: "frozen",
    featured: false,
    onSale: true,
    salePrice: 5.99,
    stock: 40
  },
  {
    id: "9",
    name: "Arroz Premium",
    description: "Arroz de grano largo de alta calidad, perfecto para cualquier receta.",
    price: 7.49,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop",
    categoryId: "groceries",
    featured: true,
    onSale: false,
    stock: 150
  },
  {
    id: "10",
    name: "Aceite de Oliva Extra Virgen",
    description: "Aceite de oliva de primera presión en frío, sabor excepcional.",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400&auto=format&fit=crop",
    categoryId: "groceries",
    featured: false,
    onSale: false,
    stock: 75
  },
  {
    id: "11",
    name: "Uvas Verdes",
    description: "Uvas verdes sin semilla, dulces y refrescantes.",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1515778767554-195d960ebcb6?q=80&w=400&auto=format&fit=crop",
    categoryId: "fruits",
    featured: false,
    onSale: true,
    salePrice: 3.99,
    stock: 60
  },
  {
    id: "12",
    name: "Pescado Congelado",
    description: "Filetes de pescado blanco congelados, listos para cocinar.",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop",
    categoryId: "frozen",
    featured: false,
    onSale: false,
    stock: 45
  }
];

export default products;
