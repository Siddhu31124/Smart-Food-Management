export enum FoodItemCategoryEnum {
  RICE = "rice",
  PAN_CAKE = "pancake",
  BEVERAGES = "beverages",
}

export enum BaseSizeUnitEnum {
  KG = "kg",
  PISCES = "pisces",
  LITTERS = "litters",
}

export enum ServingSizeUnitEnum {
  PISCES = "pisces",
  LADDLE = "laddle",
  GLASS = "glass",
}

export enum MealTypeEnum {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
}

export enum MealQuantityEnum {
  FULL = "full",
  HALF = "half",
  CUSTOM = "custom",
}

export enum PageRoutesEnum {
  HOME_PAGE = "/",
  ADMIN_HOME_PAGE = "/admin",
  LOGIN_PAGE = "/login",
  WEEKLY_MENU_PAGE = "/weekly-menu",
}

export interface FoodItemResponseType {
  id: number;
  name: string;
  // __typename: string
}

export interface foodItemType {
  id: number;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
}

export interface MealFoodDataType {
  breakfast: foodItemType[];
  dinner: foodItemType[];
  lunch: foodItemType[];
}

export interface VoidFunctionType {
  (): void;
}

export interface ReactElementType {
  (): React.ReactElement;
}

export interface FoodItemsResponseType {
  id: string;
  name: string;
  category: FoodItemCategoryEnum;
  baseSizeUnit: BaseSizeUnitEnum;
  servingSizeUnit: ServingSizeUnitEnum;
  __typename: string;
}
