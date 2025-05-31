import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import { useCart } from '../context/ShoppingCartContext';

const Productos = () => {
  const { agregarProducto } = useCart();
  const [mensaje, setMensaje] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const productosFiltrados = productosGuardados.filter(p => p.pagina === 'productos');
    setProductos(productosFiltrados);
  }, []);

  const manejarAgregarProducto = (producto) => {
    agregarProducto(producto);
    setMensaje(`✅ ${producto.nombre} agregado al carrito`);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/cocteles">Cocteles Naturales</Link></li>
            <li><Link to="/agenda">Agenda tu Cita</Link></li>
            <li><Link to="/facturacion">Facturación</Link></li>
            <li><Link to="/admin">Administrador</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Nuestros Productos</h1>

        {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

        <section className="productos">
          {productos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            productos.map((prod, index) => (
              <article className="producto" key={index}>
                <img src={prod.imagen} alt={prod.nombre} className="img-producto" />
          
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <p>Precio: ${parseFloat(prod.precio).toLocaleString()}</p>
                <button
                  className="agregar-carrito"
                  onClick={() => manejarAgregarProducto({ ...prod, cantidad: 1 })}
                >
                  Agregar al carrito
                </button>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Productos;
