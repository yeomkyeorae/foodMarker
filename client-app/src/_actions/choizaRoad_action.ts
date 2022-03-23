import axios from "axios";
import {
  READ_CHOIZAROAD,
  READ_VISITED_CHOIZAROAD,
  REGISTER_CHOIZAROAD,
  REGISTER_VISITED_CHOIZAROAD,
  DELETE_VISITED_CHOIZAROAD
} from "./types";

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

export function readVisitedChoizaRoad(userId, season) {
  const request = axios
    .get("/api/visitedChoizaRoads", {
      params: {
        userId,
        season
      }
    })
    .then(response => response);

  return {
    type: READ_VISITED_CHOIZAROAD,
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

export function registerVisitedChoizaRoad(dataToSubmit) {
  const request = axios
    .post("/api/visitedChoizaRoads", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_VISITED_CHOIZAROAD,
    payload: request
  };
}

export function deleteVisitedChoizaRoad(visitedChoizaRoadId) {
  const request = axios
    .delete(`/api/visitedChoizaRoads?_id=${visitedChoizaRoadId}`)
    .then(response => response.data);

  return {
    type: DELETE_VISITED_CHOIZAROAD,
    payload: request
  };
}
