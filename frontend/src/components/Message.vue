<template>
  <div class="MessageHome">
    <h1>{{ msg }}</h1>
    <button @click="toggleNewMsg" class="d-flex ms-5 mb-5 btn btn-success">
      Nouveau Message
    </button>

    <div class="selectMsg d-flex justify-content-center">
      <div class="col-5 container border border-dark">
        {{ posts.title }}
        <h2>Message Recents</h2>
      </div>
      <div class="col-5 container border border-dark">
        <h2>Tout les messages</h2>
      </div>
    </div>
    <newMessage
      v-bind:revele="revele"
      v-bind:toggleNewMsg="toggleNewMsg"
    ></newMessage>
    <accountBox></accountBox>
  </div>
</template>

<script>
import newMsg from "@/components/postMsg.vue";
import boxAcc from "@/components/boxAccount.vue";

const axios = require("axios").default;
export default {
  name: "Post",
  components: {
    newMessage: newMsg,
    accountBox: boxAcc,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      posts: [],
      revele: false,
    };
  },
  methods: {
    newMessage() {
      axios
        .get("http://localhost:3000/message")
        .then((reponse) => (this.posts = reponse.data))
        .catch((error) => console.log(error));
    },
    toggleNewMsg: function () {
      this.revele = !this.revele;
    },
  },
};
</script>
