import { makeAutoObservable } from "mobx";
import { MealFoodItemType } from "../types";

class MealFoodItemModel {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
  constructor(mealItem: MealFoodItemType) {
    this.id = mealItem.id;
    this.name = mealItem.name;
    this.fullMealQuantity = mealItem.fullMealQuantity;
    this.halfMealQuantity = mealItem.halfMealQuantity;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default MealFoodItemModel;
