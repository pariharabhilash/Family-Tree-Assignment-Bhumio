import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import ImageList from "../ImageList";
import {
  newNodeFormHandler,
  addNewNode,
} from "../../store/slices/familyTreeSlice";

const FamilyDetails = ({ showNewNodeForm, onCancel }) => {
  // const [images, setImages] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);
  const dispatch = useDispatch();
  const newNodeData = useSelector((state) => state.familyTree.newNode);
  const data = useSelector((state) => state.familyTree.data);
  const selectedNode = useSelector(
    (state) =>
      state?.familyTree?.selectedNode || state?.familyTree?.data?.[0] || {}
  );
  // useEffect(() => {
  //   if (images.length < 1) return;
  //   const newImageURLs = [];
  //   images.forEach((image) =>
  //     newImageURLs.push({ img: window.URL.createObjectURL(image), title: "" })
  //   );
  //   setImageURLs(newImageURLs);
  // }, [images]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(newNodeFormHandler({ [name]: value }));
  };
  const handleSubmit = () => {
    dispatch(
      addNewNode({ newNodeData, data, selectedNodeId: selectedNode.id })
    );
  };
  // const onImageChange = (e) => {
  //   setImages([...e.target.files]);
  // };
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.default",
        display: "grid",
        gridTemplateColumns: { md: "1fr" },
        gap: 2,
      }}
    >
      <Paper
        alevation={24}
        variant="outlined"
        sx={{ border: "1px solid gray", borderRadius: 4, paddingBottom: 3 }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: 600,
            marginLeft: -24,
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          Family Details
        </Typography>
        <Divider sx={{ borderColor: "gray" }} />
        {showNewNodeForm ? (
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 2,
              rowGap: 2,
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
          >
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="spouse"
              name="spouse"
              label="Spouse"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="yearOfBirth"
              name="yearOfBirth"
              label="Birth year"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="address"
              name="address"
              label="Present Address"
              variant="outlined"
              onChange={handleChange}
            />
            {/* <Button variant="contained" component="label">
              Upload Family Photo
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={onImageChange}
              />
            </Button>
            {imageURLs.length > 0 && <ImageList images={imageURLs} />} */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                columnGap: 3,
                paddingTop: 2,
              }}
            >
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Add Family
              </Button>
            </Box>
          </Box>
        ) : (
          <Grid container>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Name</Typography>
              </Grid>
              <Grid container item md="8">
                <Typography variant="body1">: {selectedNode?.name}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Spouse</Typography>
              </Grid>
              <Grid container item md="8">
                {
                  <Typography variant="body1">
                    : {selectedNode?.spouse}
                  </Typography>
                }
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Location</Typography>
              </Grid>
              <Grid container item md="8">
                <Typography variant="body1">
                  : {selectedNode?.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Birth Year</Typography>
              </Grid>
              <Grid container item md="8">
                <Typography variant="body1">
                  : {selectedNode?.yearOfBirth}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Present Address</Typography>
              </Grid>
              <Grid container item md="8">
                <Typography variant="body1">
                  : {selectedNode?.address}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "10px 0" }}
            >
              <Grid container item md="2">
                <Typography variant="body1">Family Photo</Typography>
              </Grid>
              <Grid container item md="8">
                : <ImageList images={selectedNode?.familyPhotos} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};
export default FamilyDetails;
