import React from "react";
import {
  // getCategoryDataError,
  getCategoryDataStatus, 
  getCategoryDetails,
  selectAllCategories
} from "../../redux/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Box, Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditCategory from './EditCategory';
import DeleteCampaign from '../dashboard/components/DeleteCampaign';
import { DataGrid } from "@mui/x-data-grid";
import Progressshows from "../../components/AllLoaders/Progressshows";

const CategoryList = () => {
  const CategoruData = useSelector(selectAllCategories);
  const camstatus = useSelector(getCategoryDataStatus); 
  const [open, setOpen] = React.useState(false);
  const [dealid, setDealId] = React.useState("");
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
    setDealId(id);
  };

  const handleClose_delete = () => {
    setOpen_D(false);
  };

  const columns = [
    { field: "name", headerName: "name", width: 100 },
    { field: "name_ar", headerName: "name ar", width: 100 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction={"row"}>
            <Box sx={{ border: 1 }}>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    dispatch(getCategoryDetails(params.row.uuid));
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
                onClick={() => handleClickOpen_delete(btoa(params.row.deal_id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            {opend === true && (
              <DeleteCampaign
                open={opend}
                handleClose={handleClose_delete}
                dealid={dealid}
              />
            )}
          </Stack>
        );
      },
    },
  ];
 
  if (camstatus === "idle") {
    return <Progressshows />;
  } else if (camstatus === "loading") {
    return <Progressshows />;
  } else {
    if (CategoruData.status === "fail") {
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
        <Box > 
            <Stack sx={{ pr: 10, mt: 4 , mb:2}}>
                <h3>Category List</h3>
            </Stack>
          <DataGrid
            rows={CategoruData.categories}
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
