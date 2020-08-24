import http from "./http";
import { apiEndpoint } from "./config.json";
import { toast } from "react-toastify";
const key = "token";

export async function login(username, password) {
  try {
    const promise = await http.post(apiEndpoint + "/_users/login", {
      username,
      password,
    });
    if (promise.data.status === 404) {
      toast.error("Username not found");
    } else if (promise.data.status === 401) {
      toast.error("Incorrect password");
    } else {
      localStorage.setItem(key, JSON.stringify(promise.data));
      window.location = `/profile/${JSON.parse(getCurrrentUser()).name}`;
    }
  } catch (err) {
    toast.error("Server Down :( ");
  }
}

export function getCurrrentUser() {
  return localStorage.getItem(key);
}

export function logout() {
  localStorage.removeItem(key);
}
