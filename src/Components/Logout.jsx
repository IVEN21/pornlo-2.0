import { useEffect } from "react";
import {
  logout,
  userLike,
  localClipfetch,
  localUploadfetch,
} from "../BackendServices/authService";
function Logout({ user }) {
  useEffect(() => {
    userLike(user._id, {
      likes: JSON.parse(localClipfetch()),
      uploads: JSON.parse(localUploadfetch()),
    });
    logout();
    window.location = "/";
  });
  return null;
}

export default Logout;
