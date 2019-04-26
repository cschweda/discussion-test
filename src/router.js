import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/contact",
      name: "contact",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Contact.vue")
    },
    {
      path: "/login",
      name: "login",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    }
  ]
});

// Router.beforeEach((to, from, next) => {
//   let jwt = localStorage.getItem("jwt");
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn && jwt) {
//       next();
//       return;
//     }
//     store.dispatch("logout").then(Router.push("/login"));
//     next("/login");
//   } else {
//     next();
//   }
// });
