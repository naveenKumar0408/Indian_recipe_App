export enum ActionTypes {
  FETCH_DISHES,
  FETCH_DISH,
  FIND_POSSIBLE_DISHES,
}

export interface Dish {
  name: string;
  ingredients: string;
  diet: string;
  prep_time: string;
  cook_time: string;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

export interface DishesState {
  dishes: Dish[];
  dish: Dish | null;
  possibleDishes: Dish[];
}
