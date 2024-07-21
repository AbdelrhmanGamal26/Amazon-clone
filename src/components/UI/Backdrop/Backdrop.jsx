import { useEffect } from "react";

import styles from "./Backdrop.module.css";

export default function Backdrop({
  onMouseOver,
  onClick,
  className,
  disableScroll = true,
}) {
  const backdropMouseOverHandler = (e) => {
    e.stopPropagation();
    onMouseOver?.();
  };

  const hideSideMenuHandler = (e) => {
    e.stopPropagation();

    onClick?.();
  };

  useEffect(() => {
    if (disableScroll) {
      document.documentElement.style.setProperty("overflow", "hidden");
      return () => {
        document.documentElement.style.removeProperty("overflow");
      };
    }
  }, [disableScroll]);

  return (
    <div
      className={`${styles.backdrop} ${className}`}
      onMouseOver={backdropMouseOverHandler}
      onClick={hideSideMenuHandler}
    />
  );
}
