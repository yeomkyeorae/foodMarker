import axios from "axios";
import { READ_RESTAURANTS, REGISTER_RESTAURANT } from "./types";

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
  const request = axios
    .post("/api/restaurant", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_RESTAURANT,
    payload: request
  };
}
