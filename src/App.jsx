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
import Usuarios from './Components/DashboardRBAC/Components/Usuarios/Usuarios'; // Componente Usuarios
import Ajustes from './Components/DashboardRBAC/Components/Ajustes/Ajustes';   // Componente Ajustes
import Apps from './Components/DashboardRBAC/Components/Apps/apps';         // Componente Apps

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
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
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Rutas protegidas adicionales */}
          <Route 
            path="/roles" 
            element={
              <PrivateRoute>
                <Layout>
                  <Roles />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <Layout>
                  <Usuarios />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PrivateRoute>
                <Layout>
                  <Ajustes />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/apps" 
            element={
              <PrivateRoute>
                <Layout>
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
