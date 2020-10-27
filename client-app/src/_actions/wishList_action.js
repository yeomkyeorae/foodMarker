import axios from "axios";
import { READ_WISHLIST, REGISTER_WISHLIST } from "./types";

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
