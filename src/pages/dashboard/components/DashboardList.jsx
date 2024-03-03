import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useSelector, useDispatch } from "react-redux";
import { 
  selectAllData,
  getDataStatus,
  // getDataError,
  getDetails,
  deActiveDeals,
  retrieveCampaign,
} from "../../../redux/campaignSlice";
import Progressshows from "../../../components/AllLoaders/Progressshows";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack, Box, Tooltip } from "@mui/material";
import EditCampaign from "./EditCampaign";
import Delete from "../../Delete";

export default function DashboardList() {
  const camData = useSelector(selectAllData);
  const camstatus = useSelector(getDataStatus); 
  const [open, setOpen] = React.useState(false);
  const [dealid, setDealId] = React.useState("");
  //alert(JSON.stringify(camData))
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

  const handelDeleteCampain = (dealid) => {
    dispatch(deActiveDeals(dealid))
    dispatch(retrieveCampaign());
  };

  
  const columns = [
    { field: "cp_name", headerName: "name", width: 100 },
    { field: "cp_name_ar", headerName: "name ar", width: 100 },
    {
      field: "image_name",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {
        console.log(
          process.env.REACT_APP_API_PATH +
            "campaignapi/" +
            params.row.image_name
        );
        return (
          <>
            <img
              src={
                process.env.REACT_APP_API_PATH +
                "campaignapi/" +
                params.row.image_name
              }
              alt="Uploaded file"
              style={{ width: 80, height: 50 }}
            />
          </>
        );
      },
    },
    { field: "dealprice", headerName: "Price", width: 130 },
    {
      field: "shortdiscription",
      headerName: "Short Discription",
      width: 200,
    },
    {
      field: "longdiscription",
      headerName: "Long Discription",
      //sortable: false,
      type: "number",
      width: 130,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      //sortable: false,
      width: 130,
    },
    {
      field: "product_image",
      headerName: "Product Image",
      //sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          <img
            src={
              process.env.REACT_APP_API_PATH +
              "campaignapi/" +
              params.row.product_image
            }
            alt="Uploaded file"
            style={{ width: 80, height: 50 }}
          />
        </>
      ),
      //
    },
    {
      field: "joindeal_count",
      headerName: "Deal Max Count",
      //sortable: false,
      width: 130,
    },
    {
      field: "deal_startdate",
      headerName: "Start Date",
      //sortable: false,
      width: 130,
    },
    {
      field: "deal_enddate",
      headerName: "End Date",
      //sortable: false,
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell:(params) => {
        return (
          <Stack direction={"row"}>
            <Box sx={{ border: 1 }}>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    dispatch(getDetails(btoa(params.row.deal_id)));
                    handleClickOpen();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {open === true && (
                <EditCampaign open={open} handleClose={handleClose} />
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
              <Delete
                open={opend}
                handleClose={handleClose_delete}
                HandelDelete={() => handelDeleteCampain(dealid)}
                text="Delete Campaign"
                msg={"Are you sure you want to delete it ?"}
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
    if (camData.status === "fail") {
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
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={camData.result}
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
            getRowId={(row) => row.deal_id}
            pageSizeOptions={[5, 10]}
            checkboxSelection={true}
          />
        </Box>
      );
    }
  }
}
