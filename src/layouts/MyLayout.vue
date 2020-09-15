<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <q-header v-show="header" :elevated="false" :class="`bg-${theme}`">
        <q-toolbar :class="subHeader ? 'hg-82' : ''">
          <q-btn flat round dense icon="home" to="/home" />

          <q-space />
          <q-btn
            v-if="role == 1 || role == 2"
            flat
            color="white"
            to="/add-company"
            :label="role == 2 ? `Tambah Company` : `Profil Company`"
          />
          <!-- <q-btn flat color="white" label="Sayang" />

          <q-btn-dropdown flat color="white" label="Kamu">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->
          <q-space />
          <!-- <q-btn flat round dense icon="search" /> -->
          <q-btn v-if="token" @click="logOut" flat dense label="Logout" />
          <q-btn v-else @click="logOut" flat dense label="Login" />
        </q-toolbar>

        <q-toolbar inset v-show="subHeader" class="bg-grey-3">
          <!-- <q-breadcrumbs
            class="text-grey-6"
            active-color="text-primary"
            style="font-size: 16px"
          >
            <q-breadcrumbs-el label="Home" icon="home" />
          </q-breadcrumbs> -->
        </q-toolbar>
      </q-header>
    </transition>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import Vue from "vue";
export default {
  name: "MyLayout",
  mixins: [Vue.prototype.$mixinStore],
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {},
  methods: {
    logOut() {
      this.setIdentity({
        token: "",
        key: ""
      });
      this.$q.localStorage.remove("identity");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="sass" scoped>
.hg-82
  height: 82px;
</style>
