import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css'; 

const Index = () => (
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
      <section id="hero">
        <div className="contenido-hero">
          <h1 className="animado">Bienvenido a tu espacio natural</h1>
          <p className="animado">Productos y servicios para cuidar tu cuerpo y mente</p>
          <Link className="btn-hero animado" to="/productos">Ver productos</Link>
          <p>Explora nuestros productos y servicios naturales para mejorar tu bienestar.</p>
        </div>
      </section>

      <section id="destacados">
        <h2>Productos Destacados</h2>
        <div className="productos">
          <article className="producto">
            <img src="/imagenes/tres.jpg" alt="Suplemento Natural" />
            <h3>Suplemento Natural</h3>
            <p className="price">$00.00</p>
            <Link className="btn" to="/productos">Ver más</Link>
          </article>

          <article className="producto">
            <img src="/imagenes/lip.jpg" alt="Desintoxicante" />
            <h3>Desintoxicante</h3>
            <p className="price">$00.00</p>
            <Link className="btn" to="/productos">Ver más</Link>
          </article>
        </div>
      </section>

      <section id="informacion-extra">
        <h2>Información Adicional</h2>
        <p>Consulta nuestras recomendaciones y beneficios de los productos naturales.</p>
      </section>
    </main>

    <footer>
      <p>© 2024 Tienda Naturista. Todos los derechos reservados.</p>
    </footer>
  </div>
);

export default Index;
