import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1>Oops!Something went wrong.</h1>
      <p>Please try again later</p>
    </div>
  );
}
