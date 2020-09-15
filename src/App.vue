<template>
  <div id="q-app">
    <router-view :key="keyId" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      keyId: this.$router.currentRoute.fullPath
    };
  },
  mounted() {
    const _this = this;
    window.addEventListener("unload", _this.handler);
  },
  computed: {
    ...mapState("WebService", ["key", "token", "role", "expTime"])
  },
  methods: {
    ...mapMutations("WebService", ["setIdentity"]),
    handler() {
      const _this = this;
      if (this.token) {
        let data = {
          token: _this.token,
          key: _this.key,
          role: _this.role,
          expTime: _this.expTime
        };
        this.$q.localStorage.set("identity", JSON.stringify(data));
      }
      return null;
    }
  }
};
</script>
