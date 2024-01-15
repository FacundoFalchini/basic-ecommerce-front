const Footer = () => {
  return (
    <footer className="min-mt-8 mt-8 flex  w-full grow flex-col bg-gradient-to-r from-white via-gray-100 to-white text-center text-white    ">
      {/* Como no hay border gradient, hago un div bajito con fondo gradiente simulando el borde */}
      <div className="h-0.5 bg-gradient-to-r from-white via-gray-200 to-white "></div>
      {/* Si bien, sin ser flex y justify center ya quedaban centrados, eso era pura casualidad porque les daba el espacio en el div a los tres p para acomodarse asi. Importante, los tuve que hacer inline porque sino por defecto ocupan todo el largo del cotnenedor y no entran */}
      <div className="mb-4 mt-6 flex w-full justify-center    ">
        <p className=" inline cursor-pointer  text-xs text-blueText hover:text-red-900 hover:underline focus:outline-none">
          Condiciones de uso
        </p>
        <p className="ml-7 mr-7 inline cursor-pointer  text-xs text-blueText hover:text-red-900 hover:underline focus:outline-none">
          Aviso de privacidad
        </p>
        <p className="inline cursor-pointer text-xs text-blueText hover:text-red-900 hover:underline focus:outline-none">
          Ayuda
        </p>
      </div>

      <p className="text-xs text-gray-500  ">
        &copy; 2023 Mi Aplicación. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
