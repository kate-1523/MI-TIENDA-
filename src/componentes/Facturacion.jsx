import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/ShoppingCartContext';

const Facturacion = () => {
  const { carrito, limpiarCarrito, eliminarProducto, actualizarCantidad } = useCart();

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const manejarCantidad = (index, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad, 10);
    if (!isNaN(cantidad) && cantidad >= 1) {
      actualizarCantidad(index, cantidad);
    }
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
        <h1>Facturación</h1>
        <section className="carrito">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={producto.cantidad}
                      onChange={(e) => manejarCantidad(index, e.target.value)}
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
                  <td>
                    <button onClick={() => eliminarProducto(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p><strong>Total:</strong> ${total.toLocaleString()}</p>
          <button onClick={limpiarCarrito}>Generar Factura</button>
        </section>
      </main>
    </>
  );
};

export default Facturacion;
