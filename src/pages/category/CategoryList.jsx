import React from "react";
import {
  deleteCategory,
  getCategoryDataStatus,
  getSingleCategoryDetails,
  retrieveCategories,
  selectAllCategories,
} from "../../redux/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Box, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCategory from "./EditCategory";
import { DataGrid } from "@mui/x-data-grid";
import Progressshows from "../../components/AllLoaders/Progressshows";
import Delete from "../Delete";

const CategoryList = () => {
  const categoryData = useSelector(selectAllCategories);
  const categoryStatus = useSelector(getCategoryDataStatus);
  //alert(JSON.stringify(categoryStatus));
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    // notify();
  };
  const [opend, setOpen_D] = React.useState(false);

  const handleClickOpen_delete = (id) => {
    setOpen_D(true);
  };

  const handleClose_delete = () => {
    setOpen_D(false);
  };

  const handelDeleteCategory = (uuid) => {
    dispatch(deleteCategory(uuid));
    dispatch(retrieveCategories());
  };

  const columns = [
    { field: "name", headerName: "name", width: 300 },
    { field: "name_ar", headerName: "name ar", width: 300 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      with: 300,
      renderCell: (params) => {
        return (
          <Stack direction={"row"}>
            <Box sx={{ border: 1 }}>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    dispatch(getSingleCategoryDetails(params.row.uuid));
                    handleClickOpen();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {open === true && (
                <EditCategory open={open} handleClose={handleClose} />
              )}
            </Box>
            <Box sx={{ border: 1 }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpen_delete(btoa(params.row.uuid))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            {opend === true && (
              <Delete
                open={opend}
                handleClose={handleClose_delete}
                HandelDelete={() => handelDeleteCategory(params.row.uuid)}
                text="Delete Category"
                msg={"Are you sure you want to delete it ?"}
              />

              // <DeleteCampaign
              //   open={opend}
              //   handleClose={handleClose_delete}
              //   dealid={dealid}
              // />
            )}
          </Stack>
        );
      },
    },
  ];

  if (categoryStatus === "idle") {
    return <Progressshows />;
  } else if (categoryStatus === "loading") {
    return <Progressshows />;
  } else {
    if (categoryData.status === "fail") {
      return (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <h4>No Record Found</h4>
        </div>
      );
    } else {
      return (
        <Box sx={{ width: "100%" }}>
          <Stack sx={{ pr: 10, mt: 4, mb: 2 }}>
            <h3>Category List</h3>
          </Stack>
          <DataGrid
            rows={categoryData.categories}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            sx={{
              ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                {
                  "margin-top": "1em",
                  "margin-bottom": "1em",
                },
            }}
            getRowId={(row) => row.uuid}
            pageSizeOptions={[5, 10]}
            checkboxSelection={true}
          />
        </Box>
      );
    }
  }
};

export default CategoryList;
