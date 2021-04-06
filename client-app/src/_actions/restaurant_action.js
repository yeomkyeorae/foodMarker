import axios from "axios";
import {
  READ_RESTAURANTS,
  READ_RESTAURANTS_NO_IMAGE,
  REGISTER_RESTAURANT,
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT
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

export function readRestaurantsNoImage(dataToSubmit) {
  const request = axios
    .post("/api/restaurants-no-image", dataToSubmit)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS_NO_IMAGE,
    payload: request
  };
}

export function registerRestaurant(dataToSubmit) {
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

export function updateRestaurant(dataToSubmit) {
  const request = axios
    .put("/api/restaurant", dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_RESTAURANT,
    payload: request
  };
}
