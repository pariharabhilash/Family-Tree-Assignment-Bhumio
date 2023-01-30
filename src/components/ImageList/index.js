import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

const ImageContainer = ({ images = [] }) => {
  return (
    <ImageList
      sx={{
        width: 500,
        height: "auto",
        minHeight: 300,
        marginLeft: "auto",
      }}
      cols={3}
      rowHeight={164}
    >
      {images.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default ImageContainer;
