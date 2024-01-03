import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

/*
El contenedor flexible (flex) tiene dos elementos secundarios principales: <main> y <Footer />. La propiedad flex-grow se aplica al elemento <main>, lo que significa que se expandirá para ocupar el espacio restante después de tener en cuenta el espacio ocupado por el <Footer />.

Entonces, en este diseño:

<main> (contenido específico de la página) se expandirá para ocupar todo el espacio disponible en la columna principal.
<Footer /> se colocará en la parte inferior del contenedor flexible y no se expandirá, ya que no tiene la propiedad flex-grow.
Esta estructura permite que el contenido principal de cada página ocupe todo el espacio restante en la columna principal, independientemente de la longitud del contenido o de la presencia del pie de página.
*/
