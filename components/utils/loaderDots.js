import styles from "./loader-dots.module.css";
export default function LoaderDots({ size, color, style }) {
  if (size === "s") {
    return <div className={`${styles.loading_s} ${color}`} style={style} />;
  } else if (size === "ms") {
    return <div className={`${styles.loading_ms} ${color}`} style={style} />;
  } else if (size === "m") {
    return <div className={`${styles.loading_m} ${color}`} style={style} />;
  } else if (size === "l") {
    return <div className={`${styles.loading_l} ${color}`} style={style} />;
  } else if (size === "xl") {
    return <div className={`${styles.loading_xl} ${color}`} style={style} />;
  } else if (size === "null") {
    return <div className={`${styles.loading_null} ${color}`} style={style} />;
  } else {
    return <div className={`${styles.disabled}`} style={style} />;
  }
}
