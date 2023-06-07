import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useCallback, useState } from "react";
import { videoApi } from "../../../../store/api/video.api";
import { UploadForm } from "./upload-form/UploadForm";
import { IVideoModal } from "./VideoUpload.interface";
import styles from "./VideoUpload.module.scss";
import ConfirmationDialog from "../../../ui/dialog/Dialog";

const UploadModal: FC<IVideoModal> = ({ setIsOpen, isOpen, videoId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    return setIsOpen(false);
  }, []);

  const handleConfirmDialogOpen = useCallback(() => {
    return setDialogOpen(true);
  }, []);
  const [deleteVideo] = videoApi.useDeleteMutation();

  const handleDelete = () => {
    deleteVideo(videoId)
      .unwrap()
      .then(() => setIsOpen(false));
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={styles.dialog_wrapper}
          onClose={() => handleConfirmDialogOpen()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className={styles.panel_wrapper}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.panel}>
                  <UploadForm
                    handleCloseModal={handleCloseModal}
                    videoId={videoId}
                    onCloseUnfinished={handleConfirmDialogOpen}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {dialogOpen ? (
        <ConfirmationDialog
          onDialog={handleDelete}
          message="Відмінити додавання відео?"
          isOpen={dialogOpen}
          setIsOpen={setDialogOpen}
        />
      ) : null}
    </>
  );
};

export default UploadModal;
