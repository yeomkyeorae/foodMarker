import axios from "axios";
import { READ_WISHLIST, REGISTER_WISHLIST, DELETE_WISHLIST } from "./types";

export function readWishList(dataToSubmit) {
  const request = axios
    .post("/api/wishLists", dataToSubmit)
    .then(response => response.data);

  return {
    type: READ_WISHLIST,
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
