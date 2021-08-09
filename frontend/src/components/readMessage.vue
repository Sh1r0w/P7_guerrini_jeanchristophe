<template>
  <div
    class="container position-fixed d-flex overflow-auto"
    v-if="revele"
    id="readingMessage"
  >
    
    <div class="overlay" @click="selectOne(); resetData();"></div>
    <div class="msgBox card p-2">
      <div class="d-flex justify-content-between">
      <h2  class="d-flex" v-if="!showOn">{{ $store.state.msgId.title }}</h2>
      <div class="d-flex m-2 " v-if="!showOn"><i @click="liked(1,0)" class="far fa-heart m-2"></i><i @click="liked(0,1)" class="fas fa-heart-broken m-2"></i></div>
      </div>
      <div class="d-flex m-2" v-if="showOn">
        Nouveau Titre: <input type="text" :placeholder="$store.state.msgId.title" v-model="newTitle" />
      </div>
      <div id="txt" class="d-flex m-2" v-if="!showOn">
        {{ $store.state.msgId.message }}
      </div>
      <div class="d-flex m-2" v-if="showOn">
        Nouveau Message: <input type="textarea" :placeholder="$store.state.msgId.message" v-model="newMessage" />
      </div>
      <img
        v-if="$store.state.msgId.imgUrl != null"
        :src="$store.state.msgId.imgUrl"
        :alt="$store.state.msgId.title"
        class="shadow"
      />
      <div v-if="showOn" class="d-flex m-2">
        Nouvelle Image :
        <input type="file" ref="filename" @change="onChangeFileUploadNewMsg" />
      </div>
      <div v-if="!showOn" id="createdAt" class="text-muted">
        {{ $store.state.msgId.updatedAt }}
      </div>
      <div v-if="!showOn">
        Votre réponse :
        <input type="text" v-model="response" /><br/>
        <input type="file" ref="filename" @change="onChangeFileUpload" />
        <button @click="newResponse" class="btn btn-success m-2">
          Envoyer
        </button>
      </div>
      <button @click="allReponse" class="btn-success m-2" v-if="!showOn">
        Voir les réponses
      </button>
      <div
        class="reponse card m-2 p-2"
        v-for="reponses in oldReponse"
        v-bind:key="reponses.id"
      >
        <div
          v-if="
            reponses.userId == $store.state.user.id ||
            $store.state.user.moderator == 1
          "
          @click="deleteReponse(reponses.id)"
          id="suppRep"
          class="btn btn-danger btn-sm"
        >
          X
        </div>
        <img :src="reponses.imgUrlReponse" />
        {{ reponses.reponse }} {{ reponses.createdAt }}
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
          @click="deleteMsg"
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
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "readMsg",
  props: ["revele", "selectOne"],

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
      Like: "",
    };
  },

  methods: {
    onChangeFileUpload() {
      this.filename = this.$refs.filename.files[0];
    },
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
    newResponse() {
      let formData = new FormData();
      formData.append("reponse", this.response);
      formData.append("images", this.filename);

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
    modifyMsg() {
      this.showOn = !this.showOn;
    },

    allReponse() {
      axios
        .get("http://localhost:3000/reponse/id/" + this.$store.state.msgId.id)
        .then((response) => (this.oldReponse = response.data))
        .catch((error) => console.log(error))
    },

    resetData() {
      this.oldReponse = " ";
    },

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

    endModifyMsg() {
      this.showOn = !this.showOn;
    },

    onChangeFileUploadNewMsg() {
      this.filename = this.$refs.filename.files[0];
    },
    modifyValidMsg() {
      if (!this.newTitle || !this.newMessage) {
        alert("Titre ou Texte non renseigner");
      } else {
        let formData = new FormData();
        formData.append("newTitle", this.newTitle);
        formData.append("newMsg", this.newMessage);
        formData.append("images", this.filename);

        axios
          .post("http://localhost:3000/message/modifyMsg/" +
              this.$store.state.msgId.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((reponse) => console.log(reponse.data));
      }
    },
    liked(val1, val2){
      console.log(this.Like.MessageId == this.$store.state.msgId.id)
      axios
      .post("http://localhost:3000/like/likeMessage/" + this.$store.state.msgId.id, {
      liked: val1,
      disliked: val2,
      })
      .then(console.log('Liked'));
      axios
    .get("http://localhost:3000/like")
    .then((reponse) =>(this.Like = reponse.data))
    .catch((error) => console.log(error))
      
    }
  },
};
</script>

<style scoped>
#readingMessage {
  top: 20px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
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
</style>