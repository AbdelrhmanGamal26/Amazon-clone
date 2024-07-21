import FooterOptions from "./FooterOptions";
import Services from "./Services";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.navTop}>
        <a href="#header">Back to top</a>
      </div>
      <Services />
      <FooterOptions />
    </div>
  );
}
