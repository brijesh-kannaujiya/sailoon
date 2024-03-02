import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useSelector, useDispatch } from "react-redux";

import Progressshows from "../../components/AllLoaders/Progressshows";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack, Box, Tooltip } from "@mui/material";

import Delete from "../Delete";
import { selectAllUserData,getDataStatus,deActiveDeals, userActiveD, retrieveUser } from "../../redux/userlistSlice";

export default function UserList() {
  const camData = useSelector(selectAllUserData);
  const camstatus = useSelector(getDataStatus); 
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [statusa, setStatusA] = React.useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    // notify();
  };
  const [opend, setOpen_D] = React.useState(false);

  const handleClickOpen_delete = (id,status) => {
    setOpen_D(true);
    setId(id);
    setStatusA(status);
  };

  const handleClose_delete = () => {
    setOpen_D(false);
  };

  const handelDeleteUserA = (id,status) => {
    const formData = new FormData();
    formData.append("id",id);
    formData.append("status",status);
    const data={"id":id,
      "status":status
  }
    // const formJson = Object.fromEntries(formData.entries());
    // alert(JSON.stringify(formJson))
    dispatch(userActiveD(data))
    dispatch(retrieveUser());
  };


  const columns = [
    { field: "fName", headerName: "name", width: 200 },
    { field: "emailId", headerName: "Email Id", width: 200 },
    {
      field: "otpVerified",
      headerName: "User Verified",
      width: 200,
    },
    { field: "mobile", headerName: "Mobile Number", width: 200 },
    { field: "status", headerName: "User Active Status", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width:300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction={"row"}>
           
            <Box sx={{ border: 1 }}>
              <Button
                aria-label="delete"
                onClick={() => {
                  //alert(params.row.status)
                  if(Number(params.row.status)===0){
                    handleClickOpen_delete(btoa(params.row.id),1);
                  }else{
                    handleClickOpen_delete(btoa(params.row.id),0);
                  }
                }
                }
              >
               De-active
              </Button>
            </Box>
            {opend === true && (
              <Delete
                open={opend}
                handleClose={handleClose_delete}
                HandelDelete={() => handelDeleteUserA(id,statusa)}
                text="De-active User"
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
            rows={camData.users}
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
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            checkboxSelection={true}
          />
        </Box>
      );
    }
  }
}
