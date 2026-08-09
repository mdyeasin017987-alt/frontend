"use client";
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

// ---------- Initial State ----------
export const initialState = {
  items: [],
  isOpen: false,
};

// ---------- Reducer ----------
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);

      // In CartContext ADD_ITEM case:
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } // ← ADDS to existing
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'INCREASE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'DECREASE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'SET_CART':
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

// ---------- Context ----------
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window === 'undefined') return initial;
    try {
      const saved = localStorage.getItem('sahyesnatural_cart');
      return saved ? { ...initial, items: JSON.parse(saved) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem('sahyesnatural_cart', JSON.stringify(state.items));
  }, [state.items]);

  // price DB তে string ("500") হিসেবে আছে, তাই সবসময় Number() দিয়ে coerce করছি
  const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const addItem = (product, quantity = 1) =>
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.title,
        price: Number(product.price),
        image: product.image,
        piece: Number(product.piece),
        weight: product.weight,
        quantity,
      },
    });

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const increaseQty = (id) => dispatch({ type: 'INCREASE_QTY', payload: { id } });
  const decreaseQty = (id) => dispatch({ type: 'DECREASE_QTY', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // useMemo দিয়ে value wrap — cart state না বদলালে consumer গুলো re-render হবে না
  const value = useMemo(
    () => ({
      items: state.items,
      totalQuantity,
      totalPrice,
      addItem,
      removeItem,
      increaseQty,
      decreaseQty,
      clearCart,
    }),
    [state.items, totalQuantity, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}