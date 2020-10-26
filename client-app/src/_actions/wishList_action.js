import axios from "axios";
import { REGISTER_WISHLIST } from "./types";

export function registerWishList(dataToSubmit) {
  const request = axios
    .post("/api/wishList", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_WISHLIST,
    payload: request
  };
}
