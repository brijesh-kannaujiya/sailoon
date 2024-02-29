import Button from "@mui/material/Button";
import React, { useState } from "react";
import styles from "../dashboard/dashboardstyle.module.css";

const AddCategory = () => {
  const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const addDealsData = () => {
      let formData = new FormData();
    };

  return (
    <React.Fragment>
        
      <Button
        variant="contained"
        className={styles.addbutton}
          onClick={handleClickOpen}
      >
        Add Category
      </Button>
    </React.Fragment>
  );
};

export default AddCategory;
