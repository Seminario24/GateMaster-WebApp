
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className="about-project">
      <header className="about-project-header">
        <h1>Sobre el Proyecto</h1>
        <p>Conoce más sobre nuestro increíble proyecto y cómo está diseñado para hacer la vida más fácil.</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Innovación</h2>
          <p>Utilizamos las tecnologías más avanzadas para ofrecer soluciones innovadoras que mejoren tu productividad.</p>
        </div>
        <div className="feature-card">
          <h2>Facilidad de Uso</h2>
          <p>Interfaz intuitiva y fácil de usar que permite a los usuarios adaptarse rápidamente sin necesidad de largas curvas de aprendizaje.</p>
        </div>
        <div className="feature-card">
          <h2>Seguridad</h2>
          <p>Nos tomamos muy en serio la seguridad de tus datos y utilizamos las mejores prácticas para proteger tu información.</p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>¿Quieres saber más?</h2>
        <p>¡Contáctanos hoy y descubre cómo nuestro proyecto puede ayudarte a alcanzar tus objetivos!</p>
        <button className="cta-button">Contáctanos</button>
      </section>
    </div>
  );
};

export default AboutProject;
