// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import { dashboardApi } from "./dashboardApi";

const rootReducer = {
  navbar,
  layout,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
};

export default rootReducer;
