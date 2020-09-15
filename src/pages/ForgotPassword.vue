<template>
  <q-page class="flex flex-center">
    <div style="width:80%">
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
                    hint="Masukan alamat email yang akan direset password"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please input Email'
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
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      email: ""
    };
  },
  methods: {
    goToForgotPassword() {
      this.$router.push("/forgot-password/");
    },
    onSubmit() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}forgotPassword`,
        data: {
          email: this.email,
          clientURL: window.location.origin + "/#/validate-password/"
        }
      }).then(values => {
        if (values.info == "success") {
          this.showNotif("Cek inbox email untuk ubah password", "green");
          this.$router.push("/login");
        } else if (values.message) {
          this.showNotif(values.message);
        } else {
          this.showNotif();
        }
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
</style>
