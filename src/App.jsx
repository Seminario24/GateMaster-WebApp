// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GateMasterLogin from './Components/GateMasterLogin/GateMasterLogin';
import LandingPage from './pages/LandingPage';
import Permisos from './pages/Permisos'; 
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

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
                <LandingPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/permisos" 
            element={
              <PrivateRoute>
                <Permisos />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
