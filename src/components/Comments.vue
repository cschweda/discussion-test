<template>
  <div
    style="border-top: 1px solid #ccc; padding-top: 25px; min-height: 700px;"
    v-if="display"
  >
    <v-snackbar v-model="snackbar" top :timeout="0">
      {{ this.$store.state.comments.commentError }}
      <v-btn color="pink" flat @click="clearError">
        Close
      </v-btn>
    </v-snackbar>
    <h2 class="mb-3">Discussions</h2>

    <div v-if="!commentsExist">No discussions yet</div>
    <div v-for="comment in comments" :key="comment.id" :ref="comment.id">
      <v-card class="mb-3 elevation-0" v-if="!comment.hidden">
        <v-card-text style="margin-top: 15px;">{{
          new Date(comment.created_at)
        }}</v-card-text>
        <v-card-title
          style="font-weight: 700; text-transform: uppercase; font-size: 16px; margin-top: -25px;"
          >{{ comment.title }}</v-card-title
        >

        <v-card-text>
          <span v-html="render(comment.content)" class="markdown-body"> </span>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="mt-5 mb-5" v-if="isLoggedIn">
      <v-card-text>
        Discussion ID: {{ discussionID }}
        <v-text-field v-model="title" label="Title" required></v-text-field>
        <v-tabs dark slider-color="red">
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
    <div v-if="!isLoggedIn">
      <comment-login :path="$route.path"></comment-login>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import config from "@/config";
import { EventBus } from "../event-bus.js";
const md5 = require("md5");
const prism = require("markdown-it-prism");
const namedHeaders = require("markdown-it-named-headers");
let md = require("markdown-it")(config.markdownItOptions);
md.use(prism).use(namedHeaders);
import client from "@/services/client";
import CommentLogin from "@/components/CommentLogin";
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
    this.getComments();
  },
  mounted() {
    EventBus.$on("commentError", payload => {
      this.$store.dispatch("comments/setCommentError", payload);
      this.snackbar = true;
    });
    console.log(this.isLoggedIn);
  },
  components: {
    CommentLogin
  },

  methods: {
    render(content) {
      return md.render(content);
    },
    async submit() {
      let payload = {
        title: this.title,
        content: this.markdown,
        discussionID: this.discussionID,
        hidden: false,
        user: "2"
      };
      await client.submitComment(payload).then(res => {
        this.getComments();
        this.clearForm();
        this.$forceUpdate();
        console.log("Status: ", res);
      });
    },
    clearForm() {
      this.title = "";
      this.markdown = "";
    },
    getComments() {
      client
        .getComments(this.discussionID)
        .then(res => (this.comments = res.data.data.comments));
    },
    clearError() {
      this.snackbar = false;
      this.$store.dispatch("comments/clearCommentError");
    }
  },
  computed: {
    renderedText() {
      return this.render(this.markdown);
    },
    commentsExist() {
      if (this.comments) {
        return this.comments.length;
      }
      return false;
    },
    hidden() {
      return this.moderate;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    }
  },
  data() {
    return {
      config,
      discussionID: null,
      comments: null,
      title: "",
      comment: "",
      userID: 2,
      markdown: "",
      snackbar: false
    };
  }
};
</script>

<style>
@import url("../../node_modules/github-markdown-css/github-markdown.css");

.markdown-body code {
  background-color: #f5f5f5;
  color: #555;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4 {
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 25px;
}

.markdown-body h1 {
  text-transform: uppercase;
  border-bottom: 0px solid #eee;
  font-weight: 900;
}

.markdown-body h2 {
  border-bottom: 1px solid #eee;
}

.markdown-body h3 {
  color: #666;
}
</style>
