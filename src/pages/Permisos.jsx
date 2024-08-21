
import Header from '../Components/Header/Header'; // Ajusta la ruta según sea necesario
import Footer from '../Components/Footer/Footer'; // Ajusta la ruta según sea necesario

const Permisos = () => {
  return (
    <>
      <Header /> {/* Header en la parte de arriba */}
      <div className="permisos-page">
        <h1>Página de Permisos</h1>
        <p>Aquí puedes gestionar los permisos de los usuarios.</p>
        {/* Aquí puedes agregar más contenido relacionado con la gestión de permisos */}
      </div>
      <Footer /> {/* Footer en la parte de abajo */}
    </>
  );
};

export default Permisos;
