import axios from "axios";
import NProgress from "nprogress";
import config from "@/config";

const client = axios.create({
  baseURL: config.api[process.env.NODE_ENV].url
});

client.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

client.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
