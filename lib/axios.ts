import axios from "axios";
export const api = axios.create({
  baseURL: "https://wnsxretzoexjewupnzef.supabase.co/rest/v1/Orders",
});
import * as constants from "./../src/constants/constants";
const { SupabaseAutorization } = constants;

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Induc3hyZXR6b2V4amV3dXBuemVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1ODgzMDUsImV4cCI6MjAwNjE2NDMwNX0.6kZf5xZZAZxk5vFUdV0hEP91TqpYmxHKNqbx8XPjnAk";

const autorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Induc3hyZXR6b2V4amV3dXBuemVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDU4ODMwNSwiZXhwIjoyMDA2MTY0MzA1fQ.j9wwmdQ8ixlgZfJDK1QVWryd7TnTYmKDGYaPK478Sw0";

export const params = {
  apikey: apiKey,
  Authorization: autorization,
  "Content-Type": "application/json",
};
