import axios from "axios";
import {
  READ_RESTAURANTS,
  READ_RESTAURANTS_COUNT,
  READ_RESTAURANTS_NO_IMAGE,
  READ_TEN_RESTAURANTS,
  READ_RESTAURANT_MOST,
  REGISTER_RESTAURANT,
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT,
  REGISTER_JPEG_IMG,
  REGISTER_HEIC_IMG
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

export function readRestaurantsCount(id) {
  const request = axios
    .get(`/api/restaurants/count?id=${id}`)
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

export function readTenRestaurants(userId) {
  const request = axios
    .get("/api/ten-restaurants", {
      params: {
        _id: userId
      }
    })
    .then(response => response);

  return {
    type: READ_TEN_RESTAURANTS,
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

export function registerJpegImg(dataToSubmit) {
  const request = axios
    .post("/api/img/jpeg", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_JPEG_IMG,
    payload: request
  };
}

export function registerHeicImg(dataToSubmit) {
  const request = axios
    .post("/api/img/heic", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_HEIC_IMG,
    payload: request
  };
}
