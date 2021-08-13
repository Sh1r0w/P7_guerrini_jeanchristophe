<template>
  <div class="container d-flex" v-if="revele" id="readingMessage">
    <div
      class="overlay"
      @click="
        selectOne();
        resetData();
        refreshMessage();
        endModifyMsg();
      "
    ></div>
    <div class="msgBox card p-2">
    <div class="msgBox card p-2 position-fixed overflow-auto">
      <div class="d-flex justify-content-between">
        <h2 class="d-flex" v-if="!showOn">{{ $store.state.msgId.title }}</h2>
        <div class="d-flex m-2" v-if="!showOn">
          <i @click="liked(1, 0)" class="fas fa-heart m-2 text-success"></i
          ><i
            @click="liked(0, 1)"
            class="fas fa-heart-broken m-2 text-danger"
          ></i>
        </div>
      </div>
      <div class="d-flex m-2" v-if="showOn">
        Nouveau Titre:
        <input
          type="text"
          :placeholder="$store.state.msgId.title"
          v-model="newTitle"
        />
      </div>
      <div id="txt" class="d-flex m-2" v-if="!showOn">
        {{ $store.state.msgId.message }}
      </div>
      <div class="d-flex m-2" v-if="showOn">
        Nouveau Message:
        <input
          type="textarea"
          :placeholder="$store.state.msgId.message"
          v-model="newMessage"
        />
      </div>
      <div v-if="testMsg" class="alert alert-danger">
        Caractére suivant interdit : <br />
        1=1 / $ / SELECT / FROM / UNION / OR
      </div>
      <img
        v-if="$store.state.msgId.imgUrl != null"
        :src="$store.state.msgId.imgUrl"
        :alt="$store.state.msgId.title"
        class="shadow"
      />

      <div v-if="showOn" class="d-flex m-2">
        Nouvelle Image :
        <label id="upload" for="uploadMsg" class="m-2"
          ><i class="fas fa-file-upload"></i> Ajouter un Fichier</label
        >
        <input
          class="d-none"
          name="uploadMsg"
          id="uploadMsg"
          type="file"
          ref="filename"
          @change="onChangeFileUploadNewMsg"
        />
      </div>
      <div v-if="!showOn" id="createdAt" class="text-muted">
        {{ $store.state.msgId.createddAt | moment("from", "D/M/Y HH:MM") }}
      </div>
      <i
        @click="allReponse()"
        v-if="!showOn"
        class="far fa-comments m-2 d-flex text-primary"
      >
        {{ $store.state.msgId.reponse }}
      </i>
      <div v-if="!showOn">
        Ecrire une réponse :
        <input class="w-100 h-50" type="textarea" v-model="response" /><br />
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
          @click="
            newResponse();
            allReponse();
          "
          class="btn btn-success m-2"
        >
          Envoyer
        </button>
      </div>
      <div id="adm" class="block-card">
        <button
          @click="modifyMsg"
          v-if="
            ($store.state.msgId.userId == $store.state.user.id && !showOn) ||
            ($store.state.user.moderator == 1 && !showOn)
          "
          class="btn btn-success m-2"
        >
          Modifier le message
        </button>
        <button
          @click="
            deleteMsg();
            selectOne();
            refreshMessage();
          "
          v-if="
            ($store.state.msgId.userId == $store.state.user.id && !showOn) ||
            ($store.state.user.moderator == 1 && !showOn)
          "
          class="btn btn-danger m-2"
        >
          Supprimer le message
        </button>
        <button
          @click="modifyValidMsg"
          v-if="
            ($store.state.msgId.userId == $store.state.user.id && showOn) ||
            ($store.state.user.moderator == 1 && showOn)
          "
          class="btn btn-success m-2"
        >
          Valider Modification
        </button>
        <button
          @click="endModifyMsg"
          v-if="
            ($store.state.msgId.userId == $store.state.user.id && showOn) ||
            ($store.state.user.moderator == 1 && showOn)
          "
          class="btn btn-danger m-2"
        >
          Annuler Modification
        </button>
      </div>
      <div v-if="!showOn">
        <div
          class="reponse card m-2 p-2"
          v-for="reponses in oldReponse"
          v-bind:key="reponses.id"
        >
          <i
            class="far fa-trash-alt m-2"
            v-if="
              reponses.userId == $store.state.user.id ||
              $store.state.user.moderator == 1
            "
            @click="
              deleteReponse(reponses.id);
              allReponse();
            "
            id="suppRep"
          ></i>
          <img :src="reponses.imgUrlReponse" />
          <div class="d-flex">{{ reponses.reponse }}</div>
          <div class="d-flex justify-content-end" v-if="!showOn">
            {{ reponses.alias }} {{ reponses.createdAt | moment("D/M/Y") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "readMsg",
  props: ["revele", "selectOne", "refreshMessage", "refreshLikes"],

  data() {
    return {
      response: "",
      filename: 0,
      oldReponse: "",
      userId: "",
      showOn: false,
      showOnButton: false,
      newTitle: "",
      newMessage: "",
      newImg: "",
    };
  },

  methods: {
    //chargement du fichier image
    onChangeFileUpload() {
      this.filename = this.$refs.filename.files[0];
    },

    //suppresion du message avec ces dépendances
    deleteMsg() {
      const r = confirm("Toutes supréssion du message sera definitive!");
      if (r == false) {
        console.log("ok");
      } else {
        axios
          .delete(
            "http://localhost:3000/message/deleteMsg/" +
              this.$store.state.msgId.id
          )
          .then(console.log("Message Supprimer"))
          .catch(console.log("No ok"));
      }
    },

    //ajout d'un nouveau message
    newResponse() {
      let formData = new FormData();
      formData.append("reponse", this.response);
      formData.append("images", this.filename);
      formData.append("alias", this.$store.state.user.alias);

      axios.post(
        "http://localhost:3000/reponse/" + this.$store.state.msgId.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    //affichage de la possibilité de modification du message
    modifyMsg() {
      this.showOn = !this.showOn;
    },

    //affichage des réponses
    allReponse() {
      axios
        .get("http://localhost:3000/reponse/id/" + this.$store.state.msgId.id)
        .then((response) => (this.oldReponse = response.data))
        .catch((error) => console.log(error));
    },

    //réinitialisation de l'affichage des réponses
    resetData() {
      this.oldReponse = " ";
    },

    //supprésion d'une réponse grace à sont id
    deleteReponse(id) {
      const r = confirm("Toutes supréssion de la réponse sera definitive!");
      if (r == false) {
        console.log("ok");
      } else {
        axios
          .delete("http://localhost:3000/reponse/deletereponse/" + id)
          .then(console.log("Message Supprimer"))
          .catch(console.log("No ok"));
      }
    },

    //annulation des modification
    endModifyMsg() {
      this.showOn = false;
    },

    //chargerment image pour la réponse
    onChangeFileUploadNewMsg() {
      this.filename = this.$refs.filename.files[0];
    },

    //validation de la modification du message
    modifyValidMsg() {
      if (!this.newTitle || !this.newMessage) {
        alert("Titre ou Texte non renseigner");
      } else {
        let formData = new FormData();
        formData.append("newTitle", this.newTitle);
        formData.append("newMsg", this.newMessage);
        formData.append("images", this.filename);

        axios
          .post(
            "http://localhost:3000/message/modifyMsg/" +
              this.$store.state.msgId.id,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((reponse) => console.log(reponse.data));
      }
    },

    //validation du like et du dislike
    liked(val1, val2) {
      axios.post(
        "http://localhost:3000/like/likeMessage/" + this.$store.state.msgId.id,
        {
          liked: val1,
          disliked: val2,
        }
      );
    },
  },
  computed: {
    //test des inputs avec regex
    testMsg() {
      let re = /SELECT|UNION|FROM|1=1|OR|\$/;
      return re.test(this.newTitle) || re.test(this.newMessage);
    },
  },
};
</script>

<style scoped>

.msgBox{
  top: 80px;
  max-height: 100%;
  
}
#readingMessage {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.adm {
  position: absolute;
  left: 10px;
  top: 0;
}

.overlay {
  position: fixed;
  background-color: rgba(241, 241, 241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.reponse {
  position: relative;
}

#suppRep {
  position: absolute;
  right: 10px;
  top: 4px;
}

.fa-trash-alt,
.fa-heart,
.fa-heart-broken,
.fa-comments {
  cursor: pointer;
}
</style>