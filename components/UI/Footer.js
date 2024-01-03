const Footer = () => {
  return (
    <footer className="flex flex-col grow  text-white text-center mt-8 min-mt-8 w-full bg-gradient-to-r from-white via-gray-100 to-white    ">
      {/* Como no hay border gradient, hago un div bajito con fondo gradiente simulando el borde */}
      <div className="h-0.5 bg-gradient-to-r from-white via-gray-200 to-white "></div>
      {/* Si bien, sin ser flex y justify center ya quedaban centrados, eso era pura casualidad porque les daba el espacio en el div a los tres p para acomodarse asi. Importante, los tuve que hacer inline porque sino por defecto ocupan todo el largo del cotnenedor y no entran */}
      <div className="w-full mt-6 mb-4 flex justify-center    ">
        <p className=" inline text-blueText  text-xs hover:underline focus:outline-none hover:text-red-900 cursor-pointer">
          Condiciones de uso
        </p>
        <p className="inline mr-7 ml-7 text-blueText  text-xs hover:underline focus:outline-none hover:text-red-900 cursor-pointer">
          Aviso de privacidad
        </p>
        <p className="inline text-blueText text-xs hover:underline focus:outline-none hover:text-red-900 cursor-pointer">
          Ayuda
        </p>
      </div>

      <p className="text-gray-500 text-xs  ">
        &copy; 2023 Mi Aplicación. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
