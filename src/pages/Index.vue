<template>
  <q-page
    v-scroll="scrolled"
    :class="`fit ${$q.screen.gt.xs ? 'padding-top-100 q-px-md' : ''}`"
  >
    <div class="row justify-center">
      <div class="col-xs-12 col-md-3 q-px-md">
        <q-card class="text-white">
          <q-card-section :class="`bg-${theme}`">
            <div class="text-h6">Header</div>
            <div class="text-subtitle2">Sub header</div>
          </q-card-section>
          <q-card-section class="text-grey-6">
            Content
          </q-card-section>
        </q-card>
        <q-card class="text-white q-mt-lg">
          <q-card-section :class="`bg-${theme}`">
            <div class="text-h6">Header</div>
            <div class="text-subtitle2">Sub Header</div>
          </q-card-section>
          <q-card-section class="text-grey-6">
            Content
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-9 col-xs-12 order-first">
        <div class="row">
          <q-card class="full-width q-mb-md" flat bordered>
            <q-card-section>
              <div class=" q-mt-xs q-mb-xs">
                <span class="text-h6">
                  Cari Perusahaan :
                </span>

                <q-btn
                  class="float-right"
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded = !expanded"
                />
              </div>
            </q-card-section>

            <q-slide-transition>
              <div v-show="expanded" class="row q-pa-md">
                <div class="col-xs-12 col-md-4">
                  <q-input
                    class="q-pa-xs"
                    outlined
                    v-model="filterNamaPerusahaan"
                    label="Nama Perusahaan"
                    dense
                  />
                </div>
                <div class="col-xs-12 col-md-4">
                  <q-input
                    class="q-pa-xs"
                    dense
                    outlined
                    v-model="filterAlamat"
                    label="Alamat Perusahaan"
                  />
                </div>
                <div class="col-xs-12 col-md-4">
                  <q-input
                    class="q-pa-xs"
                    dense
                    outlined
                    v-model="filterProfil"
                    label="Profil Perusahaan"
                  />
                </div>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-xs-12 col-md-6 vertical-top">
                <span ref="q-page-home" class="text-h5"
                  >Perusahaan ({{ countData }})</span
                >
              </div>
              <div class="col-xs-6 col-md-3">
                <q-btn-dropdown
                  noCaps
                  flat
                  color="teal"
                  :label="
                    `SortBy: ${arrFindIndex(SortBy, SortBySelected).name}`
                  "
                >
                  <q-list>
                    <template v-for="(val, index) in SortBy">
                      <q-item
                        v-if="val.value != SortBySelected"
                        clickable
                        v-close-popup
                        :key="`sortBy${index}`"
                        @click="clickSortby(val.value)"
                      >
                        <q-item-section>
                          <q-item-label>{{ val.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <div class="col-xs-6 col-md-3">
                <q-btn-dropdown
                  flat
                  noCaps
                  color="teal"
                  :label="
                    `SortType: ${arrFindIndex(SortType, SortTypeSelected).name}`
                  "
                >
                  <q-list>
                    <template v-for="(val, index) in SortType">
                      <q-item
                        v-if="val.value != SortTypeSelected"
                        clickable
                        v-close-popup
                        :key="`sortType${index}`"
                        @click="clickSortType(val.value)"
                      >
                        <q-item-section>
                          <q-item-label>{{ val.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div
                class="col-12"
                v-for="(val, index) in data"
                :key="'company' + index"
              >
                <q-card
                  class="q-mb-md clickable"
                  @click="
                    role != 2
                      ? goToCompanyDetail(val.ID)
                      : goToCompanyAdd(val.ID)
                  "
                  bordered
                >
                  <q-card-section horizontal>
                    <q-img
                      class="col-3 heigth-150"
                      contain
                      :src="
                        val.img
                          ? serverURL + val.img.location
                          : 'statics/img/no-image.png'
                      "
                    />
                    <q-card-section class="full-width heigth-150 heigth-auto">
                      <div class="row full-height">
                        <div class="col-12">
                          <span class="text-body1 text-weight-bold">{{
                            val.nama_perusahaan
                          }}</span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon
                              :class="`text-${theme}`"
                              name="my_location"
                            />
                            {{ val.alamat_kantor }}
                          </span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon :class="`text-${theme}`" name="email" />
                            {{ val.email }}
                          </span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon
                              :class="`text-${theme}`"
                              name="local_phone"
                            />
                            {{ val.no_telp }}
                          </span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon
                              :class="
                                !val.validation_code
                                  ? `text-${theme}`
                                  : `text-red`
                              "
                              :name="!val.validation_code ? `check` : `clear`"
                            />
                            Alamat Email
                          </span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon
                              :class="
                                cekValidate2(val) ? `text-${theme}` : `text-red`
                              "
                              :name="cekValidate2(val) ? `check` : `clear`"
                            />
                            Nomor Telepon
                          </span>
                        </div>
                        <div class="col-12 col-md-4">
                          <span class="text-body1 text-grey-7 ellipsis">
                            <q-icon
                              :class="
                                val.isValid ? `text-${theme}` : `text-red`
                              "
                              :name="val.isValid ? `check` : `clear`"
                            />
                            Lokasi Kantor
                          </span>
                        </div>
                        <div
                          :class="
                            `col-12 ${
                              $q.screen.gt.xs ? 'self-end row justify-end' : ''
                            }`
                          "
                        >
                          <q-rating
                            v-model="val.rating"
                            size="2em"
                            color="orange"
                            icon="star_border"
                            icon-selected="star"
                            icon-half="star_half"
                            readonly
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div class="row justify-center q-mb-md q-mt-md">
              <q-pagination
                size="16px"
                v-model="pageNow"
                :max="maxPage"
                :max-pages="10"
                :direction-links="true"
                :color="theme"
              >
              </q-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
//import { scroll } from "quasar";
// import { mapMutations } from "vuex";
// import { mapState } from "vuex";
import { debounce } from "quasar";
import Vue from "vue";
export default {
  name: "PageIndex",
  data() {
    return {
      pageNow: 1,
      limit: 9,
      data: [],
      countData: 0,
      SortBy: [
        { name: "Nama", value: "nama_perusahaan" },
        { name: "Email", value: "email" },
        { name: "Tgl Buat", value: "Created" }
      ],
      SortBySelected: "nama_perusahaan",
      SortType: [{ name: "A-Z", value: "ASC" }, { name: "Z-A", value: "DESC" }],
      SortTypeSelected: "ASC",
      expanded: false,
      filterNamaPerusahaan: "",
      filterAlamat: "",
      filterProfil: "",
      serverURL: ""
    };
  },
  mixins: [Vue.prototype.$mixinStore],

  methods: {
    goToCompanyDetail(param) {
      this.$router.push("/view-company/" + param);
    },
    cekValidate2(param) {
      if (param.ktpID && param.siupID && param.npwpID) {
        return true;
      }
      return false;
    },
    goToCompanyAdd(param) {
      this.$router.push("/add-company/" + param);
    },
    loadDataCompany() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}loadDataCompany`,
        data: {
          token: this.token,
          key: this.key,
          pageNow: _this.pageNow,
          limit: _this.limit,
          sortBy: _this.SortBySelected,
          sortType: _this.SortTypeSelected,
          filter: {
            namaPerusahaan: _this.filterNamaPerusahaan,
            alamat: _this.filterAlamat,
            profil: _this.filterProfil
          }
        }
      }).then(values => {
        if (values.info == "success") {
          _this.data = values.data;
          _this.countData = values.countData;
          _this.serverURL = values.baseURL;
        } else {
          this.showNotif();
        }
      });
    },
    arrFindIndex(param, key) {
      return param.find(function(item) {
        return item.value == key;
      });
    },
    clickSortby(param) {
      this.SortBySelected = param;
      this.pageNow = 1;
      this.loadDataCompany();
    },
    clickSortType(param) {
      this.SortTypeSelected = param;
      this.pageNow = 1;
      this.loadDataCompany();
    }
  },
  watch: {
    filterNamaPerusahaan: function() {
      let _this = this;
      setTimeout(() => {
        _this.pageNow = 1;
        _this.loadDataCompany();
      }, 1000);
    },
    filterAlamat: function() {
      let _this = this;
      setTimeout(() => {
        _this.pageNow = 1;
        _this.loadDataCompany();
      }, 1000);
    },
    filterProfil: function() {
      let _this = this;
      setTimeout(() => {
        _this.pageNow = 1;
        _this.loadDataCompany();
      }, 1000);
    }
  },
  computed: {
    maxPage() {
      return this.countData / 9 + 1;
    }
  },
  mounted() {
    this.loadDataCompany();
  },
  created() {
    this.scrolled = debounce(this.scrolled, 0);
  }
};
</script>
<style lang="sass" scope>
.heigth-150
  max-height: 150px
.heigth-auto
  display: block
  overflow: auto
</style>
