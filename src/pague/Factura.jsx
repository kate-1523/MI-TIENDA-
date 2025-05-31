// src/components/Factura.jsx
import { useCart } from "../context/CartContext";

export default function Factura() {
  const { cart } = useCart();

  const generarFactura = () => {
    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }
    window.print();
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h2>Factura</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => (
            <tr key={i}>
              <td>{item.nombre}</td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={generarFactura}>Imprimir</button>
    </div>
  );
}
