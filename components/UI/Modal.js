//import classes from "./Modal.module.css";
import React from "react";
//import ReactDOM from "react-dom";

//onClick ya esta definido en TODOS los HTML elements. Este elemento se renderiza en Modal, entonces en Modal le pasamos el el metodo por medio de props que es el que esta esperando el onClick. Luego, Modal necesita recibir en sus props este metodo onClose, y Modal se renderiza en Cart, asique desde Cart le pasamos el onClose al renderizar Modal.
//const Backdrop = (props) => {
//  return <div className={classes.backdrop} onClick={props.onClose}></div>;
//};

//const ModalOverlay = (props) => {
//  return (
//    <div className={classes.modal}>
//      <div className={classes.content}>{props.children}</div>
//    </div>
// );
//};

//const portalElement = document.getElementById("overlays");

//const Modal = (props) => {
const Modal = () => {
  return (
    <React.Fragment>
      {/* Asi se haria en caso de no usar portals.  
      <Backdrop></Backdrop>
      <ModalOverlay>{props.children}</ModalOverlay> 

      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}></Backdrop>,
        portalElement,
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
      */}
    </React.Fragment>
  );
};

//Primer argumento: QUE teletransportar.
//Segundo argumento: DONDE teletransportar.

//El backdrop es lo que BLOQUEA el fondo de manera que no se pueda interactuarl.
//El ModalOverlay es el cartel que aparece al apretar el carrito. Es necesario colocar el children, dado que el Modal se llama en Cart y se le pasa todos los elementos que estan en el carrito, el total, y los 2 botones para itneractuar.

export default Modal;
