/* eslint-disable no-console */
import axios from "axios";
import NProgress from "nprogress";
import config from "@/config";
import { EventBus } from "../event-bus.js";

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

export default {
  // Authentication
  authorize(jwt) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      client.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      resolve("Bearer token set");
    });
  },
  login({ identifier, password }) {
    return new Promise((resolve, reject) => {
      client
        .post(config.api.authRoute, {
          identifier,
          password
        })
        .then(
          res => {
            const jwt = res.data.jwt;
            const userMeta = res.data.user;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("userMeta", JSON.stringify(userMeta));
            client.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            resolve(res);
          },
          error => {
            reject(error);
          }
        );
    });
  },
  logout() {
    delete client.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("userMeta");
  },
  // Comments
  async getComments(discussionID) {
    return await client
      .post("/graphql", {
        query: `
            {
                comments(where: {discussionID: "${discussionID}"}) 
                    {
                        discussionID
                        id
                        title
                        content,
                        created_at,
                        hidden,
                        user {
                            username
                        }
                    }
            }
      `
      })
      .catch(err => {
        console.log(err);
      });
  },
  async submitComment(payload) {
    return await client.post("/comments", payload).catch(err => {
      EventBus.$emit("commentError", err);
    });
  }
};
