import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './componentes/Index';
import Productos from './componentes/Productos';
import Cocteles from './componentes/Cocteles';
import Agenda from './componentes/Agenda';
import Facturacion from './componentes/Facturacion';
import Admin from './componentes/Admin';
import { CartProvider } from "./context/ShoppingCartContext"; 


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/cocteles" element={<Cocteles />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
