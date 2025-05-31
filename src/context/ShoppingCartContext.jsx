// src/context/ShoppingCartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find(p => p.nombre === producto.nombre);
      if (existente) {
        return prev.map(p =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const limpiarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

