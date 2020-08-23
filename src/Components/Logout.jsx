
import { useEffect } from "react";
import { logout } from "../BackendServices/authService";
function Logout(props) {
  useEffect(() => {
    logout();
    window.location = "/";
  });
  return null;
}

export default Logout;
