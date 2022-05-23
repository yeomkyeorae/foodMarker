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


export function readRestaurants(userId: string, page: number, itemPerPage: number, order: number) {
  const request = axios
    .get(`/api/restaurants?userId=${userId}&page=${page}&itemPerPage=${itemPerPage}&order=${order}`)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS,
    payload: request
  };
}

export function readRestaurantsCount(id: string) {
  const request = axios
    .get(`/api/restaurants/count?id=${id}`)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS_COUNT,
    payload: request
  };
}

export function readRestaurantsNoImage(userId: string, optionLocation: string) {
  const request = axios
    .get(`/api/restaurants-no-image?userId=${userId}&optionLocation=${optionLocation}`)
    .then(response => response.data);

  return {
    type: READ_RESTAURANTS_NO_IMAGE,
    payload: request
  };
}

export function readTenRestaurants() {
  const request = axios
    .get("/api/ten-restaurants")
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

export function registerRestaurant(body: { visitor: string, username: string, name: string, address: string, date: string, imgURL: string, rating: number, eatingTime: number, menus: string, created: string }) {
  const request = axios
    .post("/api/restaurant", body)
    .then(response => response.data);

  return {
    type: REGISTER_RESTAURANT,
    payload: request
  };
}

export function deleteRestaurant(restaurantId: string) {
  const request = axios
    .delete(`/api/restaurant?_id=${restaurantId}`)
    .then(response => response.data);

  return {
    type: DELETE_RESTAURANT,
    payload: request
  };
}

export function updateRestaurant(body: { restaurantId: string, date: string, imgURL: string, rating: number, eatingTime: number, menus: string }) {
  const request = axios
    .put("/api/restaurant", body)
    .then(response => response.data);

  return {
    type: UPDATE_RESTAURANT,
    payload: request
  };
}

export function registerJpegImg(body: any[]) {
  const request = axios
    .post("/api/img/jpeg", body)
    .then(response => response.data);

  return {
    type: REGISTER_JPEG_IMG,
    payload: request
  };
}

export function registerHeicImg(body: { images: any[], imgNames: string[] }) {
  const request = axios
    .post("/api/img/heic", body)
    .then(response => response.data);

  return {
    type: REGISTER_HEIC_IMG,
    payload: request
  };
}
