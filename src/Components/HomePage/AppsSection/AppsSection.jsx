
import './AppsSection.css';

const apps = [
  { title: "CRM", description: "CRM" },
  { title: "ERP", description: "ERP" },
  { title: "SAC", description: "SAC" },
  { title: "Keycloak", description: "Seguros" },
  { title: "RRHH", description: "RRHH" },
  { title: "Add more", description: "" }
];

const AppsSection = () => {
  return (
    <section className="apps-section">
      <h2>Apps</h2>
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div className="app-card" key={index}>
            <h3>{`"${app.title}"`}</h3>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppsSection;
