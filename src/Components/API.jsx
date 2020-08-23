import { apiEndpoint } from "../BackendServices/config.json";

import { useEffect } from "react";
function API(props) {
  useEffect(() => (window.location = "http://localhost:5000/clips"));
  return null;
}

export default API;
