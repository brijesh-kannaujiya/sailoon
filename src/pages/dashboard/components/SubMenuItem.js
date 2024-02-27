import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  Box from '@mui/material/Box';
import GroupsIcon from '@mui/icons-material/Groups';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddchartIcon from '@mui/icons-material/Addchart';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ChatIcon from '@mui/icons-material/Chat';

const SubMenuItem=(props)=> {
  return (
    <Box> 
      <Accordion sx={{backgroundColor:'#1F2A40'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'#fff'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Stack direction={'row'}>
            <GroupsIcon sx={{color:'#fff'}}/>
            {props.open &&
            (<Typography sx={{color:'#fff',ml:2}}>Manage Users</Typography>)}
            </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'background.paper'}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="List Users" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Users" />
            </ListItemButton>
          </ListItem>
        </List>
      
      </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:'#1F2A40'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'#fff'}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Stack direction={'row'}>
            <GroupsIcon sx={{color:'#fff'}}/>
            {props.open &&
            (<Typography sx={{color:'#fff',ml:2}}>Manage Deals</Typography>)}
            </Stack>
        </AccordionSummary>
        <AccordionDetails  sx={{backgroundColor:'background.paper'}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Deals List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddchartIcon />
              </ListItemIcon>
              <ListItemText primary="Create Deals" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{backgroundColor:'#fff'}}/>
      <Accordion sx={{backgroundColor:'#1F2A40'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'#fff'}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Stack direction={'row'}>
            <GroupsIcon sx={{color:'#fff'}}/>
            {props.open &&
            (<Typography sx={{color:'#fff',ml:2}}>Manage Campaigns</Typography>)}
            </Stack>
        </AccordionSummary>
        <AccordionDetails  sx={{backgroundColor:'background.paper'}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Campaigns List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddchartIcon />
              </ListItemIcon>
              <ListItemText primary="Create Campaigns" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
        </AccordionDetails>
      </Accordion>
      
      <Divider sx={{backgroundColor:'#fff'}}/>
      <Accordion sx={{backgroundColor:'#1F2A40'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:'#fff'}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Stack direction={'row'}>
            <GroupsIcon sx={{color:'#fff'}}/>
            {props.open &&
            (<Typography sx={{color:'#fff',ml:2}}>Manage Ticket</Typography>)}
            </Stack>
        </AccordionSummary>
        <AccordionDetails  sx={{backgroundColor:'background.paper'}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Ticket List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddchartIcon />
              </ListItemIcon>
              <ListItemText primary="Create Campaigns" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
export default SubMenuItem;