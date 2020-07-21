import { ColorItem } from "@/models/ColorItem";
import { DefinedActionTree, VuexActionDispatchers } from "@/store/models";
import {
  ADD_COLOR_ITEM,
  CLEAR_COLOR_ITEM,
  REMOVE_COLOR_ITEM,
  CONVERT_COLOR_ITEMS_TO_STRING,
  CONVERT_STRING_TO_COLOR_ITEMS,
  UPDATE_COLOR,
  UPDATE_TEXT_AREA_VALUE,
} from "@/store/modules/data/mutation-types";

export interface DataState {
  colorItems: ColorItem[];
  string: string;
}

export interface UpdateColor {
  color: string;
  index: number;
  target: "back" | "front";
}

export interface DataViewModel extends DataState {}

export interface DataGetterReturns {
  viewModel: DataViewModel;
}

export interface DataMutationPayloads {
  [ADD_COLOR_ITEM]: number;
  [CLEAR_COLOR_ITEM]: number;
  [REMOVE_COLOR_ITEM]: number;
  [CONVERT_COLOR_ITEMS_TO_STRING]: string;
  [CONVERT_STRING_TO_COLOR_ITEMS]: ColorItem[];
  [UPDATE_COLOR]: UpdateColor;
  [UPDATE_TEXT_AREA_VALUE]: string;
}

export interface DataActionPayloads {
  addColorItem: DataMutationPayloads[typeof ADD_COLOR_ITEM];
  clearColorItem: DataMutationPayloads[typeof CLEAR_COLOR_ITEM];
  removeColorItem: DataMutationPayloads[typeof REMOVE_COLOR_ITEM];
  convertStringToColorItems: DataMutationPayloads[typeof CONVERT_COLOR_ITEMS_TO_STRING];
  convertColorItemsToString: DataMutationPayloads[typeof CONVERT_STRING_TO_COLOR_ITEMS];
  updateColor: DataMutationPayloads[typeof UPDATE_COLOR];
  updateTextAreaValue: DataMutationPayloads[typeof UPDATE_TEXT_AREA_VALUE];
}

export type DataActionTree = DefinedActionTree<DataState, DataActionPayloads>;

export type DataActionDispatchers = VuexActionDispatchers<
  DataActionTree,
  DataState,
  DataActionPayloads
>;
