import { createSlice } from "@reduxjs/toolkit";
import { findNode, insertChildNode, validateJson } from "../../utils";
import uuid from "react-uuid";
import jsonData from "../../sample_data.json";

const initialState = {
  data: [jsonData],
  alert: {
    show: false,
    type: "error",
    message: "",
  },
  selectedNode: { ...jsonData, children: [] },
  loading: false,
  newNode: null,
};

export const familyTreeSlice = createSlice({
  name: "familyTree",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.loading = true;
    },
    importData: (state, action) => {
      try {
        let uploadedJson = action.payload;
        validateJson(uploadedJson);
        const {
          id,
          name,
          spouse,
          location,
          yearOfBirth,
          address,
          familyPhotos,
        } = uploadedJson;
        state.data = [uploadedJson];
        state.selectedNode = {
          id,
          name,
          spouse,
          location,
          yearOfBirth,
          address,
          familyPhotos,
        };
      } catch (error) {
        console.log(error);
        state.alert = {
          message: "Invalid JSON schema. Please try again!!!",
          type: "error",
          show: true,
        };
      }
    },
    addData: (state, action) => {},
    handleAlert: (state, action) => {
      state.alert = { ...state.alert, ...action.payload };
    },
    handleNodeSelect: (state, action) => {
      state.selectedNode = { ...action.payload };
    },
    searchHandler: (state, action) => {
      const { data, text } = action.payload;
      const regExp = new RegExp(text, "gi");
      const node = findNode(regExp, data);
      if (node) {
        state.data = [node];
        state.selectedNode = node;
      }
    },
    newNodeFormHandler: (state, action) => {
      state.newNode = { ...state.newNode, ...action.payload };
    },
    addNewNode: (state, action) => {
      const { data, newNodeData, selectedNodeId } = action.payload;
      const copyData = JSON.parse(JSON.stringify(data));
      const childNode = { id: uuid(), ...newNodeData };
      insertChildNode(copyData, childNode, selectedNodeId);
      state.data = copyData;
      state.selectedNode = childNode;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  importData,
  addData,
  handleAlert,
  showLoader,
  handleNodeSelect,
  searchHandler,
  newNodeFormHandler,
  addNewNode,
} = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
