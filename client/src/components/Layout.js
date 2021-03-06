import { Container, CssBaseline, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ProductList from "./products/ProductList.js";
import { reactLocalStorage } from "reactjs-localstorage";

const layoutStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
  },
}));

const Layout = () => {
  const classes = layoutStyles();

  const [token] = useState(reactLocalStorage.get("token",true));

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container className={classes.container}>
          <BrowserRouter>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/product-list"
              component={token ? ProductList : SignIn}
            />
          </BrowserRouter>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
