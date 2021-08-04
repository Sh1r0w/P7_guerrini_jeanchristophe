<template>
    <div class="container" v-if="revele" id="readingMessage" >
        <div class="card" >
            <div class="back" ></div>
            <div class="overlay" v-on:click="selectOne"> </div>
                <div class="card">
            <h2>ok {{ $store.state.msgId.title }}</h2>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "readMsg",
    props: ["revele", "selectOne"],

    data() {
        return {
            message: [],
        }
    },
}
</script>

<style scoped>

#readingMessage {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

}
.overlay {
position: fixed;
  background-color: rgba(241,241,241, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>