//Este componente solamente sera un WRAPPER (Envoltorio) que provee una esrtuctura de HTML y codigo CSS para CUALQUIER CODIGO que querramos, entonces se puede usar en diferentes lugares de la APP.

import classes from "./Card.module.css";

//Necesitamos PROPS para acceder a CHILDREN  y asi envolver el contenido.
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
