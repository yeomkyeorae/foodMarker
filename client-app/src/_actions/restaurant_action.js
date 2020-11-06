import axios from "axios";
import {
  READ_RESTAURANTS,
  REGISTER_RESTAURANT,
  DELETE_RESTAURANT,
  UPLOAD_IMAGE
} from "./types";

export function readRestaurants(dataToSubmit) {
  const request = axios
    .post("/api/restaurants", dataToSubmit)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS,
    payload: request
  };
}

export function registerRestaurant(dataToSubmit) {
  console.log("dataToSubmit: ", dataToSubmit);
  const request = axios
    .post("/api/restaurant", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_RESTAURANT,
    payload: request
  };
}

export function deleteRestaurant(restaurantId) {
  const request = axios
    .delete(`/api/restaurant?_id=${restaurantId}`)
    .then(response => response.data);

  return {
    type: DELETE_RESTAURANT,
    payload: request
  };
}

export function uploadImage(dataToSubmit) {
  console.log("dataToSubmit: ", dataToSubmit);
  const request = axios
    .post("/api/upload", dataToSubmit)
    .then(response => response.data);

  return {
    type: UPLOAD_IMAGE,
    payload: request
  };
}
