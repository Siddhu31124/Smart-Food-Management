import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import ConfirmModal from "../../components/modal/ConfirmModal";
import FoodItemModel from "../../models/FoodItemModel";
import {
  FoodItemsPropsType,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import {
  foodItem,
  foodItemDeleteButton,
  foodItemHeader,
  foodItemHeadersContainer,
  foodItemUpdateButton,
} from "./styles";

const FoodItems: React.FC<FoodItemsPropsType> = ({
  foodItems,
  handleDeleteFoodItem,
  setShowCreateFoodItemModal,
  setUpdateFoodItemData,
  setDeleteFoodItemId,
  setShowUpdateFoodItemModal,
}) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const tPath = "pages.foodItems";

  const handleShowDeleteConfirmModal = (id: string) => {
    setShowDeleteConfirmModal(true);
    setDeleteFoodItemId(id);
  };
  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    setShowDeleteConfirmModal(false);
  };
  const renderFoodItemsHeaders: ReactElementType = () => {
    return (
      <ul className={foodItemHeadersContainer}>
        <li className={foodItemHeader}>{t(tPath + ".headers.foodItems")}</li>
        <li className={foodItemHeader}>
          {t(tPath + ".headers.foodItemCategory")}
        </li>
        <li className={foodItemHeader}>{t(tPath + ".headers.baseSizeUnit")}</li>
        <li className={foodItemHeader}>
          {t(tPath + ".headers.servingSizeUnit")}
        </li>
        <li className={foodItemHeader}>{t(tPath + ".headers.updateItem")}</li>
        <li className={foodItemHeader}>{t(tPath + ".headers.deleteItem")}</li>
      </ul>
    );
  };
  const handleShowUpdateFoodItemData = (foodItem: FoodItemModel) => {
    setUpdateFoodItemData(foodItem);
    setShowUpdateFoodItemModal(true);
  };
  const renderFoodItem = (item: FoodItemModel): React.ReactElement => {
    const { id, name, category, baseSizeUnit, servingSizeUnit } = item;

    const handleClickDeleteFoodItem: VoidFunctionType = () => {
      handleShowDeleteConfirmModal(id);
    };

    const handleClickUpdateFoodItem: VoidFunctionType = () => {
      handleShowUpdateFoodItemData(item);
    };

    return (
      <li
        key={id}
        className=" px-6 py-5 flex items-center justify-between border-b hover:bg-slate-100"
      >
        <p className={foodItem}>{name}</p>
        <p className={foodItem}>{category}</p>
        <p className={foodItem}>{baseSizeUnit}</p>
        <p className={foodItem}>{servingSizeUnit}</p>
        <button
          onClick={handleClickUpdateFoodItem}
          className={foodItemUpdateButton}
        >
          {t(tPath + ".buttons.update")}
        </button>
        <button
          onClick={handleClickDeleteFoodItem}
          className={foodItemDeleteButton}
        >
          {t(tPath + ".buttons.delete")}
        </button>
      </li>
    );
  };

  const renderFoodItems: ReactElementType = () => {
    return (
      <ul className="flex flex-col max-h-[60dvh] overflow-y-scroll custom-scrollbar">
        {foodItems.map((item) => {
          return renderFoodItem(item);
        })}
      </ul>
    );
  };

  const renderDeleteConfirmModal: ReactElementType = () => {
    if (showDeleteConfirmModal) {
      return (
        <ConfirmModal
          action={handleDeleteFoodItem}
          close={handleCloseDeleteConfirmModal}
        />
      );
    }
    return <></>;
  };

  const handleShowCreateFoodItemModal: VoidFunctionType = () => {
    setShowCreateFoodItemModal(true);
  };

  return (
    <div className="py-8 bg-[#FBFBFB]">
      <div className="flex flex-col w-full max-w-6xl  mx-auto py-8 px-12">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-2xl text-general border-b-2 border-b-primary pb-1">
            {t(tPath + ".title")}
          </h1>
          <button
            onClick={handleShowCreateFoodItemModal}
            className="py-2 px-5 text-sm font-medium bg-primary hover:bg-blue-600 text-white rounded"
          >
            {t(tPath + ".buttons.createFoodItem")}
          </button>
        </div>

        <div className="mt-10 rounded border-2 bg-white">
          {renderFoodItemsHeaders()}
          {renderFoodItems()}
        </div>
      </div>
      {renderDeleteConfirmModal()}
    </div>
  );
};

export default observer(FoodItems);
