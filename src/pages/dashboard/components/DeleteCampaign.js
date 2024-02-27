import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deActiveDeals } from '../../../redux/campaignSlice';
export default function DeleteCampaign(props) {
    const dispatch = useDispatch();
  return (
    <React.Fragment>
      
      <Dialog
        open={props.open}
        onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Campaign"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Are you sure you want to delete it ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={()=>{
            props.handleClose()
            dispatch(deActiveDeals(props.dealid))
            }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}