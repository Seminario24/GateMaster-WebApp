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
import Roles from './Components/DashboardRBAC/Components/Roles/Roles';
import Usuarios from './Components/DashboardRBAC/Components/Usuarios/Usuarios';
import Ajustes from './Components/DashboardRBAC/Components/Ajustes/Ajustes';
import Apps from './Components/DashboardRBAC/Components/Apps/apps';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública con Header */}
          <Route 
            path="/" 
            element={
              <Layout showTopNav={true}>
                <LandingPage />
              </Layout>
            } 
          />
          <Route 
            path="/login" 
            element={<GateMasterLogin />} 
          />

          {/* Rutas protegidas */}
          <Route 
            path="/permisos" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Permisos />
                </Layout>
              </PrivateRoute>
            }   
          />
          <Route
            path="/CrearUsuarios"
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <CrearUsuarios />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route 
            path="/aplicaciones" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Aplicaciones />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/aboutus" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <AboutUs />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } 
          />
          
          {/* Rutas adicionales protegidas */}
          <Route 
            path="/roles" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Roles />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Usuarios />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Ajustes />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/apps" 
            element={
              <PrivateRoute>
                <Layout showTopNav={false}>
                  <Apps />
                </Layout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
