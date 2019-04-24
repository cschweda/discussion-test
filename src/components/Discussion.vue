<template>
  <div
    style="border-top: 1px solid #ccc; padding-top: 25px; min-height: 700px;"
    v-if="display"
  >
    <h2 class="mb-3">Discussions</h2>

    <div v-if="!postsExist">No discussions yet</div>
    <div v-for="post in posts" :key="post.id">
      <v-card class="mb-3 elevation-0" v-if="!post.hidden">
        <v-card-title
          style="font-weight: 700; text-transform: uppercase; font-size: 16px;"
          >{{ post.title }}</v-card-title
        >
        <v-card-text style="margin-top: -25px;">{{
          new Date(post.created_at)
        }}</v-card-text>
        <v-card-text>
          <span v-html="render(post.content)" class="markdown-body">
            {{ post.content }}
          </span>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="mt-5 mb-5">
      <v-card-text>
        {{ discussionID }}
        <v-text-field v-model="title" label="Title" required></v-text-field>
        <v-tabs dark slider-color="grey">
          <v-tab ripple> Write </v-tab>
          <v-tab-item>
            <v-textarea
              box
              height="250"
              name="input-7-1"
              value=""
              hint="Enter your comment"
              v-model="markdown"
              class="py-2 px-1"
            ></v-textarea>
          </v-tab-item>
          <v-tab ripple> Preview </v-tab>
          <v-tab-item>
            <div
              class="markdown-body py-3 px-1"
              v-html="renderedText"
              style="min-height: 300px;"
            ></div>
          </v-tab-item>
        </v-tabs>

        <div class="text-xs-right">
          <v-btn @click.prevent="submit">Submit</v-btn>
        </div>
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
    },
    moderate: {
      type: Boolean,
      default: false
    },
    display: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.discussionID = md5(config.meta.appID + this.path);
    this.getPosts();
  },

  methods: {
    render(content) {
      return md.render(content);
    },
    submit() {
      axios({
        url: "http://localhost:5000/graphql",
        method: "post",
        data: {
          query: `
           mutation {
  createPosts (input: {
    data: {
      title: "${this.title}",
      discussionID: "${this.discussionID}",
      content: "${this.markdown}",
      hidden: ${this.hidden},
      user: "${this.userID}"

    }
  }) {
    post {
      id
    }
  }
}
      `
        }
      }).then(result => {
        console.log(
          "Successful mutation. ID:",
          result.data.data.createPosts.post.id
        );
      });
      this.getPosts();
      this.$forceUpdate();
      this.clearForm();
    },
    clearForm() {
      this.title = "";
      this.markdown = "";
    },
    getPosts() {
      axios({
        url: "http://localhost:5000/graphql",
        method: "post",
        data: {
          query: `
            {
                posts(where: {discussionID: "${this.discussionID}"}) 
                    {
                        discussionID
                        id
                        title
                        content,
                        created_at,
                        hidden
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
      return this.render(this.markdown);
    },
    postsExist() {
      if (this.posts) {
        return this.posts.length;
      }
      return false;
    },
    hidden() {
      return this.moderate;
    }
  },
  data() {
    return {
      config,
      discussionID: null,
      posts: null,
      title: "",
      comment: "",
      userID: 1,
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
  margin-bottom: 10px;
  margin-top: 15px;
}

.markdown-body h1 {
  text-transform: uppercase;
}

.markdown-body h2 {
  border-bottom: 1px solid #eee;
}
</style>
