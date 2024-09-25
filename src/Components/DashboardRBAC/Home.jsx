import Sidebar from './Components/sideBar/sidebar';
import Inicio from './Components/Inicio/Inicio';
import './app.css'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Inicio />
    </div>
  );
}

export default App;
