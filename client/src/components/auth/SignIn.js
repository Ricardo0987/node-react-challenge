import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CONFIG } from "../../config";
import Spinner from "../misc/Spinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#0e121b",
    width: "150px",
    height: "150px",
  },
  form: {
    width: "100%",
  },
  signUp: {
    position: "fixed",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    left: 0,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [isPendingData, setPendingData] = useState(false);

  const [data, setData] = useState({
    user: "",
    password: "",
  });
  const [token, setToken] = useState();

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handlerSubmitButton = (e) => {
    e.preventDefault();
    if (!data.user.trim() || !data.password.trim()) {
      setError(true);
      setHelperText("This field can not empty");
    } else {
      setPendingData(true);
      axios
        .post(
          CONFIG.HOST + "/api/v1/users/login",
          {
            email: data.user,
            password: data.password,
          },
          token && {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(function (response) {
          setToken(response.data.token);
          history.push("/product-list");
        })
        .catch(function (error) {
          if (error.response) {
            setError(true);
            setHelperText(error.response.data);
          }
        })
        .then(function () {
          setPendingData(false);
        });
    }
  };

  const handleInputChange = (event) => {
    setError(false);
    setHelperText(" ");

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const goSigUp = () => {
    history.push("/signup");
  };
  return (
    <Container component="main" maxWidth="xs">
      {isPendingData && <Spinner />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img alt="logo" src="logo.png" width="150px" />
        </Avatar>
        <Typography variant="body2">
          Please enter your credentials to proceed
        </Typography>
        <FormControl
          component="fieldset"
          error={error}
          className={classes.form}
        >
          <TextField
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User"
            name="user"
            autoFocus
          />
          <TextField
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <FormHelperText>{helperText}</FormHelperText>
          <div />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlerSubmitButton}
            data-testid="submit"
          >
            LOGIN
          </Button>
          <div className={classes.signUp}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link variant="body2" onClick={goSigUp}>
                Sign Up
              </Link>
            </Typography>
          </div>
        </FormControl>
      </div>
    </Container>
  );
}
