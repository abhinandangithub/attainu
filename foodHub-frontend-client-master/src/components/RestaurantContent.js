import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";

import RestaurantCard from "./RestaurantCard";
import { fetchRestaurants } from "../redux/actions/dataActions";

const RestaurantContent = (props) => {
  const { restaurants } = useSelector((state) => state.data);
  const [restaurantArray, setRestaurantArray] = useState(restaurants.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantArray)
      dispatch(fetchRestaurants());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // console.log('props.searchTxt ', props.searchTxt);
    if (!!props.searchTxt && restaurants && restaurants.restaurants && restaurants.restaurants.length) {
      let arr = restaurants.restaurants.filter((obj) => {
        return obj.name.includes(props.searchTxt)
      });
      setRestaurantArray(arr)
    } else {
      setRestaurantArray(restaurants.restaurants);
    }
      
  }, [props.searchTxt]);

  const getRestaurantCard = (restaurantObj) => {
    return (
      <Grid item xs={12} sm={3} key={restaurantObj._id}>
        <RestaurantCard {...restaurantObj} />
      </Grid>
    );
  };
  return (
    <>
      <Grid container spacing={2}>
        {restaurantArray ? (
          restaurantArray.length > 0 ? (
            restaurantArray.map((restaurant) => getRestaurantCard(restaurant))
          ) : (
            <p>
              No Restaurants currently available in your area, come back Later.
            </p>
          )
        ) : (
          <p>Server Error, come back Later.</p>
        )}
      </Grid>
    </>
  );
};

export default RestaurantContent;
