// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GateMasterLogin from './Components/GateMasterLogin/GateMasterLogin';
import LandingPage from './pages/LandingPage';
import Permisos from './pages/Permisos'; 
import Aplicaciones from './pages/Aplicaciones';
import AboutUs from './pages/AboutUs'; 
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Layout from './Components/Layout/Layout';
import Dashboard from './Components/DashboardRBAC/Dashboard';
import CrearUsuarios from "./Components/DashboardRBAC/Components/CrearUsuarios/CrearUsuarios";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública para LandingPage */}
          <Route 
            path="/" 
            element={
              <Layout>
                <LandingPage />
              </Layout>
            } 
          />
          
          {/* Ruta pública para el Login */}
          <Route 
            path="/login" 
            element={<GateMasterLogin />} 
          />

          {/* Rutas protegidas */}
          <Route 
            path="/permisos" 
            element={
              <PrivateRoute>
                <Layout>
                  <Permisos />
                </Layout>
              </PrivateRoute>
            }   
          />
          <Route
            path="/CrearUsuarios"
            element={
              <PrivateRoute>
                <Layout>
                  <CrearUsuarios />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route 
            path="/aplicaciones" 
            element={
              <PrivateRoute>
                <Layout>
                  <Aplicaciones />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/aboutus" 
            element={
              <PrivateRoute>
                <Layout> 
                  <AboutUs />
                </Layout>
              </PrivateRoute>
            } 
          />
          
          {/* Ruta protegida para el Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
