<template>
  <div class="message">
    <ul class="message-list">
      <li v-for="item in message">
        <div v-if="item.type === 0" class="type-to-article" @click="toArticle(item.article.id)">
          <!-- reply to subscribe article -->
          <div class="message-head">
            <span class="username" @click.stop="showUser(item.from)">{{ item.from.username }}</span>
            评论了你关注的文章
            <span class="timestamp" v-if="item.reply">{{ item.reply.create_time | moment}}</span>
          </div>
          <span class="article">{{ item.article.title }}</span>
        </div>

        <div v-if="item.type === 1" class="type-to-reply" @click="toArticle(item.article.id)">
          <!-- reply to comment -->
          <div class="message-head">
            <span class="username" @click.stop="showUser(item.from)">{{ item.from.username }}</span>
            回复了你的评论
            <span class="timestamp" v-if="item.reply">{{ item.reply.create_time | moment}}</span>
          </div>
          <span class="article">{{ item.article.title }}</span><br>
          <br>
        </div>
      </li>
    </ul>
    <button class="more" v-if="hasMore">查看更多</button>
    <div class="load-end" v-if="!hasMore">没有更多的消息了</div>
  </div>
</template>

<script>
  import Net from "../assets/js/Net.js";
  import Config from "../assets/js/Config.js";
  import LoginMgr from '../assets/js/LoginMgr.js';
  import BigJson from '../assets/js/Parse';
  import Event from '../assets/js/Event';

  import DisplayPanels from "./DisplayPanels.vue";
  import AppLayout from '../layout/AppWeb.vue';
  import NameCard from './NameCard.vue';

  export default {
    components: {
      'app-layout': AppLayout,
      'name-card': NameCard
    },
    data () {
      return {
        me: LoginMgr,
        offset: 0,
        hasMore: true,
        message: [],
      }
    },
    created(){
      this.init();
      setInterval(this.init, 10000)
    },
    methods: {
      init() {
        if (this.me.isLogin) {
          this.getMessage(0);
        } else {
          this.message = [];
          this.offset = 0;
          this.hasMore = true;
        }
      },
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
    }
  }
</script>

<style scoped lang="less">
  .message {
    background-color: #fcfcfc;
    color: #999;
    width: auto;
    margin: auto;

    .message-list {
      > li {
        text-align: left;
        background-color: white;
        cursor: pointer;
        height: auto;
        padding: 5px 15px 5px 15px;
        font-size: 12px;
      }
      > li:hover {
        background-color: ghostwhite;
      }
      .message-head {
        width: 100%;
        padding: 5px;
        .username {
          color: #2e8ded;
        }
        .timestamp {
          float: right;
        }
      }
      .article {
        font-size: 15px;
      }
    }
    .more {
      text-align: center;
      height: auto;
    }
    .load-end {
      text-align: center;
      color: #8D8D8D;
      padding: 8px;
      height: auto;
    }
  }

</style>
