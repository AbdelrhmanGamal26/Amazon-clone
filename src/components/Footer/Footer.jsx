import FooterOptions from "./FooterOptions";
import Services from "./Services";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.navTop}>
        <a href="#header">Back to top</a>
      </div>
      <Services />
      <FooterOptions />
    </div>
  );
}
