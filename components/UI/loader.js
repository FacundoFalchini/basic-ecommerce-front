import classes from "./loader.module.css";

const Loader = () => {
  return (
    <section className={classes.loaderContainer}>
      <div className={classes.loader}></div>
    </section>
  );
};

export default Loader;
