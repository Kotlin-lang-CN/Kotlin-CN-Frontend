<template>
  <app-layout>
    <div class="message">
      <ul>
        <li v-for="item in message">
          <div v-if="item.type === 0" class="type-to-article" @click="toArticle(item.article.id)">
            <!-- reply to subscribe article -->
            <span class="username" @click.stop="showUser(item.from)">{{ item.from.username }}</span>
            评论了你的文章
            <span class="article">{{ item.article.title }}</span>
            <span class="timestamp right">{{ item.create_time | moment}}</span>
          </div>

          <div v-if="item.type === 1" class="type-to-reply" @click="toArticle(item.article.id)">
            <!-- reply to comment -->
            <span class="username" @click.stop="showUser(item.from)">{{ item.from.username }}</span>
            在文章
            <span class="article">{{ item.article.title }}</span>
            下回复了你的评论
            <span class="timestamp right">{{ item.create_time | moment}}</span>
          </div>
        </li>
      </ul>
      <button class="more" v-on:click="loadMore" v-if="hasMore">加载更多</button>
      <div class="load-end" v-if="!hasMore">没有更多的消息了</div>
    </div>
  </app-layout>
</template>

<script>
  import Net from "../assets/js/Net.js";
  import Config from "../assets/js/Config.js";
  import LoginMgr from '../assets/js/LoginMgr.js';
  import BigJson from '../assets/js/Parse';
  import Event from '../assets/js/Event';

  import DisplayPanels from "../components/DisplayPanels.vue";
  import AppLayout from '../layout/AppWeb.vue';
  import NameCard from '../components/NameCard.vue';

  export default {
    components: {
      'app-layout': AppLayout,
      'name-card': NameCard
    },
    data () {
      return {
        me: LoginMgr,
        content: '',
        offset: 0,
        hasMore: true,
        message: [],
      }
    },
    created(){
      this.getMessage(0);
    },
    methods: {
      toArticle(aid) {
        window.location.href = Config.UI.post + '/' + aid
      },
      showUser(user) {
        Event.emit('name-card', user)
      },
      getMessage(index){
        const limit = 20;
        Net.get({
          url: Config.URL.message.latest,
          condition: {offset: index, limit: limit}
        }, (resp) => {
          const list = [];
          resp.message.forEach((msg) => {
            const inner = BigJson.parse(msg.content);
            if (msg.type === 0 || msg.type === 1) {
              window.console.log(msg);
              msg.from = inner.from;
              msg.article = inner.article;
              msg.reply = inner.reply;
              msg.content = inner.content;
              list.push(msg);
            }
          });
          this.offset = resp.next_offset;
          this.hasMore = list.length >= limit;
          if (index === 0) this.message = [];
          this.message = this.message.concat(list);
        })
      },
      loadMore(){
        this.getMessage(this.offset);
      }
    }
  }
</script>

<style scoped lang="less">
  .message {
    background-color: #fcfcfc;
    color: #999;
    width: 1120px;
    margin: auto;

    .more {
      text-align: center;
      height: auto;
    }

    .load-end {
      text-align: center;
      color: #8D8D8D;
      padding: 15px;
      height: auto;
    }
  }

</style>
