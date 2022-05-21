import axios from "axios";
import {
  READ_CHOIZAROAD,
  READ_VISITED_CHOIZAROAD,
  REGISTER_CHOIZAROAD,
  REGISTER_VISITED_CHOIZAROAD,
  DELETE_VISITED_CHOIZAROAD
} from "./types";


export function readChoizaRoad(season: number) {
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

export function readVisitedChoizaRoad(userId: string, season: number) {
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

export function registerChoizaRoad(body: { thumbnailURL: string, youtubeURL: string, title: string, season: number, ep: number, restaurants: string }) {
  const request = axios
    .post("/api/choizaRoads", body)
    .then(response => response.data);

  return {
    type: REGISTER_CHOIZAROAD,
    payload: request
  };
}

export function registerVisitedChoizaRoad(body: { restaurantName: string, season: number, userId: string }) {
  const request = axios
    .post("/api/visitedChoizaRoads", body)
    .then(response => response.data);

  return {
    type: REGISTER_VISITED_CHOIZAROAD,
    payload: request
  };
}

export function deleteVisitedChoizaRoad(visitedChoizaRoadId: string) {
  const request = axios
    .delete(`/api/visitedChoizaRoads?_id=${visitedChoizaRoadId}`)
    .then(response => response.data);

  return {
    type: DELETE_VISITED_CHOIZAROAD,
    payload: request
  };
}
