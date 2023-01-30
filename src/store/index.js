import { configureStore } from "@reduxjs/toolkit";
import familyTreeReducer from "./slices/familyTreeSlice";

const store = configureStore({
  reducer: {
    familyTree: familyTreeReducer,
  },
});

export default store;
