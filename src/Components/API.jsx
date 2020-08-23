import { apiEndpoint } from "../BackendServices/config.json";

import { useEffect } from "react";
function API(props) {
  useEffect(() => (window.location = apiEndpoint + "/users"));
  return null;
}

export default API;
