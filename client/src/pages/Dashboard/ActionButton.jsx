import React from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";

function ActionButton({ title, onClick }) {
  return (
    <Grid item xs={12} sm={8} md={4} container justifyContent="center" alignItems="center">
      <Button
        component={Paper}
        onClick={onClick}
        sx={{
          p: 2,
          textAlign: "center",
          width: "80%",
          height: "100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          backgroundColor: "#F0F8FF",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", fontSize: "17px", color: "black" }}>
          {title}
        </Typography>
      </Button>
    </Grid>
  );
}

export default ActionButton;
