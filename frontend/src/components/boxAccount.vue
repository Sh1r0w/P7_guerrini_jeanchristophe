<template>
  <div class="boxAccount">
    <div
      class="
        col-lg-2 col-md-6 col-xs-2
        littleBox
        container
        p-lg-2
        position-fixed
      "
    >
      <div>
        <b-dropdown id="dropdown" text="Menu" variant="success" class="m-md-2">
          <b-dropdown-item
            @click="
              selectUser();
              toggleAccount();
            "
            >Mon Compte</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="canceled">Déconnection</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="pageAccount" v-if="revele">
      <div
        class="overlay"
        @click="
          toggleAccount();
          refreshMessage();
        "
      ></div>
      <div class="card showAccount p-2">
        <h2>Mon Compte</h2>
        <button
          id="clos"
          class="btn btn-danger"
          @click="
            toggleAccount();
            refreshMessage();
          "
        >
          X
        </button>
        <div
          v-if="!showOnAcc"
          class="class card p-2 d-flex justify-content-between"
        >
          Vos informations :<br />
          Votre pseudo : {{ this.alias }}<br />
          Votre nom : {{ this.lastName }}<br />
          Votre Prénom : {{ this.firstName }} <br />
          Votre Adresse Mail : {{ this.email }}<br />
        </div>
        <div
          v-if="showOnAcc"
          class="class card p-2 d-flex justify-content-between"
        >
         Votre Pseudo:
          <input
            type="text"
            v-model="alias"
            v-bind:class="{ 'form-control is-valid': testAlias }"
          /><br />

          Votre Adresse Mail:<input
            type="text"
            v-model="email"
            v-bind:class="{ 'form-control is-valid': testMail }"
          /><br />

          Votre Nom:
          <input
            type="text"
            v-model="lastName"
            v-bind:class="{ 'form-control is-valid': testLastName }"
          /><br />

          Votre Prénom:
          <input
            type="text"
            v-model="firstName"
            v-bind:class="{ 'form-control is-valid': testFirstName }"
          /><br />

          Modifier votre mot de passe:<br />

          Mot de passe actuiel :
          <input
            type="password"
            v-model="password"
            v-bind:class="{ 'form-control is-valid': testPasswordVerif }"
          /><br />

          Nouveau Mot de passe :
          <input
            type="password"
            v-model="newPassword"
            v-bind:class="{ 'form-control is-valid': testPasswordVerif }"
          />

          Vérification Nouveau Mot de passe :
          <input
            type="password"
            v-model="newSecondPassword"
            v-bind:class="{ 'form-control is-valid': testPasswordVerif }"
          />
        </div>
        <button
          v-if="!showOnAcc"
          @click="showModifyAcc"
          class="btn btn-success m-2"
        >
          Modifier votre Compte
        </button>
        <button
          v-if="!showOnAcc"
          @click="deleteAccount"
          class="btn btn-danger m-2"
        >
          Supprimer son compte
        </button>
        <button
          v-if="showOnAcc"
          @click="
            validModifyAcc();
            showModifyAcc();
            refreshMessage();
          "
          class="btn btn-success m-2"
        >
          Valider Modification
        </button>
        <button
          v-if="showOnAcc"
          @click="showModifyAcc"
          class="btn btn-danger m-2"
        >
          Annuler Modification
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "boxAcc",
  props: ["refreshMessage"],
  data() {
    return {
      showOnAcc: false,
      password: "",
      newPassword: "",
      newSecondPassword: "",
      revele: false,
      id: "",
      lastName: "",
      firstName: "",
      email: "",
      alias: "",
    };
  },
  methods: {
    //deconnection avec suppresion de la localStorage et renvoi à la connection
    canceled() {
      localStorage.clear() & this.$router.push("/");
    },

    //Selection de l'utilisateur avec decryptage du nom et prénom
    selectUser() {
      axios
        .get("http://localhost:3000/user")
        .then((reponse) => {
          this.firstName = this.CryptoJS.AES.decrypt(
            reponse.data.firstName,
            process.env.VUE_APP_CRYPTO
          ).toString(this.CryptoJS.enc.Utf8);
          this.lastName = this.CryptoJS.AES.decrypt(
            reponse.data.lastName,
            process.env.VUE_APP_CRYPTO
          ).toString(this.CryptoJS.enc.Utf8);
          this.alias = this.CryptoJS.AES.decrypt(
            reponse.data.alias,
            process.env.VUE_APP_CRYPTO
          ).toString(this.CryptoJS.enc.Utf8);
          this.email = reponse.data.email;
          this.id = reponse.data.id;
        })
        .catch((error) => console.log(error));
    },

    // affichage de la modal Account
    toggleAccount: function () {
      this.revele = !this.revele;
    },

    //Suppression du compte
    deleteAccount: function () {
      const r = confirm("Suppression");
      if (r == false) {
        this.revele = !this.revele;
      } else {
        axios
          .post("http://localhost:3000/deleteUser")
          .then(this.$router.push("/") && sessionStorage.clear());
      }
    },

    //affichage de la possibilité de modification
    showModifyAcc() {
      this.showOnAcc = !this.showOnAcc;
    },

    //Validation de la modification
    validModifyAcc() {
      if (this.password && this.newPassword != this.newSecondPassword) {
        console.log("probleme password" + this.password);
      } else if (
        (this.password == "" && this.newPassword == this.newSecondPassword) ||
        (this.password == "" && this.newPassword != this.newSecondPassword)
      ) {
        axios
          .post("http://localhost:3000/modifyUser", {
            alias: this.alias,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          })
          .then(
            (reponse) =>
              console.log(reponse.data) & (this.showOnAcc = !this.showOnAcc)
          )
          .catch((error) => console.log({ error }));
      } else {
        axios
          .post("http://localhost:3000/modifyUser", {
            alias: this.alias,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            newPassword: this.newPassword,
          })
          .then(
            (reponse) =>
              console.log(reponse.data) & (this.showOnAcc = !this.showOnAcc)
          );
      }
    },
  },

  computed: {
    //test avec regex pour modification
    testAlias() {
      let re = /^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      return re.test(this.alias);
    },

    testFirstName() {
      let re = /^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      return re.test(this.firstName);
    },

    testLastName() {
      let re = /^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim;
      return re.test(this.lastName);
    },

    testMail() {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },

    testPassword() {
      let re =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
      return (
        re.test(this.password) && this.password == this.passwordVerification
      );
    },

    testPasswordVerif() {
      let re =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
      return (
        re.test(this.passwordVerification) &&
        this.password == this.passwordVerification
      );
    },
  },
};
</script>

<style scoped>
.littleBox {
  top: 10px;
  right: 10px;
}
.pageAccount {
  position: fixed;
  background-color: rgba(241, 241, 241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  box-shadow: 10px 5px 5px grey;
}

.overlay {
  position: fixed;
  background-color: rgba(241, 241, 241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

#clos {
  position: absolute;
  right: 10px;
}
</style>