<template>
  <app-layout>
    <div class="home-root">
      <home-link-title></home-link-title>
      <topic-bar></topic-bar>
      <div class="content">
        <div class="post">
          <div class="sub-nav">
            <a v-on:click="forward(0)" href="/"
               v-bind:class="{'select': select === 0, 'normal':  select !== 0 }">精品</a>
            <a v-on:click="forward(1)" href="/?category=1"
               v-bind:class="{'select': select === 1, 'normal': select !== 1}">最新发布</a>
            <!--suppress CommaExpressionJS -->
            <a v-for="(category, id) in categories" v-on:click="forward(id + 2)" v-bind:href="'/?category=' + (id + 2)"
               v-bind:class="{
              'select': categories.length >= select - 1 && categories[select -2]===category,
              'normal': categories.length >= select - 1 && categories[select -2]!==category
              }">{{category}}
            </a>
          </div>
          <article-list :requestUrl.sync="articleListUrl"></article-list>
        </div>
        <div class="side">
          <side-bar :showPostBtn="true"></side-bar>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
  import HomeLinkTitle from '../components/HomeLinkTitle.vue';
  import TopicBar from '../components/TopicBar.vue';
  import Config from '../assets/js/Config.js';
  import Net from '../assets/js/Net.js';
  import ArticleList from '../components/ArticleList.vue';
  import SideBar from '../components/SideBar.vue';
  import LoginMgr from '../assets/js/LoginMgr';
  import AppLayout from '../layout/AppWeb.vue';
  import Event from '../assets/js/Event.js';
  import Util from '../assets/js/Util.js';
  import URL from '../assets/js/URL';
  import VueRouter from 'vue-router'

  export default {
    components: {
      'home-link-title': HomeLinkTitle,
      'app-layout': AppLayout,
      'article-list': ArticleList,
      'side-bar': SideBar,
      'topic-bar': TopicBar
    },
    data() {
      return {
        select: 0,
        articleListUrl: '',
        categories: [],
      }
    },
    mounted() {
      Net.get({url: Config.URL.article.category}, (resp) => {
        this.categories = resp.category;
        this.forward();
      });
    },
    methods: {
      forward(tid) {
        let tab = URL.param("category");
        console.log(tab);
        this.select = tid !== undefined ? tid : tab ? tab : 0;
        console.log(this.select);
        if (this.select === 0) {
          this.articleListUrl = Config.URL.article.getFine;
        } else if (this.select === 1) {
          this.articleListUrl = LoginMgr.isAdmin() ? Config.URL.admin.articleList : Config.URL.article.getLatest;
        } else {
          this.articleListUrl = Config.URL.article.getCategory.format(this.select - 1);
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .home-root {
    width: 1120px;
    margin: auto;
  }

  .content {
    display: flex;
    box-sizing: border-box;
    .sub-title {
      text-align: left;
      padding: 24px 16px;
      font-size: 24px;
    }
    .post {
      width: 75%;
      .sub-nav {
        text-align: left;
        > a {
          background: white;
          outline: none;
          border: 0;
          color: #999;
          display: inline-block;
          font-size: 18px;
          padding: 0 16px;
          line-height: 45px;
          height: 45px;
        }
        .select {
          border-bottom: 4px #2572e5 solid;
          color: #2572e5;
        }
        .normal {
          border-bottom: 4px white solid;
          color: #999;
        }
      }
      > button:hover {
        color: #2572e5;
      }
    }
    .side {
      width: 25%;
      padding-left: 30px;
      padding-top: 20px;
    }
    .page {
      > div {
        display: inline-block;
        padding: 16px;
      }
    }
  }
</style>
