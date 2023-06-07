import { FC } from "react";
import { Switch } from "@headlessui/react";
import styles from "./ToggleSwitch.module.scss";

export const ToggleSwitch: FC<{
  clickHandler: () => void;
  isEnabled: boolean;
}> = ({ clickHandler, isEnabled }) => {
  return (
    <Switch.Group>
      <div className={styles.container}>
        <Switch
          checked={isEnabled}
          onChange={clickHandler}
          className={`${isEnabled ? styles.enabled : styles.disabled} ${
            styles.wrapper
          }`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${isEnabled ? "translate-x-5" : "translate-x-0"} ${
              styles.switch_span
            }`}
          />
        </Switch>
        <Switch.Label
          className={
            isEnabled
              ? `${styles.label} ${styles.label_active}`
              : `${styles.label}`
          }
        >
          Публічне відео
        </Switch.Label>
      </div>
    </Switch.Group>
  );
};
