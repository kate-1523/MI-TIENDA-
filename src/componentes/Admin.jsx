import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    previewImage: '',
    page: ''
  });

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProducts(productosGuardados);
  }, []);

  const login = (e) => {
    e.preventDefault();
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('contrasena').value;

    if (username === 'administrador' && password === '1234') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  

  const logout = () => {
    setLoggedIn(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null,
      previewImage: '',
      page: ''
    });
    setIsEditing(false);
    setEditingIndex(null);
    document.getElementById('imagen').value = '';
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    const imagenURL = formData.image ? URL.createObjectURL(formData.image) : formData.previewImage;

    const nuevoProducto = {
      id: isEditing ? editingIndex : Date.now(),
      nombre: formData.name,
      descripcion: formData.description,
      precio: formData.price,
      imagen: imagenURL,
      pagina: formData.page
    };

    const actualizados = isEditing
      ? products.map(p => (p.id === editingIndex ? nuevoProducto : p))
      : [...products, nuevoProducto];

    setProducts(actualizados);
    localStorage.setItem('productos', JSON.stringify(actualizados));

    resetForm();
    document.getElementById('notificacion').style.display = 'block';
    setTimeout(() => {
      document.getElementById('notificacion').style.display = 'none';
    }, 2000);
  };

  const editarProducto = (producto) => {
    setFormData({
      name: producto.nombre,
      description: producto.descripcion,
      price: producto.precio,
      image: null,
      previewImage: producto.imagen,
      page: producto.pagina
    });
    setIsEditing(true);
    setEditingIndex(producto.id);
  };

  const eliminarProducto = (id) => {
    const filtrados = products.filter(p => p.id !== id);
    setProducts(filtrados);
    localStorage.setItem('productos', JSON.stringify(filtrados));
  };

  return (
    <div className="admin-body">
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

      <main className="contenedor">
        {!loggedIn ? (
          <section className="admin-login" id="login-section">
            <h2>🔐 Ingreso Administrador</h2>
            <form onSubmit={login}>
              <table className="tabla-login">
                <tbody>
                  <tr>
                    <td><label htmlFor="usuario">Usuario:</label></td>
                    <td><input id="usuario" type="text" required /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="contrasena">Contraseña:</label></td>
                    <td><input id="contrasena" type="password" required /></td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      <button className="btn" type="submit">Ingresar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
          </section>
        ) : (
          <section id="admin-panel">
            <h2>⚙️ Panel de Control</h2>

            <div className="admin-box">
              <h3>➕ Agregar/Editar Producto</h3>
              <form onSubmit={guardarProducto}>
                <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Nombre del producto" required type="text" />
                <input name="description" value={formData.description} onChange={handleFormChange} placeholder="Descripción" required type="text" />
                <input name="price" value={formData.price} onChange={handleFormChange} placeholder="Precio" required type="number" />
                <label htmlFor="imagen">Imagen del producto</label>
                <input accept="image/*" id="imagen" name="image" type="file" onChange={handleFormChange} />
                {formData.previewImage && <img src={formData.previewImage} alt="Preview" width="100" />}
                <label htmlFor="pagina">¿Dónde se mostrará?</label>
                <select name="page" value={formData.page} onChange={handleFormChange} required>
                  <option value="">Seleccionar...</option>
                  <option value="productos">Productos</option>
                  <option value="cocteles">Cócteles</option>
                </select>
                <button className="btn" type="submit">Guardar</button>
              </form>
            </div>

            <button className="btn" onClick={logout}>Cerrar sesión</button>

            <div className="admin-box">
              <h3>📢 Agregar Anuncio</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert("Anuncio publicado");
              }}>
                <textarea id="mensaje" placeholder="Mensaje del anuncio" required></textarea>
                <button className="btn" type="submit">Publicar</button>
              </form>
            </div>

            <div className="admin-box">
              <h3>📦 Productos Agregados</h3>
              <div id="lista-productos">
                {products.length === 0 ? (
                  <p>No hay productos agregados.</p>
                ) : (
                  products.map((p) => (
                    <div key={p.id}>
                      <strong>{p.nombre}</strong> - ${p.precio}<br />
                      <img src={p.imagen} alt={p.nombre} width="100" /><br />
                      <small>{p.descripcion} ({p.pagina})</small><br />
                      <button onClick={() => editarProducto(p)}>Editar</button>
                      <button onClick={() => eliminarProducto(p.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                      <hr />
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <div id="notificacion" style={{ display: 'none', textAlign: 'center' }}>
        ✅ Producto guardado exitosamente
      </div>
    </div>
  );
};

export default Admin;
