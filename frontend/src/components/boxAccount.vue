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
        <div v-if="!showOnAcc" class="class card p-2 d-flex justify-content-between">
        Vos informations :<br/>
        Votre nom :  {{ this.lastName }}<br/>
        Votre Prénom : {{ this.firstName }} <br/>
        Votre Adresse Mail : {{ this.email }}<br/>
        </div>
        <div v-if="showOnAcc" class="class card p-2 d-flex justify-content-between">
        Votre Adresse Mail:<input type="text" v-model="email"/><br />
        
        Votre Nom: <input type="text" v-model="lastName"/><br />
        
        Votre Prénom: <input type="text" v-model="firstName"/><br />

        Modifier votre mot de passe:<br />

        Mot de passe actuiel : <input type="password" v-model="password"/><br />

        Nouveau Mot de passe : <input type="password" v-model="newPassword">

        Vérification Nouveau Mot de passe : <input type="password" v-model="newSecondPassword">

        </div>
        <button v-if="!showOnAcc" @click="showModifyAcc" class="btn btn-success m-2">Modifier votre Compte</button>
        <button v-if="!showOnAcc" @click="deleteAccount" class="btn btn-danger m-2">Supprimer son compte</button>
        <button v-if="showOnAcc" @click="validModifyAcc(); showModifyAcc()" class="btn btn-success m-2">Valider Modification</button>
        <button v-if="showOnAcc" @click="showModifyAcc" class="btn btn-danger m-2">Annuler Modification</button>
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
        showOnAcc: false,
        password: "",
        newPassword: "",
        newSecondPassword: "",
        revele: false,
        id:"",
        lastName: "",
        firstName: "",
        email: "",
        
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
          (reponse) => {
            this.firstName = this.CryptoJS.AES.decrypt( reponse.data.firstName, process.env.VUE_APP_CRYPTO ).toString(this.CryptoJS.enc.Utf8)
            this.lastName = this.CryptoJS.AES.decrypt( reponse.data.lastName, process.env.VUE_APP_CRYPTO ).toString(this.CryptoJS.enc.Utf8)
            this.email = reponse.data.email
            this.id = reponse.data.id
            }
        )
        .catch((error) => console.log(error));
    },
    toggleAccount: function () {
      this.revele = !this.revele
    },

    deleteAccount: function () {
      const r = confirm("Suppression");
      if (r == false) {
        this.revele = !this.revele
      } else {
        axios.post('http://localhost:3000/deleteUser')
        .then(this.$router.push('/') && sessionStorage.clear())
      }
    },
    showModifyAcc(){
      this.showOnAcc = !this.showOnAcc
      console.log(this.lastName)
    },
    validModifyAcc(){
          if(this.password && this.newPassword != this.newSecondPassword ){
              console.log('probleme password' + this.password)
          }else if (this.password == "" && this.newPassword == this.newSecondPassword || this.password == "" && this.newPassword != this.newSecondPassword){
            let formData = new FormData();
                formData.append("firstName", this.firstName);
                formData.append("lastName", this.lastName);
                formData.append("email", this.email);
                
          axios.post('http://localhost:3000/modifyUser/' + this.id, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((reponse) => console.log(reponse.data) & console.log(this.email));
          }else {
            let formData = new FormData();
                formData.append("firstName", this.firstName);
                formData.append("lastName", this.lastName);
                formData.append("email", this.email);
                formData.append("password", this.password);
                formData.append("newPassword", this.newPassword);
                
          axios.post('http://localhost:3000/modifyUser/' + this.id, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((reponse) => console.log(reponse.data) & console.log(this.email));
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