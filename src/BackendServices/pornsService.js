import { apiEndpoint } from "./config.json";
import http from "./http";
export const getPorns = async () => {
  const { data } = await http.get(apiEndpoint + "/clips/all");
  return data;
};
