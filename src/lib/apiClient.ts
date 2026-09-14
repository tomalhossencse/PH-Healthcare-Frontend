import { ofetch } from "ofetch";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
