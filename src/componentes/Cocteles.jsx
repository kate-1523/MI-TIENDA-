import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/ShoppingCartContext';

const Cocteles = () => {
  const { agregarProducto } = useCart();
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Filtrar los que están destinados a la sección de cocteles
    const coctelesFiltrados = productosGuardados.filter(p => p.pagina === 'cocteles');

    setProductos(coctelesFiltrados);
  }, []);

  const manejarAgregar = (producto) => {
    agregarProducto(producto);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 2000);
  };

  return (
    <>
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
        <h1>Cocteles Naturales</h1>
        <section className="productos">
          {productos.length === 0 ? (
            <p>No hay cocteles disponibles.</p>
          ) : (
            productos.map((prod, index) => (
              <article key={index} className="producto">
                <img alt={prod.nombre} src={prod.imagen} className="img-producto" />
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <p>Precio: ${parseFloat(prod.precio).toLocaleString()}</p>
                <button onClick={() => manejarAgregar({ ...prod, cantidad: 1 })}>
                  Agregar al carrito
                </button>
              </article>
            ))
          )}
        </section>

        {mensajeVisible && (
          <div className="mensaje-carrito">¡Se agregó al carrito!</div>
        )}
      </main>
    </>
  );
};

export default Cocteles;
