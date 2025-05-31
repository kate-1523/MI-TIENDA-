import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Agenda = () => {
  const [mostrarServicios, setMostrarServicios] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Cita reservada correctamente.');
    e.target.reset();
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
        <h1>Agenda tu Cita</h1>
        <section className="agenda">
          <div className="agenda-servicios">
            <h2
              onClick={() => setMostrarServicios(!mostrarServicios)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Servicios Disponibles {mostrarServicios ? '▲' : '▼'}
            </h2>
            {mostrarServicios && (
              <ul>
                <li>Consulta naturista</li>
                <li>Terapia de masajes</li>
                <li>Desintoxicación y limpieza</li>
              </ul>
            )}
          </div>
          <div className="agenda-formulario">
            <h2>Reserva tu horario</h2>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor="nombre">Nombre:</label></td>
                    <td><input id="nombre" type="text" required /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="email">Email:</label></td>
                    <td><input id="email" type="email" required /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="fecha">Fecha:</label></td>
                    <td><input id="fecha" type="date" required /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="hora">Hora:</label></td>
                    <td><input id="hora" type="time" required /></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                      <button type="submit">Reservar Cita</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Agenda;
