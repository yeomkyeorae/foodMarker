import axios from "axios";
import {
  READ_WISHLIST,
  READ_TEN_WISHLIST,
  REGISTER_WISHLIST,
  DELETE_WISHLIST,
  READ_WISHLIST_COUNT
} from "./types";
import { WishListType } from "../components/interfaces/WishList";


export function readWishList(id: string, order: number): { type: string, payload: Promise<WishListType[]> } {
  const request = axios
    .get(`/api/wishLists?id=${id}&order=${order}`)
    .then(response => response.data);

  return {
    type: READ_WISHLIST,
    payload: request
  };
}

export function readTenWishList(): { type: string, payload: Promise<WishListType[]> } {
  const request = axios.get("/api/ten-wishLists").then(response => response.data);

  return {
    type: READ_TEN_WISHLIST,
    payload: request
  };
}

export function registerWishList(body: { user: string, username: string, name: string, address: string, created: string }): { type: string, payload: Promise<{ success: boolean }> } {
  const request = axios
    .post("/api/wishList", body)
    .then(response => response.data);

  return {
    type: REGISTER_WISHLIST,
    payload: request
  };
}

export function deleteWishList(wishListId: string): { type: string, payload: Promise<{ success: boolean }> } {
  const request = axios
    .delete(`/api/wishList?_id=${wishListId}`)
    .then(response => response.data);

  return {
    type: DELETE_WISHLIST,
    payload: request
  };
}

export function readWishListCount(id: string): { type: string, payload: Promise<number> } {
  const request = axios
    .get(`/api/wishList/count?id=${id}`)
    .then(response => response.data);

  return {
    type: READ_WISHLIST_COUNT,
    payload: request
  };
}