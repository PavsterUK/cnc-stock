import React from "react";
import styles from "./ChartBar.module.css";

const ChartBar = (props) => {
  let barHeight = "0%";

  if (props.maxValue > 0) {
    barHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className={styles.chartBar}>
      <div className={styles.chartBar__inner}>
        <div
          className={styles.chartBar__fill}
          style={{ height: barHeight }}
        ></div>
      </div>
      <div className={styles.chartBar__label}>{props.label}</div>
    </div>
  );
};

export default ChartBar;
