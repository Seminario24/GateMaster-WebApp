import './AboutSection.css';

const quotes = Array(6).fill({ title: "Quote", description: "Title Description" });

const AboutSection = () => {
  return (
    <section className="about-section">
      <h2>Acerca de Nosotros</h2>
      <div className="quotes-grid">
        {quotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <h3>{`"${quote.title}"`}</h3>
            <p>{quote.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
