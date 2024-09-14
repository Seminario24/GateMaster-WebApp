import Sidebar from './Components/sideBar/sidebar';
import UserTable from './Components/Usuarios/Usuarios';
import './app.css'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <UserTable />
    </div>
  );
}

export default App;
