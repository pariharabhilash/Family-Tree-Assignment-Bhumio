import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Grid } from "@mui/material";
import FamilyDetails from "../FamilyDetails";
import FamilyTree from "../FamilyTree";
import { handleAlert, importData } from "../../store/slices/familyTreeSlice";
import SnackbarAlert from "../Alert";

const App = () => {
  const [showNewNodeForm, setShowNewNodeForm] = useState(false);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.familyTree.alert);
  const treeData = useSelector((state) => state.familyTree.data);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleExportJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(treeData[0])
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "family_tree.json";

    link.click();
  };
  const handleImportJson = async (e1) => {
    if (e1.target?.files?.[0]) {
      const updatedJSON = e1.target.files[0];
      // console.log(updatedJSON);
      if (updatedJSON.type !== "application/json") {
        dispatch(
          handleAlert({
            message: "File format not supported. Please try again!!!",
            type: "error",
            show: true,
          })
        );
      } else {
        const fileReader = new FileReader();
        fileReader.readAsText(e1.target.files[0], "UTF-8");
        fileReader.onload = (e2) => {
          console.log("e2.target.result", e2.target);
          const target = e2.target;
          const result = JSON.parse(target?.result);
          console.log(result);
          dispatch(
            handleAlert({
              message: "File uploaded successfuly",
              type: "success",
              show: true,
            })
          );
          dispatch(importData(result));
          // FIXED : HTML input file selection event not firing upon selecting the same file
          e1.target.value = "";
        };
      }
    }
  };
  return (
    <div ref={componentRef}>
      <Grid container spacing={-4}>
        <Grid item md={4}>
          <FamilyTree
            onPagePrint={handlePrint}
            onExportJson={handleExportJson}
            onImportJson={handleImportJson}
            onAddFamily={() => setShowNewNodeForm(true)}
            onClose={() => setShowNewNodeForm(false)}
          />
        </Grid>
        <Grid item md={8}>
          <FamilyDetails
            showNewNodeForm={showNewNodeForm}
            onCancel={() => setShowNewNodeForm(false)}
          />
        </Grid>
      </Grid>
      {alert?.show && (
        <SnackbarAlert
          {...alert}
          handleClose={() => dispatch(handleAlert({ show: false }))}
        />
      )}
    </div>
  );
};

export default App;
