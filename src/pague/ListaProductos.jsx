import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("productos")) || [];
    const filtrados = all.filter((p) => p.pagina === "productos.html");
    setProductos(filtrados);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {productos.map((p, i) => (
        <div key={i} className="border p-2 rounded">
          <img src={p.imagen} alt={p.nombre} className="h-40 object-cover" />
          <h3>{p.nombre}</h3>
          <p>{p.descripcion}</p>
          <p>${p.precio}</p>
          <button onClick={() => addToCart(p)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default Productos;
