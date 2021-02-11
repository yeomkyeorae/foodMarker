import axios from "axios";
import { READ_CHOIZAROAD, REGISTER_CHOIZAROAD } from "./types";

export function readChoizaRoad(season) {
  const request = axios
    .get("/api/choizaRoads", {
      params: {
        season: season
      }
    })
    .then(response => response);

  return {
    type: READ_CHOIZAROAD,
    payload: request
  };
}

export function registerCHoizaRoad(dataToSubmit) {
  const request = axios
    .post("/api/choizaRoads", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_CHOIZAROAD,
    payload: request
  };
}
