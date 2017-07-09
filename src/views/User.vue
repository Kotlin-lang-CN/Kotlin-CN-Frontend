<template>
  <app-layout>
    <div class="user-root">
      <user-base-info :uid="uid"></user-base-info>
      <ul class="user-nav">
        <li :class="{'select': navigation===nav_article }" v-on:click="navigation=nav_article">热门文章</li>
        <li :class="{'select': navigation===nav_reply }" v-on:click="navigation=nav_reply">最近回复</li>
        <li :class="{'select': navigation===nav_notify }" v-on:click="navigation=nav_notify">新消息提醒</li>
      </ul>
      <user-article :requestUrl="articleListUrl" :class="{'hide':navigation!==nav_article}"></user-article>
      <user-reply :requestUrl="replyListUrl" :class="{'hide':navigation!==nav_reply}"></user-reply>
      <div :class="{'hide':navigation!==nav_notify}" class="notify">没有新消息提醒</div>
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from '../layout/AppWeb.vue';
  import Avatar from '../components/Avatar.vue';
  import UserArticle from '../components/ArticleList.vue';
  import UserReply from '../components/ReplyList.vue';
  import UserBaseInfo from '../components/UserBaseInfo.vue';

  import LoginMgr from '../assets/js/LoginMgr.js';
  import Event from '../assets/js/Event.js';
  import Config from '../assets/js/Config.js';
  import Net from '../assets/js/Net.js';
  import md5 from 'md5'

  export default {
    components: {
      'app-layout': AppLayout,
      'app-avatar': Avatar,
      'user-article': UserArticle,
      'user-reply': UserReply,
      'user-base-info': UserBaseInfo
    },
    data() {
      return {
        articleListUrl: Config.URL.creator.article,
        replyListUrl: Config.URL.creator.reply,
        uid: this.$root.params.uid,
        navigation: 'article',
        nav_article: 'article',
        nav_reply: 'reply',
        nav_notify: 'notify'
      }
    },
    created(){
      if (LoginMgr.info().uid !== this.uid) {
        window.location.href = "/404";
      }
      Event.on('login', (isLogin) => {
        if (!isLogin) window.location.href = "/";
      });
    }
  }
</script>

<style scoped lang="less">
  .user-root {
    width: 1120px;
    margin: auto;

    .user-nav {
      color: #888;
      position: relative;
      display: block;
      list-style: none;
      height: 40px;
      margin-top: 32px;
      margin-bottom: 1px;
      line-height: 40px;
      padding: 0;
      width: auto;

      .select {
        color: #333;
      }
      li {
        float: left;
        width: 100px;
        height: 40px;
        border: 1px solid #f1f1f1;
        position: relative;
        background-color: #f9fafa;
        cursor: pointer;
      }
      li:hover {
        color: #333;
      }
    }
    .hide {
      display: none;
    }
    .notify {
      padding-top: 20px;
      line-height: 60px;
      border-top: 1px #f1f1f1 solid;
      font-size: 12px;
      color: #999;
    }
  }
</style>