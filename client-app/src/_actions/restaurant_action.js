import axios from "axios";
import { READ_RESTAURANTS } from "./types";

export function readRestaurants(dataToSubmit) {
  const request = axios
    .post("/api/restaurants", dataToSubmit)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS,
    payload: request
  };
}