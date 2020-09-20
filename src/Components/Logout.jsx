import { useEffect } from "react";
import {
  logout,
  userLike,
  localClipfetch,
  localUploadfetch,
  getCurrrentUser,
} from "../BackendServices/authService";
function  Logout({ user }) {
  const triapprove = () => {
    if (getCurrrentUser().await === true) return true;
    else if (
      getCurrrentUser().approved === undefined ||
      getCurrrentUser().approved === true
    )
      return false;
    return true;
  };
  useEffect(async () => {
    await userLike(
      user._id,
      {
        likes: JSON.parse(localClipfetch()),
        uploads: JSON.parse(localUploadfetch()),
      },
      triapprove()
    );
    logout();
    window.location = "/";
  });
  return null;
}

export default Logout;
