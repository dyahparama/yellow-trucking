import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import { LocalStorage } from "quasar";
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  Router.beforeEach((to, from, next) => {
    // const publicPages = ["/login"];
    // const authRequired = !publicPages.includes(to.path);
    // let login = false;
    if (store.state.WebService.token) {
      //login = true;
    } else if (LocalStorage.getItem("identity")) {
      let data = LocalStorage.getItem("identity");
      data = JSON.parse(data);
      store.commit("WebService/setIdentity", {
        token: data.token,
        key: data.key,
        role: data.role,
        expTime: data.expTime
      });
      LocalStorage.remove("identity");
      //login = true;
    }
    next();
    // if (authRequired) {
    //   if (login) {
    //     next();
    //   } else {
    //     Router.push("login");
    //   }
    // } else {
    //   if (login) {
    //     Router.push("/home");
    //   } else {
    //     next();
    //   }
    // }
  });
  return Router;
}
