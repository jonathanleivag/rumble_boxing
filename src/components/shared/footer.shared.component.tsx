import { FC } from "react";

const FooterSharedComponent: FC = () => {
  return (
    <footer className="bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-accent-dark/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h1 className="font-bebas text-4xl text-white mb-6 relative inline-block">
            RUMBLE BOXING
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-primary"></span>
          </h1>
          <p className="font-montserrat text-accent-medium mb-6 text-sm leading-relaxed">
            El mejor gimnasio de boxeo para todos los niveles. Entrena como un
            campeón, vive como un guerrero.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                  stroke="#e02020"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="#e02020"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-oswald text-white">NUESTRA UBICACIÓN</p>
              <p className="font-montserrat text-accent-medium">
                Av. Principal #123, Ciudad Deportiva
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-oswald text-xl text-white mb-6 relative inline-block">
            CONTACTO
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary"></span>
          </h4>
          <ul className="font-montserrat text-accent-medium space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>+123 456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6l-10 7L2 6"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>info@rumbleboxing.com</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Ciudad Deportiva</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-oswald text-xl text-white mb-6 relative inline-block">
            HORARIOS
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary"></span>
          </h4>
          <ul className="font-montserrat text-accent-medium space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="12 6 12 12 16 14"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Lunes - Viernes: 6am - 10pm</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="12 6 12 12 16 14"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Sábado: 8am - 8pm</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dark border border-accent-dark/50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="12 6 12 12 16 14"
                    stroke="#e02020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Domingo: 9am - 6pm</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-oswald text-xl text-white mb-6 relative inline-block">
            SÍGUENOS
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary"></span>
          </h4>
          <div className="grid grid-cols-4 gap-3 mb-8">
            <a
              href="#"
              className="w-10 h-10 bg-accent-dark hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center border border-accent-dark/50 hover:scale-110"
            >
              <span className="font-montserrat text-white text-sm">FB</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent-dark hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center border border-accent-dark/50 hover:scale-110"
            >
              <span className="font-montserrat text-white text-sm">IG</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent-dark hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center border border-accent-dark/50 hover:scale-110"
            >
              <span className="font-montserrat text-white text-sm">YT</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent-dark hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center border border-accent-dark/50 hover:scale-110"
            >
              <span className="font-montserrat text-white text-sm">TW</span>
            </a>
          </div>
          <div className="relative">
            <h5 className="font-oswald text-white mb-3 text-sm">
              SUSCRÍBETE A NUESTRO NEWSLETTER
            </h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-accent-dark rounded-l-lg px-4 py-2 w-full text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-primary border border-accent-dark/50 placeholder-accent-medium"
              />
              <button className="bg-primary hover:bg-primary-dark transition-colors duration-300 rounded-r-lg px-4 font-oswald text-white text-sm">
                ENVIAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-accent-dark/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-montserrat text-accent-medium text-center text-xs">
          © {new Date().getFullYear()} RUMBLE BOXING CLUB. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="font-montserrat text-accent-medium hover:text-primary text-xs transition-colors"
          >
            Términos y Condiciones
          </a>
          <a
            href="#"
            className="font-montserrat text-accent-medium hover:text-primary text-xs transition-colors"
          >
            Política de Privacidad
          </a>
          <a
            href="#"
            className="font-montserrat text-accent-medium hover:text-primary text-xs transition-colors"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSharedComponent;
