<template>
  <div>
    <div>hi,some body</div>
    <ul>
      <li>Article</li>
      <li>Reply</li>
    </ul>
    <ul>
      <li>Article</li>
      <li>Article</li>
    </ul>
  </div>
</template>

<script>
  import LoginMgr from "../assets/js/LoginMgr.js";
  import Config from "../assets/js/Config.js";
  import Avatar from "../components/Avatar.vue";
  export default {
    data() {
      return {
        me: LoginMgr
      }
    },
    components: {
      "app-avatar": Avatar
    }
  }

</script>

<style scoped lang="less">


</style>