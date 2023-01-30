import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchHandler } from "../../store/slices/familyTreeSlice";

const SearchButton = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.familyTree.data);
  const onClickHandler = () => {
    dispatch(searchHandler({ data, text }));
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    setText(value);
    dispatch(searchHandler({ data, text: value }));
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        justifyContent: "center",
        margin: "15px auto",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={debouncedChangeHandler}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onClickHandler}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchButton;
