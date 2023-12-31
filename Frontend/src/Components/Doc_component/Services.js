import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Link as SpecLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginImage from "../../Images/login-form-image.jpg";
import { URL } from "../../env";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album(userData) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [specialty, setSpecialty] = useState("");

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const [documents, setDocuments] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(URL + `/doclist?specialty=${specialty}`, {
          method: "GET",
        });
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error("Error occurred:", error);
        // Handle error
      }
    };

    fetchDoctors();
  }, [specialty]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/doclist", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data.data);
  //     });
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 className="topic1">Find a specialize Doctor in Sri Lanka</h1>

        <div className="doctor-search-content">
          <input
            type="text"
            placeholder="Enter doctor's name"
            className="doctor-search-input"
          />
          <select
            className="doctor-specialty-select"
            value={specialty}
            onChange={handleSpecialtyChange}
          >
            <option value="">Show All</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
          </select>
          <button className="find-doctor-button">Find Doctor</button>
        </div>
      </div>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map(
              (item) =>
                (specialty === "" || item.speciality === specialty) && (
                  <Grid item key={item._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 10px 50px rgba(141, 158, 71, 0.5)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={LoginImage}
                        alt="random"
                        sx={{ flexGrow: 1 }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.docname}
                        </Typography>
                        <Typography>
                          Speciality: {item.speciality}
                          <br />
                          Hospital: {item.workingHospital}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" onClick={handleOpen}>
                          View
                        </Button>
                      </CardActions>
                      <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <BootstrapDialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose}
                        >
                          {item.docname}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                          <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas
                            eget quam. Morbi leo risus, porta ac consectetur ac,
                            vestibulum at eros.
                          </Typography>
                          <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur et. Vivamus sagittis lacus vel augue
                            laoreet rutrum faucibus dolor auctor.
                          </Typography>
                          <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor fringilla.
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Place a Book
                          </Button>
                          <Button autoFocus onClick={handleClose}>
                            Save changes
                          </Button>
                        </DialogActions>
                      </BootstrapDialog>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
}
