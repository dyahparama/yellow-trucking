<template>
  <q-page v-scroll="scrolled" class="fit">
    <q-card class="full-width ">
      <q-card-section>
        <div class="row">
          <div class="col-4">
            <q-img
              src="https://placeimg.com/500/300/nature"
              spinner-color="primary"
              spinner-size="82px"
              contain
              class="heigth-150"
            />
          </div>
          <div class="col-8">
            <div class="column q-pl-xs">
              <span :class="`text-h6 text-bold text-${theme}`"
                >{{ data.nama_perusahaan }}
              </span>
              <span class="text-subtitle1">
                <q-icon :class="`text-${theme}`" name="my_location" />
                {{ data.alamat_kantor }}
              </span>
              <span class="text-subtitle1"
                ><q-icon :class="`text-${theme}`" name="local_phone" />
                {{ data.no_telp }}</span
              >
              <span class="text-subtitle1"
                ><q-icon :class="`text-${theme}`" name="email" />
                {{ data.email }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="row q-mt-xl q-pb-md">
      <div class="col-12 col-md-8 row justify-center q-px-md">
        <q-card class="my-card q-mb-md full-width">
          <q-card-section>
            <span class="text-h6 text-bold"> Detail Bisnis :</span>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p class="text-body1">
              {{ data.company_profile }}
            </p>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mb-md full-width">
          <q-card-section>
            <span class="text-h6 text-bold"> Ulasan :</span>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <template v-if="dataReview.length">
              <q-list bordered>
                <q-item v-for="(val, index) in dataReview" :key="index">
                  <q-item-section top avatar>
                    <q-avatar :color="theme" text-color="white" icon="person" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="`text-${theme} text-bold`">{{
                      val.nama
                    }}</q-item-label>
                    <q-item-label caption>{{ val.email }}</q-item-label>
                    <q-item-label class="text-body2" lines="5">{{
                      val.komentar
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>{{
                      formatDateTime(val.Created)
                    }}</q-item-label>
                    <q-rating
                      v-model="val.rating"
                      size="2em"
                      color="orange"
                      readonly
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </template>
            <template v-else>
              <p class="text-body1 text-grey-7">
                Tidak ada ulasan
              </p>
            </template>
          </q-card-section>
        </q-card>
        <q-card class="my-card q-mb-md full-width">
          <q-card-section>
            <span class="text-h6 text-bold"> Berikan Ulasan :</span>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-form @submit="saveReview()" class="q-gutter-md">
              <div class="row">
                <div class="col-6 q-pa-md">
                  <q-input
                    type="text"
                    label="Nama"
                    v-model="modelFeedback.nama"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Nama tidak boleh kosong'
                    ]"
                  />
                </div>
                <div class="col-6 q-pa-md">
                  <q-input
                    type="text"
                    label="Email"
                    v-model="modelFeedback.email"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Email tidak boleh kosong'
                    ]"
                  />
                </div>
                <div class="col-6 q-pa-md">
                  <q-input
                    type="text"
                    label="No. Hp"
                    v-model="modelFeedback.no_telp"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'No. Telp tidak boleh kosong'
                    ]"
                  />
                </div>
                <div class="col-6 q-pa-md row justify-between">
                  <q-field
                    v-model="modelFeedback.rating"
                    borderless
                    label="Rating"
                    stack-label
                    lazy-rules
                    :rules="[val => val || 'Rating tidak boleh kosong']"
                  >
                    <q-rating
                      v-model="modelFeedback.rating"
                      size="2.5em"
                      color="orange"
                      icon="star"
                    />
                  </q-field>
                </div>
                <div class="col-12 q-pa-md">
                  <q-input
                    type="textarea"
                    label="Komentar"
                    v-model="modelFeedback.komentar"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Komentar tidak boleh kosong'
                    ]"
                  />
                </div>
                <div>
                  <q-btn label="Submit" type="submit" color="primary" />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-px-md">
        <div class="column">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-pb-md"></div>
  </q-page>
</template>

<script>
import Vue from "vue";
export default {
  mixins: [Vue.prototype.$mixinStore],
  props: ["id"],
  data() {
    return {
      data: [],
      serverURL: "",
      ratingModel: 3,
      modelFeedback: {
        nama: "",
        email: "",
        rating: 0,
        no_telp: "",
        komentar: ""
      },
      dataReview: []
    };
  },
  methods: {
    loadDataCompanyByID() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}loadDataCompanyByID`,
        data: {
          id: this.id
        }
      }).then(values => {
        if (values.info == "success") {
          this.data = values.data;
          _this.serverURL = values.url;
        } else {
          this.showNotif();
        }
      });
    },
    saveReview() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}saveReview`,
        data: {
          id: this.id,
          modelFeedback: this.modelFeedback
        }
      }).then(values => {
        if (values.info == "success") {
          this.showNotif("request berhasil", "green");
        } else {
          this.showNotif();
        }
      });
    },
    getReviewByCompanyID() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}getReviewByCompanyID`,
        data: {
          id: this.id
        }
      }).then(values => {
        if (values.info == "success") {
          this.dataReview = values.data;
        } else {
          this.showNotif();
        }
      });
    }
  },
  mounted() {
    this.loadDataCompanyByID();
    this.getReviewByCompanyID();
  }
  // name: 'PageName',
};
</script>
<style lang="sass" scoped>
.heigth-150
  height: 150px
</style>
