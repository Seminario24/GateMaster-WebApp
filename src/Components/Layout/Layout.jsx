
import PropTypes from 'prop-types'; 
import { useLocation } from 'react-router-dom'; 
import Header from '../HomePage/Header/Header'; 
import Footer from '../HomePage/Footer/Footer'; 

const Layout = ({ children }) => {
  const location = useLocation();

  // Define las rutas donde no quieres mostrar el Header
  const routesWithoutHeader = ['/roles', '/users', '/settings', '/apps', '/dashboard'];

  // Verifica si la ruta actual está en la lista de rutas sin Header
  const hideHeader = routesWithoutHeader.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Añade PropTypes para validar las props
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
