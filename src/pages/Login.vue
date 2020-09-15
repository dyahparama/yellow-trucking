<template>
  <q-page class="flex flex-center">
    <div :class="`column${bounce ? ' jello-vertical' : ''}`" style="width:80%">
      <div style="z-index:1" class="col-xs-12">
        <q-card square class="shadow-3" style="width:100%">
          <q-card-section :class="`my-card bg-${theme} row`">
            <q-img
              style="max-height:70px"
              class="self-center"
              src="statics/img/winaros-logo.png"
              contain
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12">
        <div class="row items-stretch">
          <div class="col">
            <q-card style="width:100%">
              <q-card-section class="row justify-center">
                <q-form
                  @submit="onSubmit"
                  style="width:95%"
                  class="q-gutter-md"
                >
                  <q-input
                    :color="theme"
                    v-model="email"
                    label="Email"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please input Email'
                    ]"
                  />

                  <q-input
                    :color="theme"
                    v-model="password"
                    type="Password"
                    label="Password"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') || 'Please input password'
                    ]"
                  />

                  <div class="flex justify-around">
                    <q-btn
                      ref="tombol"
                      label="Submit"
                      type="submit"
                      :color="theme"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      :color="theme"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                  <div class="flex justify-center">
                    <span
                      @click="goToForgotPassword()"
                      :class="`text-${theme} clickable`"
                      >Forgot Password ?</span
                    >
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      bounce: false
    };
  },
  computed: {
    ...mapState("GlobalData", ["baseURL", "theme"])
  },
  methods: {
    ...mapActions("WebService", ["post"]),
    ...mapMutations("WebService", ["setIdentity"]),
    goToForgotPassword() {
      this.$router.push("/forgot-password/");
    },
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}login`,
        data: {
          email: this.email,
          password: this.password
        }
      }).then(values => {
        if (values.info == "success") {
          const data = values.data;
          this.setIdentity({
            key: data.key,
            token: data.token,
            role: data.role,
            expTime: data.expTime
          });
          this.$router.push("/home");
        } else {
          this.showNotif();
          this.coba();
        }
      });
    },
    showNotif() {
      this.$q.notify({
        message: "Login Gagal",
        color: "red",
        position: "top"
      });
    },
    coba() {
      this.bounce = true;
      const _this = this;
      setTimeout(() => {
        _this.bounce = false;
      }, 1000);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.bg-oren-winaros {
  background-color: #f59852;
}
.text-oren-winaros {
  color: #f59852;
}
.clear-margin {
  margin: 0;
}
.clear-padding {
  padding: 0;
}
.jello-vertical {
  -webkit-animation: jello-vertical 0.9s both;
  animation: jello-vertical 0.9s both;
}

@-webkit-keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
