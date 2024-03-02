import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CalculateIcon from '@mui/icons-material/Calculate';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export  const StatBox=(props)=> {
  return (
    <Box sx={{ minWidth: 275}}>
      <Card variant="outlined" sx={{backgroundColor:props.colorss}}>
      <React.Fragment>
    <CardContent>
    <Box display="flex" justifyContent="space-between">
        <Box>
         {props.icon}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
          >
            {props.title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" sx={{color:'#fff'}}>View More</Button>
    </CardActions>
  </React.Fragment>
  </Card>
    </Box>
  );
}