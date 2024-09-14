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
import Dashboard from './Components/DashboardRBAC/Dashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GateMasterLogin />} />
          <Route 
            path="/landingpage" 
            element={
              <PrivateRoute>
                <Layout> {/* Usa el Layout para envolver la página */}
                  <LandingPage />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/permisos" 
            element={
              <PrivateRoute>
                <Layout> {/* Usa el Layout para envolver la página */}
                  <Permisos />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/aplicaciones" 
            element={
              <PrivateRoute>
                <Layout> {/* Usa el Layout para envolver la página */}
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
          
          {/* Ruta principal de la App */}
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
