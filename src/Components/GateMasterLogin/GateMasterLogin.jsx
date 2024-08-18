import './gateMasterLogin.css';

export default function GateMasterLogin() {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h1>Bienvenido a GateMaster</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <div className="login-card">
          <button className="login-button google-button">
            <ChromeIcon className="icon" />
            Iniciar sesión con Google
          </button>
          <div className="divider">
            <span>o inicia sesión con</span>
          </div>
          <form className="login-form">
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" placeholder="ejemplo@gmail.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" placeholder="********" required />
            </div>
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
