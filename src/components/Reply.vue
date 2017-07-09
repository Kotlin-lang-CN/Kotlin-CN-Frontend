<template>
  <div class="reply">
    <header>共收到{{ replyCount }}条评论</header>
    <reply-list :articleId="articleId"></reply-list>
    <header>回帖</header>
    <markdown-comment :articleId="articleId"></markdown-comment>
  </div>
</template>
<script>
  import Comment from "./Comment.vue";
  import ReplyList from './ReplyList.vue';

  import Event from "../assets/js/Event.js";
  import Net from "../assets/js/Net.js";
  import Util from "../assets/js/Util.js";
  import Config from '../assets/js/Config.js';

  export default {
    data() {
      return {
        content: '',
        replyCount: 0,
      }
    },
    props: {
      articleId: ''
    },
    components: {
      'reply-list': ReplyList,
      'markdown-comment': Comment
    },
    created() {
      this.getReplyCount();
      Event.on('comment-change', () => this.getReplyCount());
      Event.on('login', () => {
        if (this.isAdminRole) this.getReplyCount();
      });
    },
    methods: {
      getReplyCount(){
        Net.get({
          url: Config.URL.reply.count,
          condition: {
            id: this.articleId
          }
        }, (resp) => {
          this.replyCount = resp.data[this.articleId];
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .reply {
    text-align: left;
    margin-top: 30px;
    border-top: 1px #f1f1f1 solid;
    header {
      font-size: 14px;
      color: #999;
      margin-top: 30px;
      margin-bottom: 20px;
    }
    header:nth-child(2) {
      margin-top: 44px;
    }
  }
</style>
