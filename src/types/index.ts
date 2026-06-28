export interface Question {
  id: string;
  user: string;
  text: string;
  answer?: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  category: string;
  image: string;
  images?: string[]; // Multiple high-res image angles
  rating: number;
  reviewsCount: number;
  stock: number;
  freeShipping: boolean;
  isFull: boolean;
  sellerName: string;
  sellerRating: 'green' | 'yellow' | 'red';
  questions: Question[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  trackingStep: number; // 0: Pago aprobado, 1: En camino (camión moviéndose), 2: Cerca de tu domicilio, 3: Entregado
  paymentMethod: string;
  address: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  type: 'guest' | 'user';
}
