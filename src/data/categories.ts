
export interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "fruits",
    name: "Frutas",
    description: "Frutas frescas de temporada"
  },
  {
    id: "vegetables",
    name: "Verduras",
    description: "Verduras frescas de productores locales"
  },
  {
    id: "dairy",
    name: "Lácteos",
    description: "Productos lácteos de alta calidad"
  },
  {
    id: "meats",
    name: "Carnes",
    description: "Carnes frescas y procesadas"
  },
  {
    id: "frozen",
    name: "Congelados",
    description: "Productos congelados para su conveniencia"
  },
  {
    id: "groceries",
    name: "Abarrotes",
    description: "Productos de despensa para su negocio"
  }
];

export default categories;
