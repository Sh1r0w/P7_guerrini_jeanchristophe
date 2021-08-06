<template>
  <div class="MessageHome">
    <h1 >{{ msg }}</h1>
    <button @click="toggleNewMsg" class="m-2 btn btn-success">
      Nouveau Message
    </button>

    <div class="selectMsg d-flex flex-column">
      <div class="col-lg-5 col-sm-12 container">
        <h2>Message Recents</h2>
            <div @click.prevent="selectOne(post.id)" id="msgCard" class="card p-3 m-4" v-for="post in posts" v-bind:key="post.id">
              <div class="d-flex p-2"><h2>{{ post.title }}</h2> </div>
              <div class="d-flex text-muted p-2">{{ post.createdAt }}</div>
              <img :src="post.imgUrl" :alt="post.title" class="shadow" loading="lazy">

            </div>
      </div>
      <br />
    </div>
    <newMessage
      v-bind:revele="revele"
      v-bind:toggleNewMsg="toggleNewMsg"
    ></newMessage>
    <readMessage v-bind:revele="toggleReadMsg" v-bind:selectOne="selectOne">
      
    </readMessage>
    <accountBox></accountBox>
  </div>
</template>

<script>
import newMsg from "@/components/postMsg.vue";
import boxAcc from "@/components/boxAccount.vue";
import readMsg from "@/components/readMessage.vue";

const axios = require("axios").default;
export default {
  name: "Post",
  components: {
    newMessage: newMsg,
    accountBox: boxAcc,
    readMessage: readMsg,
  },

  beforeCreate() {
    (axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.token}`)
    axios.get("http://localhost:3000/user")
    .then((reponse) =>
            this.$store.commit("GET_USER", reponse.data) & console.log('commit ok Message'))
    .catch((error) => console.log(error))
  },
  created() {
    axios
      .get("http://localhost:3000/message")
      .then((reponse) => (this.posts = reponse.data))
      .catch((error) => console.log(error))
      
  },
  

  props: {
    msg: String,
  },

  data() {
    return {
      posts: [],
      revele: false,
      toggleReadMsg: false,
      userEncrypted: [],
    };
  },
  methods: {
    selectOne: function(id) {
      axios.get('http://localhost:3000/message/' + id)
    .then((reponse) => this.$store.commit("GET_MSGID", reponse.data) & (this.toggleReadMsg = !this.toggleReadMsg))
      
    },

    toggleNewMsg: function () {
      this.revele = !this.revele;
    },
  },
};
</script>

<style scoped>

#msgCard{
  cursor: pointer;
}
</style>