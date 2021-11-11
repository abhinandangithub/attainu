import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  SearchBar: {
    margin: "24px 0 28px 360px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  }
}));

const Home = () => {
  const classes = useStyles();
  const [searchTxt, setSearchTxt] = useState();
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);

  const onChange = (value) => {
    setSearchTxt(value);
  }
  return (
    <>
      {authenticated ? 
        <>
          <Grid container direction="column">
            <Grid item className={classes.SearchBar}>
              <SearchBar page="home" onChange={onChange}/>
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                {loading ? <Spinner /> : <RestaurantContent searchTxt={searchTxt}/>}
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </Grid>
        </>
       : <h4>Please login to see all restaurants</h4>

      }
    </>
  );
};

export default Home;
