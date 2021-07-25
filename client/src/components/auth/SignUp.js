import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },

  signUp: {
    position: "fixed",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    left: 0,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handlerSubmitButton = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (event) => {
    setError(false);
    setHelperText(" ");

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const goSigIn = () => {
    history.push("/signin");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="body2">Please enter your information</Typography>
        <FormControl
          component="fieldset"
          error={error}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="fullName"
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                name="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <FormHelperText>{helperText}</FormHelperText>
          <div />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlerSubmitButton}
          >
            SIGN UP
          </Button>

          <div className={classes.signUp}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link variant="body2" onClick={goSigIn}>
                Sign In
              </Link>
            </Typography>
          </div>
        </FormControl>
      </div>
    </Container>
  );
}
