import React from "react";
import { Paper, Box, Typography, Divider, Button, Grid } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import SearchButton from "../SearchButton";
import TreeStructure from "../TreeStructure";

const FamilyTree = ({
  onPagePrint,
  onExportJson,
  onImportJson,
  onAddFamily,
  onClose,
}) => {
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
        sx={{ paddingBottom: 3, border: "1px solid gray", borderRadius: 4 }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 600, paddingTop: 1, paddingBottom: 1 }}
        >
          Family Tree
        </Typography>
        <Divider sx={{ borderColor: "gray" }} />
        <SearchButton />
        <TreeStructure onClose={onClose} />
      </Paper>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
      >
        <Grid item md={6}>
          <Button
            variant="outlined"
            size="large"
            component="label"
            fullWidth={true}
            startIcon={<FileUploadIcon />}
          >
            Import Json
            <input hidden accept=".json" type="file" onChange={onImportJson} />
          </Button>
        </Grid>
        <Grid item md={6}>
          <Button
            variant="outlined"
            size="large"
            fullWidth={true}
            startIcon={<AddIcon />}
            onClick={onAddFamily}
          >
            Add Family
          </Button>
        </Grid>
        <Grid item md={6}>
          <Button
            variant="outlined"
            size="large"
            fullWidth={true}
            startIcon={<FileDownloadIcon />}
            onClick={onExportJson}
          >
            Export Json
          </Button>
        </Grid>
        <Grid item md={6}>
          <Button
            variant="outlined"
            size="large"
            fullWidth={true}
            startIcon={<PrintIcon />}
            onClick={onPagePrint}
          >
            Family Tree
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FamilyTree;
