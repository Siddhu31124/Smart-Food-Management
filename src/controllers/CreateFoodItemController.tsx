import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CreateFoodItem from "../pages/createFoodItem/CreateFoodItem";
import handleValidateFoodItemField from "../utils/validationUtils/createFoodItemValidation";
import {
  BaseSizeUnitEnum,
  CreateFoodItemControllerPropsType,
  FoodItemCategoryEnum,
  FoodItemDataErrorsType,
  FoodItemDataType,
  ServingSizeUnitEnum,
} from "../types";
import { v4 } from "uuid";
import { observer } from "mobx-react-lite";
import toast from "react-hot-toast";

interface ValidateUpdatedFoodItemFieldType {
  (
    name: string,
    value:
      | string
      | FoodItemCategoryEnum
      | BaseSizeUnitEnum
      | ServingSizeUnitEnum
  ): void;
}

const CreateFoodItemController: React.FC<CreateFoodItemControllerPropsType> = ({
  handleCloseCreateFoodItemModal,
  addFoodItemIntoStore,
}) => {
  const [foodItemData, setFoodItemData] = useState<FoodItemDataType>({
    name: "",
    category: FoodItemCategoryEnum.EMPTY,
    baseSize: BaseSizeUnitEnum.EMPTY,
    servingSize: ServingSizeUnitEnum.EMPTY,
  });

  const [errors, setErrors] = useState<FoodItemDataErrorsType>({
    name: null,
    category: null,
    baseSize: null,
    servingSize: null,
  });

  const { t } = useTranslation();

  const handleValidateUpdatedFoodItemField: ValidateUpdatedFoodItemFieldType = (
    name,
    value
  ) => {
    const error = handleValidateFoodItemField(name, value, t);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFoodItemData({
      ...foodItemData,
      [name]: value,
    });
    handleValidateUpdatedFoodItemField(name, value);
  };

  const validateFoodItemForm = (): boolean => {
    const newErrors: FoodItemDataErrorsType = {
      name: null,
      category: null,
      baseSize: null,
      servingSize: null,
    };
    Object.keys(foodItemData).forEach((key) => {
      const fieldName = key as keyof FoodItemDataType;
      const value = foodItemData[fieldName];
      const error = handleValidateFoodItemField(fieldName, value, t);
      newErrors[fieldName] = error;
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmitFoodItem = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateFoodItemForm()) {
      const { name, category, baseSize, servingSize } = foodItemData;
      const foodItem = {
        id: v4(),
        name: name,
        category: category,
        baseSizeUnit: baseSize,
        servingSizeUnit: servingSize,
      };
      addFoodItemIntoStore(foodItem);
      //handle mutation of add food item
      toast.success(`${name} is added`);
      handleCloseCreateFoodItemModal();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <CreateFoodItem
      foodItemData={foodItemData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleSubmitFoodItem={handleSubmitFoodItem}
      handleCloseCreateFoodItemModal={handleCloseCreateFoodItemModal}
    />
  );
};

export default observer(CreateFoodItemController);
