import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RichTextEditorComponent from './RichTextEditorComponent';
import Paper from '@mui/material/Paper';
import Topwithslidebar from '../dashboard/components/Topwithslidebar';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
 
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Handle saving the rich text content as needed
    console.log(content);
  };
  const CustomColorButton = styled(Button)({
    backgroundColor: '#320085', // Set your custom color here
    color: '#ffffff', // Set the text color for better contrast
    '&:hover': {
      backgroundColor: '#320085', // Set a slightly different color on hover
    },
  });
  

  return (
   <>
   <Topwithslidebar />
    <Container maxWidth="xl" sx={{mt:10,ml:5,mb:10}}>
    <InputLabel htmlFor="your-input" sx={{color:'#000',fontSize:'36px',fontWeight:'bold',mr:10,ml:10}}>About Us</InputLabel>
     <Paper elevation={3} sx={{p:5,mr:10,ml:10}}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          margin="normal"
        />
        {/* <TextField
          fullWidth
          label="About Us"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        /> */}
        <TextField
          fullWidth
          label="Contact Email"
          type="email"
          variant="outlined"
          margin="normal"
        />
       <RichTextEditorComponent value={content} onChange={setContent} />
        <CustomColorButton
          sx={{mt:3}}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </CustomColorButton>
      </form>
      </Paper>
    </Container>
    </>
  );
};

export default About;
