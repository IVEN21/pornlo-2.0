import { apiEndpoint } from "../BackendServices/config.json";

import { useEffect } from "react";
function API(props) {
  useEffect(() => (window.location = apiEndpoint + "/clips"));
  return null;
}

export default API;
