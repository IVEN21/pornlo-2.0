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
      if (promise.data.likes)
        localStorage.setItem(key2, JSON.stringify(promise.data.likes));
      else {
        localStorage.setItem(key2, JSON.stringify([]));
      }
      if (promise.data.uploads) {
        localStorage.setItem(key3, JSON.stringify(promise.data.uploads));
      } else {
        localStorage.setItem(key3, JSON.stringify([]));
      }
      window.location = `/profile/${getCurrrentUser().name}`;
    }
  } catch (err) {
    toast.error("Server Down :( ");
  }
}

export async function refreshUser(userID) {
  try {
    const { data } = await http.post(`${apiEndpoint}/_users/refresh`, {
      userID,
    });

    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(key2, JSON.stringify(data.likes));
    localStorage.setItem(key3, JSON.stringify(data.uploads));
    toast.success("Everything up to data ");
  } catch (err) {
    toast.error("Server Down :( ");
  }
}
export async function userLike(userID, clips) {
  try {
    await http.patch(apiEndpoint + "/_users/" + userID, {
      userID: userID,
      likes: clips.likes,
      uploads: clips.uploads,
    });
   
  } catch (error) {}
}

export function getCurrrentUser() {
  return JSON.parse(localStorage.getItem(key));
}

export function logout() {
  localStorage.clear();
}

//Tempo Clip SAVES
const key2 = "tempClip_likes";
const key3 = "tempClip_uploads";

export function localClipSave(clipID) {
  const existed = JSON.parse(localClipfetch());

  if (existed) {
    for (var i = 0; i < existed.length; i++) {
      if (existed[i] === clipID) {
        var newList = existed.filter((list) => list !== clipID);
        localStorage.setItem(key2, JSON.stringify(newList));
        return;
      }
    }
    const clips = JSON.stringify([clipID, ...existed]);
    localStorage.setItem(key2, clips);
  } else {
    localStorage.setItem(key2, JSON.stringify([clipID]));
  }
}
export function localUploadSave(clipID) {
  const existed = JSON.parse(localUploadfetch());

  if (existed) {
    for (var i = 0; i < existed.length; i++) {
      if (existed[i] === clipID) {
        var newList = existed.filter((list) => list !== clipID);
        localStorage.setItem(key3, JSON.stringify(newList));
        return;
      }
    }
    const clips = JSON.stringify([clipID, ...existed]);
    localStorage.setItem(key3, clips);
  } else {
    localStorage.setItem(key3, JSON.stringify([clipID]));
  }
}

export function localClipfetch() {
  return localStorage.getItem(key2);
}

export function localUploadfetch() {
  return localStorage.getItem(key3);
}
