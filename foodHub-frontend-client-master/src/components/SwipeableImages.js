import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    height: 240,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
  imgRest: {
    height: 360,
    display: "block",
    maxWidth: 500,
    overflow: "hidden",
    width: "100%",
    borderRadius: "5%",
  },
  buttonLeft: {
    position: "relative",
    top: "-132px",
    left: "-4%",
    color: "white",
  },
  buttonRight: {
    position: "relative",
    top: "-132px",
    right: "-62%",
    color: "white",
  },
  buttonRightRest: {
    right: "-72.5%",
  },
}));

function SwipeableImages(props) {
  const classes = useStyles();
  const imagesArray = props.images;
  let newImagesArray;
  newImagesArray = imagesArray.map((image) => {
    const imageUrlSplit = image.split("\\");
    const imageUrl = imageUrlSplit[0] + "/" + imageUrlSplit[1];
    return `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
  });

  return (
    <>
      <div>
        {newImagesArray.map((step, index) => (
          <div key={step}>
            <img
              className={
                props.type === "home" ? classes.img : classes.imgRest
              }
              src={step}
              alt={step}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default SwipeableImages;
