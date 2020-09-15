<template>
  <q-page class="flex flex-center">
    <div :class="`column${bounce ? ' jello-vertical' : ''}`" style="width:80%">
      <div style="z-index:1" class="col-xs-12">
        <q-card square class="shadow-3" style="width:100%"> </q-card>
      </div>
      <div class="col-xs-12">
        <div class="row items-stretch">
          <div class="col">
            <q-card style="width:100%">
              <q-card-section class="row justify-center">
                <q-form
                  @submit="onSubmit"
                  @reset="clearForm"
                  style="width:95%"
                  class="q-gutter-md"
                >
                  <q-input
                    :color="theme"
                    v-model="password"
                    label="Password"
                    lazy-rules
                    type="Password"
                    :rules="[
                      val => (val && val.length > 0) || 'Please input Password'
                    ]"
                  />

                  <q-input
                    :color="theme"
                    v-model="confirmPassword"
                    type="Password"
                    label="Confirm Password"
                    lazy-rules
                    :rules="[
                      val =>
                        val == password ||
                        'Confirm password must be same with password'
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
import Vue from "vue";
export default {
  name: "login",
  props: ["id", "validate"],
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      confirmPassword: "",
      password: "",
      bounce: false
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      let _this = this;
      let url = "";
      if (!this.validate) {
        url = `${_this.baseURL}ValidateCompany`;
      } else {
        url = `${_this.baseURL}ValidateForgotPassword`;
      }
      this.post({
        url: url,
        data: {
          code: _this.id,
          password: _this.password
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
        }
      });
    },
    clearForm() {
      this.confirmPassword = "";
      this.password = "";
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
