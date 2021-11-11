import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import LocationOn from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";

import axios from "axios";

import { fetchRestaurantsByAddress } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 860,
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  results: {
    position: "absolute",
    bottom: -166,
    left: "26%",
    zIndex: 999,
    width: 760,
    height: "15%",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const [address, setAddress] = useState(
    localStorage.getItem("location") || ""
  );

  const page = props.page;

  const handleSelect = async (event) => {
    console.log('value ', event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <Paper
      component="form"
      className={classes.rootHome}
    >
      {page === "home" && <LocationOn className={classes.iconButton} />}

      {page === "home" && (
        <InputBase
          placeholder= "Search by restaurant place name"
          className={classes.input}
          inputProps={{
            "aria-label": "Search by restaurant place name",
          }}
          onChange={handleSelect}
        />
      )}
      <SearchIcon className={classes.iconButton} />
    </Paper>
  );
}
