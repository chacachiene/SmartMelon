import React, { useEffect, useRef } from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";

function SensorDataCard({ icon, value, title, onClick }) {
  const typographyRef = useRef(null);

  useEffect(() => {
    // Adjust font size dynamically based on the length of the value
    const typographyElement = typographyRef.current;
    if (typographyElement) {
      const containerWidth = typographyElement.parentElement.clientWidth;
      const textWidth = typographyElement.scrollWidth;

      if (textWidth > containerWidth) {
        const scaleFactor = containerWidth / textWidth;
        typographyElement.style.fontSize = `${scaleFactor * 30}px`; // Adjust the base font size (30px) as needed
      }
    }
  }, [value]);

  return (
    <Grid item xs={12} sm={6} md={3} container justifyContent="center" alignItems="center" flexDirection={"column"}>
      <Button
        component={Paper}
        onClick={onClick}
        sx={{
          p: 2,
          textAlign: "center",
          width: "80%",
          height: "120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          backgroundColor: "#F0F8FF",
          overflow: "hidden",
          borderRadius: "12px"
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {icon}
          <Typography
            variant="h4"
            gutterBottom
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            ref={typographyRef}
          >
            {value}
          </Typography>
        </div>
      </Button>
      <Typography variant="h6" style={{ textAlign: "center", marginTop: "10px" }}>
        {title}
      </Typography>
    </Grid>
  );
}

export default SensorDataCard;
