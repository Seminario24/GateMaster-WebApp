import PropTypes from 'prop-types'; // Importa PropTypes para la validación
import Header from '../Header/Header'; 
import Footer from '../Footer/Footer'; 

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Añade PropTypes para validar las props
Layout.propTypes = {
  children: PropTypes.node.isRequired, // children es requerido y debe ser un nodo de React
};

export default Layout;