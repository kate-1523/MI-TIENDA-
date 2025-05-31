// src/components/AdminPanel.jsx
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [productos, setProductos] = useState(() =>
    JSON.parse(localStorage.getItem("productos") || "[]")
  );
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    pagina: "",
    imagen: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = [...productos];
    if (editIndex !== null) {
      nuevos[editIndex] = formData;
    } else {
      nuevos.push(formData);
    }
    setProductos(nuevos);
    setEditIndex(null);
    setFormData({ nombre: "", descripcion: "", precio: "", pagina: "", imagen: "" });
    localStorage.setItem("productos", JSON.stringify(nuevos));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(productos[index]);
  };

  const handleDelete = (index) => {
    const nuevos = productos.filter((_, i) => i !== index);
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Inputs para nombre, descripcion, precio, pagina */}
        <input
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
        />
        <input
          placeholder="Página (productos.html o cocteles.html)"
          value={formData.pagina}
          onChange={(e) => setFormData({ ...formData, pagina: e.target.value })}
        />
        <button type="submit">Guardar producto</button>
      </form>

      <div>
        {productos.map((p, i) => (
          <div key={i}>
            <strong>{p.nombre}</strong> - ${p.precio}
            <button onClick={() => handleEdit(i)}>Editar</button>
            <button onClick={() => handleDelete(i)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
