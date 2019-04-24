<template>
  <div style="border-top: 1px solid #ccc; padding-top: 25px;">
    <h2 class="mb-3">Discussions</h2>
    <div v-if="!posts.length">No discussions yet</div>
    <div v-else v-for="post in posts" :key="post.id">
      <!-- <h3>{{ post.title }}</h3>
      <p v-html="render(post.content)" class="markdown-body">
        {{ post.content }}
      </p> -->
      <v-card class="mb-3 elevation-0">
        <v-card-title
          style="font-weight: 700; text-transform: uppercase; font-size: 16px;"
          >{{ post.title }}</v-card-title
        >
        <v-card-text>{{ post.created_at }}</v-card-text>
        <v-card-text>
          <span v-html="render(post.content)" class="markdown-body">
            {{ post.content }}
          </span>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="mt-5 mb-5">
      <v-card-text>
        <v-text-field v-model="title" label="Title" required></v-text-field>
        <v-tabs dark slider-color="grey">
          <v-tab ripple> Write </v-tab>
          <v-tab-item>
            <v-textarea
              box
              name="input-7-1"
              label="Comment"
              value=""
              hint="Enter your comment"
              v-model="markdown"
            ></v-textarea>
          </v-tab-item>
          <v-tab ripple> Preview </v-tab>
          <v-tab-item>
            {{ renderedText }}
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
import config from "@/config";
const axios = require("axios");
const md5 = require("md5");
let md = require("markdown-it")({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: false,
  quotes: "“”‘’"
}).use(require("markdown-it-named-headers"));

export default {
  props: {
    path: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.discussionID = md5(config.meta.appID + this.path);
    this.getPosts();
  },
  methods: {
    render(content) {
      return md.render(content);
    },
    getPosts() {
      axios({
        url: "http://localhost:5000/graphql",
        method: "post",
        data: {
          query: `
      {
  posts(where: {discussionID: "${this.discussionID}"}) {
    discussionID
    id
    title
    content,
    created_at
  }
}
      `
        }
      }).then(result => {
        this.posts = result.data.data.posts;
      });
    }
  },
  computed: {
    renderedText() {
      return this.markdown;
    }
  },
  data() {
    return {
      config,
      discussionID: null,
      posts: null,
      title: "",
      comment: "",
      username: "cschweda@gmail.com",
      markdown: ""
    };
  }
};
</script>

<style>
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4 {
  font-size: 14px;
}
</style>
