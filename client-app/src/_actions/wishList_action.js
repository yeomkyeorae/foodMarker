import axios from "axios";
import {
  READ_WISHLIST,
  READ_TEN_WISHLIST,
  REGISTER_WISHLIST,
  DELETE_WISHLIST,
  READ_WISHLIST_COUNT
} from "./types";

export function readWishList(id) {
  const request = axios
    .get(`/api/wishLists?id=${id}`)
    .then(response => response.data);

  return {
    type: READ_WISHLIST,
    payload: request
  };
}

export function readTenWishList() {
  const request = axios.get("/api/wishLists").then(response => response.data);

  return {
    type: READ_TEN_WISHLIST,
    payload: request
  };
}

export function registerWishList(dataToSubmit) {
  const request = axios
    .post("/api/wishList", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_WISHLIST,
    payload: request
  };
}

export function deleteWishList(wishListId) {
  const request = axios
    .delete(`/api/wishList?_id=${wishListId}`)
    .then(response => response.data);

  return {
    type: DELETE_WISHLIST,
    payload: request
  };
}

export function readWishListCount(id) {
  const request = axios
    .get(`/api/wishList/count?id=${id}`)
    .then(response => response.data);

  return {
    type: READ_WISHLIST_COUNT,
    payload: request
  };
}