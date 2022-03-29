import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: "3bfccb6c-5030-41c2-8b88-aa6fcf7cf6a6",
    firstName: "Guest",
    lastName: "User",
    email: "guest@rohit.xyz",
    password: "Guest@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
