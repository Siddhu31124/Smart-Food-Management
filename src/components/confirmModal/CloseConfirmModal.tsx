import React from "react";

import Modal from "../commonComponents/Modal";
import { ReactElementType, VoidFunctionType } from "../../types";

interface ConfirmModalPropsType {
  closeModal: VoidFunctionType;
}

const CloseConfirmModal: React.FC<ConfirmModalPropsType> = ({ closeModal }) => {
  const handleMealPreferenceModalClose = () => {
    closeModal();
  };

  const renderButtons: ReactElementType = () => {
    return (
      <div className="flex items-center self-center gap-6">
        <button
          onClick={handleMealPreferenceModalClose}
          className="bg-warning text-sm text-white px-5 py-2 rounded font-semibold"
        >
          Back
        </button>
        <button
          onClick={closeModal}
          className="rounded text-sm py-2 px-5 text-general font-semibold border-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <Modal>
      <div className="flex flex-col gap-12 py-16 px-14">
        <h1 className="text-black font-medium text-2xl text-center max-w-[400px]">
          Are you sure you want to close?
        </h1>
        {renderButtons()}
      </div>
    </Modal>
  );
};

export default CloseConfirmModal;
