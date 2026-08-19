import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";
import themeReducer from "./slices/themeSlice";
import analyticReducer from "./slices/analyticSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
    analytics: analyticReducer,
  },
});
