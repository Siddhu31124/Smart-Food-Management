import { useState } from "react";
import Modal from "../commonComponents/Modal";
import { observer } from "mobx-react";

import MealTypesTab from "../commonComponents/MealTypesTab";
import Meals from "./Meals";
import {
  backButton,
  buttonContainer,
  headerContainer,
  mealPreferenceContainer,
  mealsDetailsContainer,
  mealTypeHeading,
  saveButton,
  skipMealButton,
} from "./styles";
import ModalStore from "../../store/ModalStore";
import { FOOD_URL } from "../../constants";
import MealDate from "../mealDate/MealDate";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import CloseConfirmModal from "../confirmModal/CloseConfirmModal";
import SkipConfirmModal from "../confirmModal/SkipConfirmModal";
import { MealQuantityEnum } from "../../types";

const meals = [
  { item: "Poori", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Fired Rice", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Rice", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
  { item: "Aloo", itemType: "indian Bread", half: 1, full: 2, custom: 0 },
];

const MealPreferenceModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(MealQuantityEnum.FULL);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [showBackConfirmModal, setShowBackConfirmModal] =
    useState<boolean>(false);
  const [showSkipConfirmModal, setShowSkipConfirmModal] =
    useState<boolean>(false);

  function handleActiveTab(activeType: MealQuantityEnum): void {
    setActiveTab(activeType);
  }

  const headerSection = () => {
    return (
      <div className={headerContainer}>
        <h1 className={mealTypeHeading}>{ModalStore.typeOfMeal}</h1>
        <button
          onClick={() => setShowSkipConfirmModal(true)}
          className={skipMealButton}
        >
          Skip Meals
        </button>
      </div>
    );
  };

  const handleMealPreferenceSave = () => {
    //mutation
    setShowSaveConfirmModal(false);
  };

  const buttonsSection = () => {
    return (
      <p className={buttonContainer}>
        <button
          className={backButton}
          onClick={() => setShowBackConfirmModal(true)}
        >
          Back
        </button>
        <button
          onClick={() => setShowSaveConfirmModal(true)}
          className={saveButton}
        >
          Save
        </button>
      </p>
    );
  };

  const renderSaveConfirmModal = () => {
    if (showSaveConfirmModal) {
      return (
        <SaveConfirmModal
          action={handleMealPreferenceSave}
          closeModal={() => setShowSaveConfirmModal(false)}
        />
      );
    }
  };

  const renderBackConfirmModal = () => {
    if (showBackConfirmModal) {
      return (
        <CloseConfirmModal closeModal={() => setShowBackConfirmModal(false)} />
      );
    }
  };

  const handleSkipMealPreference = () => {
    // req will be send to change status as meal is skipped
    setShowSkipConfirmModal(false);
  };

  const renderSkipConfirmModal = () => {
    if (showSkipConfirmModal) {
      return (
        <SkipConfirmModal
          closeModal={() => setShowSkipConfirmModal(false)}
          action={handleSkipMealPreference}
        />
      );
    }
  };

  return (
    <Modal>
      <div className={mealPreferenceContainer}>
        {headerSection()}
        <div className="flex items-center gap-6 mt-10">
          <MealTypesTab
            activeTab={activeTab}
            handelActiveTab={handleActiveTab}
          />
          <MealDate />
        </div>
        <div className={mealsDetailsContainer}>
          <Meals meals={meals} activeTab={activeTab} />
          <div>
            <img src={FOOD_URL} className="h-[250px] w-[250px]" />
          </div>
        </div>
        {buttonsSection()}
      </div>
      {renderSaveConfirmModal()}
      {renderBackConfirmModal()}
      {renderSkipConfirmModal()}
    </Modal>
  );
};
export default observer(MealPreferenceModal);
