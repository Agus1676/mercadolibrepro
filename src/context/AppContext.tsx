'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserSession } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/initialProducts';

interface AppContextType {
  user: UserSession;
  login: () => void;
  logout: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'questions' | 'sellerRating'>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (paymentMethod: string, address: string) => Order;
  addQuestionToProduct: (productId: string, text: string) => void;
  simulateDeliveryStep: (orderId: string) => void;
  favorites: string[]; // Product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isMounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserSession>({
    isLoggedIn: false,
    username: '',
    type: 'guest',
  });
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    
    const savedUser = localStorage.getItem('ml_user');
    const savedProducts = localStorage.getItem('ml_products');
    const savedCart = localStorage.getItem('ml_cart');
    const savedOrders = localStorage.getItem('ml_orders');
    const savedFavorites = localStorage.getItem('ml_favorites');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem('ml_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const sampleOrders: Order[] = [
        {
          id: 'order-998',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              product: INITIAL_PRODUCTS[2],
              quantity: 1
            }
          ],
          total: 650000,
          status: 'delivered',
          trackingStep: 3,
          paymentMethod: 'Tarjeta de Crédito (Visa terminar en 4321)',
          address: 'Av. Cabildo 2200, Belgrano, CABA'
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('ml_orders', JSON.stringify(sampleOrders));
    }
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ml_user', JSON.stringify(user));
  }, [user, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ml_products', JSON.stringify(products));
  }, [products, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ml_cart', JSON.stringify(cart));
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ml_orders', JSON.stringify(orders));
  }, [orders, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ml_favorites', JSON.stringify(favorites));
  }, [favorites, isMounted]);

  const login = () => {
    setUser({
      isLoggedIn: true,
      username: 'Agustin Pollan',
      type: 'user',
    });

    if (cart.length === 0) {
      setCart([
        { product: products[0], quantity: 1 }, // iPhone 15 Pro Max
        { product: products[5], quantity: 1 }, // Custom ModKey Keyboard
      ]);
    }
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      username: '',
      type: 'guest',
    });
    setCart([]);
    setFavorites([]);
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'questions' | 'sellerRating'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      sellerRating: 'green',
      questions: [],
    };
    setProducts((prev) => [product, ...prev]);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const createOrder = (paymentMethod: string, address: string) => {
    const total = cart.reduce((acc, item) => {
      const price = item.product.price;
      return acc + price * item.quantity;
    }, 0);

    const newOrder: Order = {
      id: `order-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: total,
      status: 'processing',
      trackingStep: 0,
      paymentMethod,
      address,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const simulateDeliveryStep = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const nextStep = order.trackingStep + 1;
        
        let newStatus: Order['status'] = 'processing';
        if (nextStep >= 3) {
          newStatus = 'delivered';
        } else if (nextStep >= 1) {
          newStatus = 'shipped';
        }

        return {
          ...order,
          trackingStep: Math.min(nextStep, 3),
          status: newStatus,
        };
      })
    );
  };

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setOrders((prev) => {
        let changed = false;
        const updated = prev.map((order) => {
          if (order.status !== 'delivered' && order.trackingStep < 3) {
            changed = true;
            const nextStep = order.trackingStep + 1;
            const newStatus: Order['status'] = nextStep >= 3 ? 'delivered' : 'shipped';
            return {
              ...order,
              trackingStep: nextStep,
              status: newStatus,
            };
          }
          return order;
        });
        return changed ? updated : prev;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, [isMounted]);

  // Favorites logic
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  const addQuestionToProduct = (productId: string, text: string) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;

        const newQuestion = {
          id: `q-${Date.now()}`,
          user: user.isLoggedIn ? user.username : 'Invitado',
          text,
          date: new Date().toISOString(),
        };

        setTimeout(() => {
          setProducts((currentProds) =>
            currentProds.map((p) => {
              if (p.id !== productId) return p;
              return {
                ...p,
                questions: p.questions.map((q) => {
                  if (q.id !== newQuestion.id) return q;
                  return {
                    ...q,
                    answer: '¡Hola! Gracias por tu consulta. Sí, tenemos stock disponible de este producto para entrega inmediata y hacemos envíos a todo el país. Esperamos tu compra. ¡Saludos!',
                  };
                }),
              };
            })
          );
        }, 3000);

        return {
          ...prod,
          questions: [newQuestion, ...prod.questions],
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        products,
        addProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        createOrder,
        addQuestionToProduct,
        simulateDeliveryStep,
        favorites,
        toggleFavorite,
        isFavorite,
        isMounted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
