import classes from "./loader.module.css";

const Loader = () => {
  return (
    <section className={classes.loaderContainer}>
      <div className={classes.loader}></div>
    </section>
  );
};

/*
const Loader = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="border-8 border-gray-300 border-t-8 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </section>
  );
};
*/

export default Loader;
