import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import FolderIcon from "@mui/icons-material/Folder";
import { handleNodeSelect } from "../../store/slices/familyTreeSlice";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 10,
    paddingLeft: 10,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box
            component={LabelIcon}
            color="inherit"
            sx={{ mr: 1, color: "#FBD775" }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

const RenderTreeNode = ({ data }) => {
  const dispatch = useDispatch();
  const handleSelectedNode = (d) => {
    dispatch(handleNodeSelect(d));
  };
  return (
    <>
      {data.map((d) => {
        return (
          <React.Fragment key={d.id}>
            {d?.children?.length > 0 ? (
              <StyledTreeItem
                nodeId={d.id}
                labelText={d.name}
                labelIcon={FolderIcon}
                onClick={() => handleSelectedNode(d)}
              >
                <RenderTreeNode data={d.children} />
              </StyledTreeItem>
            ) : (
              <StyledTreeItem
                nodeId={d.id}
                labelText={d.name}
                labelIcon={FolderIcon}
                onClick={() => handleSelectedNode(d)}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const TreeStructure = ({ onClose }) => {
  const treeData = useSelector((state) => state.familyTree.data);
  const selectedNode = useSelector((state) => state.familyTree.selectedNode);
  const [expanded, setExpanded] = React.useState([selectedNode.id]);
  const [selected, setSelected] = React.useState([selectedNode.id]);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    onClose();
  };
  return (
    <TreeView
      aria-label="familt-tree"
      expanded={expanded}
      selected={selected}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      sx={{
        height: "auto",
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <RenderTreeNode data={treeData} />
    </TreeView>
  );
};
export default TreeStructure;
