import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { IDialog } from "./Dialog.interface";
import styles from "./Dialog.module.scss";

const ConfirmationDialog: FC<IDialog> = ({
  message,
  onDialog,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <Dialog.Panel className={styles.panel_wrapper}>
          <Dialog.Title className={styles.panel_title}>
            Підтвердіть дію
          </Dialog.Title>
          <p className={styles.panel_msg}>{message}</p>
          <div className={styles.panel_buttons}>
            <button
              onClick={() => {
                setIsOpen(false);
                onDialog();
              }}
            >
              Підтвердити
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Відхилити
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
