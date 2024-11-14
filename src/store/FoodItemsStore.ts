import { makeAutoObservable } from "mobx";

import FoodItemModal from "../models/FoodItemModel";
import { FoodItemsResponseType } from "../types";

class FoodItemsStore {
  foodItems: FoodItemModal[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFoodItems(items: FoodItemsResponseType[]) {
    const foodItemInstances = items.map((item) => {
      const { id, name, category, baseSizeUnit, servingSizeUnit } = item;
      return new FoodItemModal(
        id,
        name,
        category,
        baseSizeUnit,
        servingSizeUnit
      );
    });
    this.foodItems = foodItemInstances;
  }

  getFoodItem(foodId: string) {
    return this.foodItems.find((item) => item.id === foodId);
  }

  getFoodItems() {
    return this.foodItems;
  }
}

const foodItemsStore = new FoodItemsStore();
export default foodItemsStore;
