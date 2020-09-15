/* eslint-disable no-unused-vars */
// import something here

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { date } from "quasar";
export default ({ Vue, store }) => {
  function getPropsModul(type, name) {
    let arr;
    if (type != "state" && type != "_mutations") {
      arr = Reflect.ownKeys(store[type]).map(function(x) {
        return x.replace(new RegExp(name + "/", "g"), "");
      });
    } else if (type == "_mutations") {
      arr = Reflect.ownKeys(store[type]).filter(function(y) {
        return y.includes(name);
      });
      arr = arr.map(function(x) {
        return x.replace(new RegExp(name + "/", "g"), "");
      });
    } else {
      arr = Reflect.ownKeys(store[type][name]);
      arr.pop();
    }
    return arr;
  }
  const mixin = {
    methods: {
      ...mapActions("GlobalData", getPropsModul("_actions", "GlobalData")),
      ...mapMutations("GlobalData", ["setSubHeader", "setHeader"]),
      ...mapActions("WebService", getPropsModul("_actions", "WebService")),
      ...mapMutations("WebService", ["setIdentity"]),
      scrolled(position) {
        if (position > 20) {
          if (this.subHeader) {
            this.setHeader(false);
            this.setSubHeader(false);
          }
          let _this = this;
          setTimeout(() => {
            if (!this.header) {
              _this.setHeader(true);
            }
          }, 50);
        } else {
          if (!this.subHeader) {
            this.setHeader(false);
            setTimeout(() => {
              this.setSubHeader(true);
              this.setHeader(true);
            }, 10);
          }
        }
      },
      showNotif(param = "Gagal Saat Request", color = "red") {
        this.$q.notify({
          message: param,
          color: color,
          position: "top"
        });
      },
      formatDateTime(param) {
        return date.formatDate(param, "HH:mm DD/MM/YYYY");
      }
    },

    computed: {
      ...mapState("GlobalData", getPropsModul("state", "GlobalData")),
      ...mapGetters("GlobalData", getPropsModul("getters", "GlobalData")),
      ...mapState("WebService", getPropsModul("state", "WebService")),
      ...mapGetters("WebService", getPropsModul("getters", "WebService"))
    }
  };
  Vue.prototype.$mixinStore = mixin;
};
