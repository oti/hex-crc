import { RootState } from "@/store/models";
import { storeModule as data } from "@/store/modules/data";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

export const storeOptions: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV === "development",
  state: {},
  modules: {
    data,
  },
  plugins: [],
};

/**
 * プラグインを引き当てる
 */
export function useVuex(ctx = Vue) {
  return ctx.use(Vuex);
}

/**
 * ストアを生成する
 * @param options
 * @param init
 * @param ctx
 */
export default function createStore(
  options = storeOptions,
  init = true,
  ctx = Vue
) {
  if (init) {
    useVuex(ctx);
  }

  return new Vuex.Store(options);
}
