import axios from "axios";
import {
  READ_RESTAURANTS,
  READ_RESTAURANTS_COUNT,
  READ_RESTAURANTS_NO_IMAGE,
  READ_RESTAURANTS_TOP5,
  READ_RESTAURANT_MOST,
  REGISTER_RESTAURANT,
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT,
  REGISTER_IMG
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

export function readRestaurantsCount(dataToSubmit) {
  const request = axios
    .post("/api/restaurants/count", dataToSubmit)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS_COUNT,
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

export function readRestaurantsTop5(userId) {
  const request = axios
    .get("/api/restaurants/top5", {
      params: {
        _id: userId
      }
    })
    .then(response => response);

  return {
    type: READ_RESTAURANTS_TOP5,
    payload: request
  };
}

export function readRestaurantMost() {
  const request = axios.get("/api/restaurant/most").then(response => response);

  return {
    type: READ_RESTAURANT_MOST,
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

export function registerImg(dataToSubmit) {
  const request = axios
    .post("/api/img", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_IMG,
    payload: request
  };
}
