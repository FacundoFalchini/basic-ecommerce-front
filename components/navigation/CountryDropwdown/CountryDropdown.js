function CountryDropdown(props) {
  const countriesprops = props.country;
  const httpError = props.error;

  //Se pasa a navigation si hay pais seleccionado, y navigation le da el ok o no al seller dropdown.
  const onSellerSelectable = props.onIsSellerSelectable;

  //Esta es la funcion que le pasa el country seleccionado a el componente padre (Navigation)
  const onSelectCountry = props.onSelectCountry;
  const handleSelect = (event) => {
    const selected = event.target.value;
    onSelectCountry(selected);

    if (selected && selected != "-1") {
      onSellerSelectable(true);
    } else {
      onSellerSelectable(false);
    }
  };

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    //El div se adapta al contenido que tiene... osea que si el select tiene una opcion que es MUY larga el div se alargara tanto como esa opcion, por eso es importante ponerle un MAX WIDTH permitido, que crezca hasta un maximo y le trunco lo que diga.
    <div className="bg flex max-h-[50px] w-auto max-w-40 items-center justify-center rounded-sm border border-transparent px-3 hover:border-white">
      <select
        onChange={handleSelect}
        name="paises"
        id="paises-dropdown"
        defaultValue=""
        className=" h-[45px] w-full cursor-pointer truncate bg-navColor text-center font-sans text-sm font-semibold  text-white outline-none "
      >
        <option value="-1" className=" bg-navColor ">
          Country
        </option>
        {countriesprops.map((country) => (
          <option
            key={country.id}
            //value={country.name}
            value={country.id}
            className=" !cursor-pointer bg-navColor  "
          >
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
