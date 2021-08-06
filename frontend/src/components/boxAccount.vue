<template>
  <div class="boxAccount" >
    

    <div class="col-lg-2 col-md-6 col-xs-2 littleBox container p-lg-2 position-fixed">
      <div>
  <b-dropdown id="dropdown" text="Menu" variant="success" class="m-md-2">
    <b-dropdown-item @click="selectUser(); toggleAccount();">Mon Compte</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item @click="canceled" >Déconnection</b-dropdown-item>
  </b-dropdown>
</div>
    </div>
    <div class="pageAccount" v-if="revele">
      <div class="overlay " @click="toggleAccount" > </div>
      <div class="card showAccount p-2">
        <h2>Mon Compte</h2>
        <button id="clos" class="btn btn-danger" @click="toggleAccount">X</button>
        <div class="class card p-2 d-flex justify-content-between" v-for="user in userEncrypted" v-bind:key="user.id">
        Vos informations :<br/>
        Votre nom : {{ user.lastName }} <br/>
        Votre Prénom : {{ user.firstName }} <br/>
        Votre Adresse Mail :{{ user.email }} <br/>
        </div>
        Votre Adresse Mail:<input type="text"/><br />
        
        Votre Nom: <input type="text" /><br />
        
        Votre Prénom: <input type="text" /><br />
        Modifié votre mot de passe:
        <button @click="toggleAccount" class="btn btn-success">Valider</button><br />
        <button @click="deleteAccount" class="btn btn-danger">Supprimer son compte</button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "boxAcc",
  data(){
      return{
        revele: false,
        lastName: "",
        firstName: "",
        userEncrypted: "",
      }
  },
  methods: {
    myAccount() {
      console.log("My Account");
    },
    canceled() {
      sessionStorage.clear() & this.$router.push('/');
    },
        selectUser(){
      axios
        .get("http://localhost:3000/user")
        .then(
          (reponse) =>
            this.userEncrypted = this.CryptoJS.AES.decrypt( reponse.data, process.env.VUE_APP_CRYPTO ).toString(this.CryptoJS.enc.Utf8) &
            console.log("commit ok" + this.userEncrypted) 
        )
        .catch((error) => console.log(error));
    },
    decryptUser(){
      const decryptedFirstName = this.CryptoJS.AES.decrypt( this.$userEncrypted.firstName, process.env.VUE_APP_CRYPTO ).toString(this.CryptoJS.enc.Utf8)
      const decryptedlastName = this.CryptoJS.AES.decrypt( this.$userEncrypted.lastName, process.env.VUE_APP_CRYPTO ).toString(this.CryptoJS.enc.Utf8)
      this.firstName = decryptedFirstName
      this.lastName = decryptedlastName
      
    },
    toggleAccount: function () {
      this.revele = !this.revele;
    },

    deleteAccount: function () {
      const r = confirm("Suppression");
      if (r == false) {
        this.revele = !this.revele
      } else {
        axios.post('http://localhost:3000/deleteUser')
        .then(this.$router.push('/') && sessionStorage.clear() & console.log('delete post'))
      }
    }
  }
  
};
</script>

<style scoped>
.littleBox {
  top: 10px;
  right: 10px;
}
.pageAccount {
  position: fixed;
  background-color: rgba(241,241,241, 0.5);
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
  background-color: rgba(241,241,241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

}

#clos{
position: absolute;
right: 10px;
}
</style>