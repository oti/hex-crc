import { ColorItem } from "@/models/ColorItem";
import {
  VuexActionPayloads,
  VuexActions,
  VuexMutationPayloads,
} from "@/models/Vuex";
import {
  ADD_COLOR_ITEM,
  CLEAR_COLOR_ITEM,
  REMOVE_COLOR_ITEM,
  CONVERT_COLOR_ITEMS_TO_STRING,
  CONVERT_STRING_TO_COLOR_ITEMS,
  TOGGLE_DARK_MODE,
  TOGGLE_TEXT_SIZE,
  UPDATE_COLOR,
  UPDATE_TEXT_AREA_VALUE,
} from "./mutation-types";

export interface UpdateColor {
  color: string;
  index: number;
  target: "back" | "front";
}

export interface DataState {
  colorItems: ColorItem[];
  darkMode: boolean;
  largeText: boolean;
  string: string;
}

export interface DataViewModel extends DataState {
  viewModel: DataGetters["viewModel"];
}

export interface DataGetters {
  viewModel: DataViewModel;
}

export type DataMutationPayloads = VuexMutationPayloads<{
  [ADD_COLOR_ITEM]: number;
  [CLEAR_COLOR_ITEM]: number;
  [REMOVE_COLOR_ITEM]: number;
  [CONVERT_COLOR_ITEMS_TO_STRING]: string;
  [CONVERT_STRING_TO_COLOR_ITEMS]: ColorItem[];
  [TOGGLE_DARK_MODE]: boolean;
  [TOGGLE_TEXT_SIZE]: boolean;
  [UPDATE_COLOR]: UpdateColor;
  [UPDATE_TEXT_AREA_VALUE]: string;
}>;

export type DataActionPayloads = VuexActionPayloads<{
  addColorItem: DataMutationPayloads[typeof ADD_COLOR_ITEM];
  clearColorItem: DataMutationPayloads[typeof CLEAR_COLOR_ITEM];
  removeColorItem: DataMutationPayloads[typeof REMOVE_COLOR_ITEM];
  convertStringToColorItems: DataMutationPayloads[typeof CONVERT_COLOR_ITEMS_TO_STRING];
  convertColorItemsToString: DataMutationPayloads[typeof CONVERT_STRING_TO_COLOR_ITEMS];
  toggleDarkMode: DataMutationPayloads[typeof TOGGLE_DARK_MODE];
  toggleTextSize: DataMutationPayloads[typeof TOGGLE_TEXT_SIZE];
  updateColor: DataMutationPayloads[typeof UPDATE_COLOR];
  updateTextAreaValue: DataMutationPayloads[typeof UPDATE_TEXT_AREA_VALUE];
}>;

export type DataAction = VuexActions<DataActionPayloads>;
