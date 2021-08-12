<template>
  <div class="blocMsg" v-if="revele">
    <div class="container overlay" @click="toggleNewMsg"></div>
    <div class="card msg">
      <h2>Nouveau Message</h2>
      Titre de votre Message :<input type="text" v-model="newTitle" /> <br />
      Votre Texte :<input type="textarea" v-model="newMsg" />
      <div v-if="testMsg" class="alert alert-danger">
        Caractére suivant interdit : <br />
        1=1 / $ / SELECT / FROM / UNION / OR
      </div>
      <label id="upload" for="uploadMsg" class="m-2"
        ><i class="fas fa-file-upload"></i> Ajouter un Fichier</label
      >
      <input
        class="d-none"
        name="uploadMsg"
        id="uploadMsg"
        type="file"
        ref="filename"
        @change="onChangeFileUpload"
      />
      <button
        @click.prevent="
          addNewMsg();
          toggleNewMsg();
          refreshMessage();
          resetData();
        "
        class="btn btn-success m-2"
      >
        Envoyé Message
      </button>
      <button
        @click="
          toggleNewMsg();
          refreshMessage();
        "
        class="btn btn-danger m-2"
      >
        Annulé
      </button>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "newMsg",
  props: ["revele", "toggleNewMsg", "refreshMessage"],

  data() {
    return {
      newTitle: "",
      newMsg: "",
      filename: "",
    };
  },
  methods: {
    //chargement image pour le nouveau message
    onChangeFileUpload() {
      this.filename = this.$refs.filename.files[0];
    },
    //ajout d'un nouveau message
    addNewMsg() {
      if (!this.newTitle || !this.newMsg) {
        alert("Titre ou Texte non renseigner");
      } else {
        let formData = new FormData();
        formData.append("newTitle", this.newTitle);
        formData.append("newMsg", this.newMsg);
        formData.append("images", this.filename);
        formData.append("firstName", this.$store.state.user.firstName);

        axios
          .post("http://localhost:3000/message/newMsg", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((reponse) => console.log(reponse.data));
      }
    },
    //réinitialisation des datas aprés envoi
    resetData() {
      setTimeout(() => {
        (this.newTitle = ""), (this.newMsg = ""), (this.filename = "");
      }, 1000);
    },
  },
  computed: {
    //test input après regex
    testMsg() {
      let re = /SELECT|UNION|FROM|1=1|OR|\$/;
      return re.test(this.newTitle) || re.test(this.newMsg);
    },
  },
};
</script>

<style scoped>
.blocMsg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(241, 241, 241, 0.5);
}

.overlay {
  background: rgba(0, 0, 0, 0, 5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.msg {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 10%;
  box-shadow: 10px 5px 5px grey;
}

#upload {
  cursor: pointer;
}
</style>