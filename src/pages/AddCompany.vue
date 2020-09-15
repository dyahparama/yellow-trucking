<template>
  <q-page
    v-scroll="scrolled"
    :class="`fit ${$q.screen.gt.xs ? 'padding-top-100 zem-px-110' : ''}`"
  >
    <q-card flat bordered class="full-width">
      <q-card-section class="text-center">
        <div class="text-h6">
          {{ role == 2 ? `Data Company Baru` : `Edit Data Company` }}
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-form @submit="saveDataCompany()" class="q-gutter-md">
          <q-input
            v-model="namaPerusahaan"
            label="Nama Perusahaan *"
            hint="Nama Perusahaan anda"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Nama Perusahaan tidak boleh kosong'
            ]"
          />

          <q-field
            borderless
            label="Jenis Pelayanan*"
            stack-label
            v-model="jenisPelayanan"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Jenis pelayanan tidak boleh kosong'
            ]"
          >
            <template v-slot:control>
              <div
                v-for="(value, index) in optionJenisPelayanan"
                :key="'jenisPelayanan' + index"
                class="col-4 col-md-3"
              >
                <q-checkbox
                  v-model="jenisPelayanan"
                  :label="value.label"
                  :color="theme"
                  :val="value.value"
                />
              </div>
            </template>
          </q-field>

          <q-input
            v-model="alamatKantor"
            label="Alamat Kantor *"
            hint="Alamat Kantor anda"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Alamat Kantor tidak boleh kosong'
            ]"
          />
          <q-input
            v-model="nomorTelepon"
            label="Nomor Telp *"
            hint="Nomor Telp anda"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Nomor Telepon tidak boleh kosong'
            ]"
          />
          <q-input
            v-model="nomorHP"
            label="Nomor HP *"
            hint="Nomor HP anda"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Nomor Hp tidak boleh kosong'
            ]"
          />
          <q-input v-model="nomorFax" label="Nomor Fax" hint="Nomor Fax anda" />
          <q-input
            v-model="email"
            label="Email *"
            hint="Email perusahaan anda"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Email tidak boleh kosong'
            ]"
          />
          <div class="row">
            <div class="col-4">
              <span class="grey-umum q-pr-md">Upload Gambar Perusahaan :</span>
            </div>
            <div class="col-8">
              <q-uploader
                v-if="!img"
                accept=".jpg, image/*"
                label="Upload Gambar Perusahaan"
                class="full-width"
                ref="ImgCompany"
                :url="`${baseURL}uploadImgCompany`"
              />
              <q-img
                v-else
                :src="serverURL + img.location"
                style="width: 150px"
                :ratio="1"
                basic
                spinner-color="white"
                @mouseover="isHoverImg = true"
                @mouseleave="isHoverImg = false"
                class="rounded-borders"
              >
                <div v-if="isHoverImg" class="absolute-bottom text-center">
                  <q-btn
                    color="red"
                    icon="delete"
                    @click="showDelConfirm('ImgCompany')"
                  />
                </div>
              </q-img>
            </div>
          </div>
          <q-field v-if="id" borderless label="Alamat Kantor Valid" stack-label>
            <q-checkbox
              class="text-black"
              :true-value="1"
              :false-value="0"
              v-model="isValidKantor"
              label="Validasi"
              :color="theme"
            />
          </q-field>
          <template v-if="role == 1">
            <div class="row">
              <div class="col-4">
                <span class="grey-umum q-pr-md"
                  >Upload KTP Pemilik Usaha :</span
                >
              </div>
              <div class="col-8">
                <q-uploader
                  v-if="!ktp"
                  accept=".jpg, image/*"
                  label="Upload KTP"
                  class="full-width"
                  ref="KTP"
                  :url="`${baseURL}uploadKTP`"
                />
                <q-img
                  v-else
                  :src="serverURL + ktp.location"
                  style="width: 150px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  @mouseover="isHoverKTP = true"
                  @mouseleave="isHoverKTP = false"
                  class="rounded-borders"
                >
                  <div v-if="isHoverKTP" class="absolute-bottom text-center">
                    <q-btn
                      color="red"
                      icon="delete"
                      @click="showDelConfirm('KTP')"
                    />
                  </div>
                </q-img>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <span class="grey-umum q-pr-md">Upload NPWP :</span>
              </div>
              <div class="col-8">
                <q-uploader
                  v-if="!npwp"
                  accept=".jpg, image/*"
                  label="Upload NPWP"
                  class="full-width"
                  :url="`${baseURL}uploadNPWP`"
                  ref="NPWP"
                />
                <q-img
                  v-else
                  :src="serverURL + npwp.location"
                  style="width: 150px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @mouseover="isHoverNPWP = true"
                  @mouseleave="isHoverNPWP = false"
                >
                  <div v-if="isHoverNPWP" class="absolute-bottom text-center">
                    <q-btn
                      color="red"
                      icon="delete"
                      @click="showDelConfirm('NPWP')"
                    />
                  </div>
                </q-img>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <span class="grey-umum q-pr-md">Upload Siup/AL :</span>
              </div>
              <div class="col-8">
                <q-uploader
                  v-if="!siup"
                  accept=".jpg, image/*"
                  label="Upload Siup/AL"
                  class="full-width"
                  :url="`${baseURL}uploadSIUP`"
                  ref="SIUP"
                />
                <q-img
                  v-else
                  :src="serverURL + siup.location"
                  style="width: 150px"
                  :ratio="1"
                  basic
                  spinner-color="white"
                  class="rounded-borders"
                  @mouseover="isHoverSIUP = true"
                  @mouseleave="isHoverSIUP = false"
                >
                  <div v-if="isHoverSIUP" class="absolute-bottom text-center">
                    <q-btn
                      color="red"
                      icon="delete"
                      @click="showDelConfirm('SIUP')"
                    />
                  </div>
                </q-img>
              </div>
            </div>
            <q-input
              v-model="companyProfile"
              label="Company Profile"
              hint="Deskripsi perusahaan anda"
              type="textarea"
            />
            <q-input
              v-model="portofolio"
              label="Portofolio"
              hint="Portofolio perusahaan anda"
              type="textarea"
            />
            <div
              class="row"
              v-for="(value, index) in rute"
              :key="'rute' + index"
            >
              <template v-if="rute.length - 1 == index">
                <div class="col-10">
                  <q-input
                    v-model="value.value"
                    :label="'Rute Pelayanan ' + (index + 1)"
                    hint="Rute Pelayanan perusahaan anda"
                  />
                </div>
                <div class="col-2 text-center">
                  <q-btn
                    @click="addRute()"
                    round
                    :color="theme"
                    icon="add_circle"
                  />
                  <q-btn
                    v-if="index"
                    @click="removeRute(index)"
                    round
                    color="red"
                    icon="remove_circle"
                  />
                </div>
              </template>
              <template v-else>
                <div class="col-10">
                  <q-input
                    v-model="value.value"
                    :label="'Rute Pelayanan ' + (index + 1)"
                    hint="Rute Pelayanan perusahaan anda"
                  />
                </div>
                <div class="col-2 text-center">
                  <q-btn
                    @click="removeRute(index)"
                    round
                    color="red"
                    icon="remove_circle"
                  />
                </div>
              </template>
            </div>
          </template>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="confirmDelImg" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">Apakah anda yakin akan menghapus data?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            @click="deleteImg"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Vue from "vue";
export default {
  name: "AddCompany",
  mixins: [Vue.prototype.$mixinStore],
  props: ["id"],
  data() {
    return {
      optionJenisPelayanan: [
        {
          label: "Option 1",
          value: "op1"
        },
        {
          label: "Option 2",
          value: "op2"
        },
        {
          label: "Option 3",
          value: "op3"
        }
      ],
      namaPerusahaan: "",
      jenisPelayanan: [],
      alamatKantor: "",
      nomorTelepon: "",
      nomorHP: "",
      nomorFax: "",
      email: "",
      companyProfile: "",
      portofolio: "",
      counterRute: 1,
      rute: [{ value: "" }],
      ktp: "",
      npwp: "",
      siup: "",
      img: "",
      serverURL: "",
      isHoverKTP: false,
      isHoverNPWP: false,
      isHoverSIUP: false,
      isHoverImg: false,
      confirmDelImg: false,
      whatDialog: "",
      isValidKantor: 0
    };
  },
  watch: {
    $route() {
      this.resetData();
      if (this.id) {
        this.loadDataJenisPelayanan();
      }
    }
  },
  methods: {
    showNotif() {
      this.$q.notify({
        message: "Gagal Saat Request",
        color: "red",
        position: "top"
      });
    },
    resetData() {
      this.namaPerusahaan = "";
      this.jenisPelayanan = [];
      this.alamatKantor = "";
      this.nomorTelepon = "";
      this.nomorHP = "";
      this.nomorFax = "";
      this.email = "";
      this.companyProfile = "";
      this.portofolio = "";
      this.counterRute = 1;
      this.rute = [{ value: "" }];
      this.ktp = "";
      this.npwp = "";
      this.siup = "";
      this.img = "";
      this.serverURL = "";
      this.isHoverKTP = false;
      this.isHoverNPWP = false;
      this.isHoverSIUP = false;
      this.isHoverImg = false;
      this.confirmDelImg = false;
      this.whatDialog = "";
      this.isValidKantor = 0;
    },
    addRute() {
      this.rute.push({ value: "" });
    },
    removeRute(param) {
      this.rute.splice(param, 1);
    },
    loadDataJenisPelayanan() {
      let _this = this;
      this.post({
        url: `${_this.baseURL}loadDataJenisPelayanan`,
        data: {
          token: this.token,
          key: this.key
        }
      }).then(values => {
        if (values.info == "success") {
          this.optionJenisPelayanan = [];
          const data = values.data;
          if (this.role == 1) {
            this.loadDataCompanyByID();
          }
          if (this.id) {
            this.loadDataCompanyByID();
          }
          data.forEach(element => {
            this.optionJenisPelayanan.push({
              label: element.nama,
              value: element.ID
            });
          });
        } else {
          this.showNotif();
        }
      });
    },
    loadDataCompanyByID() {
      let _this = this;
      let data = {
        token: this.token,
        key: this.key
      };
      if (this.id) {
        data.id = this.id;
      }
      this.post({
        url: `${_this.baseURL}loadDataCompanyByID`,
        data: data
      }).then(values => {
        if (values.info == "success") {
          this.ktp = "";
          this.npwp = "";
          this.siup = "";
          this.img = "";
          const data = values.data;
          _this.serverURL = values.url;
          if (data.nama_perusahaan) {
            _this.namaPerusahaan = data.nama_perusahaan;
          }
          if (data.alamat_kantor) {
            _this.alamatKantor = data.alamat_kantor;
          }
          if (data.jenisPelayanan) {
            _this.jenisPelayanan = data.jenisPelayanan;
          }
          if (data.no_telp) {
            _this.nomorTelepon = data.no_telp;
          }
          if (data.no_wa) {
            _this.nomorHP = data.no_wa;
          }
          if (data.no_fax) {
            _this.nomorFax = data.no_fax;
          }
          if (data.email) {
            _this.email = data.email;
          }
          if (data.company_profile) {
            _this.companyProfile = data.company_profile;
          }
          if (data.portofolio) {
            _this.portofolio = data.portofolio;
          }
          if (data.rute) {
            _this.counterRute = data.rute.length;
            _this.rute = data.rute;
          }
          if (data.ktp) {
            _this.ktp = data.ktp;
          }
          if (data.img) {
            _this.img = data.img;
          }
          if (data.npwp) {
            _this.npwp = data.npwp;
          }
          if (data.siup) {
            _this.siup = data.siup;
          }
          if (data.isValid) {
            _this.isValidKantor = data.isValid;
          }
        } else {
          this.showNotif();
        }
      });
    },
    deleteImg() {
      let _this = this;
      let id;
      switch (this.whatDialog) {
        case "KTP":
          id = this.ktp.ID;
          break;
        case "NPWP":
          id = this.npwp.ID;
          break;
        case "SIUP":
          id = this.siup.ID;
          break;
        case "ImgCompany":
          id = this.img.ID;
          break;
        default:
          break;
      }
      this.post({
        url: `${_this.baseURL}delete${_this.whatDialog}`,
        data: {
          token: this.token,
          key: this.key,
          id: id
        }
      }).then(values => {
        if (values.info == "success") {
          this.loadDataCompanyByID();
        } else {
          this.showNotif();
        }
      });
    },
    showDelConfirm(param) {
      this.confirmDelImg = true;
      this.whatDialog = param;
    },
    saveDataCompany() {
      let _this = this;
      let formData = new FormData();
      if (this.$refs.ImgCompany) {
        if (this.$refs.ImgCompany.files[0]) {
          formData.append("ImgCompany", this.$refs.ImgCompany.files[0]);
        }
      }
      if (this.role == 1) {
        if (this.$refs.NPWP) {
          if (this.$refs.NPWP.files[0]) {
            formData.append("NPWP", this.$refs.NPWP.files[0]);
          }
        }
        if (this.$refs.KTP) {
          if (this.$refs.KTP.files[0] && this.$refs.KTP) {
            formData.append("KTP", this.$refs.KTP.files[0]);
          }
        }
        if (this.$refs.SIUP) {
          if (this.$refs.SIUP.files[0] && this.$refs.SIUP) {
            formData.append("SIUP", this.$refs.SIUP.files[0]);
          }
        }
      }
      formData.append("token", this.token);
      if (this.id) {
        formData.append("isEdit", 1);
        formData.append("id", this.id);
      } else {
        formData.append("isEdit", 0);
      }
      formData.append(
        "clientURL",
        window.location.origin +
          window.location.pathname +
          "#/validate-account/"
      );
      formData.append(
        "data",
        JSON.stringify({
          namaPerusahaan: _this.namaPerusahaan,
          jenisPelayanan: _this.jenisPelayanan,
          alamatKantor: _this.alamatKantor,
          nomorTelepon: _this.nomorTelepon,
          nomorHP: _this.nomorHP,
          nomorFax: _this.nomorFax,
          email: _this.email,
          companyProfile: _this.companyProfile,
          rute: _this.rute,
          portofolio: _this.portofolio,
          isValid: _this.isValidKantor
        })
      );
      this.post({
        url: `${_this.baseURL}saveDataCompany`,
        formData: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(values => {
        if (values.info == "success") {
          if (this.role == 2) {
            this.$router.push("/home");
          } else {
            this.loadDataCompanyByID();
          }
        } else {
          this.showNotif();
        }
      });
    }
  },
  mounted() {
    this.loadDataJenisPelayanan();
  }
};
</script>
<style lang="sass" scoped>
.zem-px-110
  padding-left: 110px
  padding-right: 110px
.grey-umum
  font-weight: 400
  color: rgba(0, 0, 0, 0.6)
  font-size: 16px
</style>
