<template>
  <div class="side-bar">
    <div class="side-content">
      <span class="flower">
        <i class="fa fa-thumbs-o-up" v-if="!me.isLogin || !star_state" v-on:click="star"></i>
        <i class="fa fa-thumbs-up" v-if="me.isLogin && !!star_state" v-on:click="unstar"></i>
        {{flowers}}
      </span>
      <span class="reply" v-on:click="scrollToButton">
        <i class="fa fa-comments"></i>
        {{reply}}
      </span>
      <span class="topic-subscribe">
        <i class="fa fa-rss"></i>
        {{subscribe_count}}
      </span>
      <span class="top" v-on:click="scrollToTop">
        <i class="fa fa-arrow-up"></i>{{'  '}}
      </span>
    </div>
    <div class="subscribe" v-if="!is_subscribe" v-on:click="subscribe">关注话题</div>
    <div class="unsubscribe" v-if="is_subscribe" v-on:click="unsubscribe">已关注</div>
    <div id="article-social" class="social"></div>
  </div>
</template>

<script>
  import Login from '../assets/js/LoginMgr'
  import Net from '../assets/js/Net'
  import Config from '../assets/js/Config'
  import Event from '../assets/js/Event'

  export default {
    data() {
      return {
        me: Login,
        flowers: 0,
        star_state: undefined,
        reply: 0,
        is_subscribe: false,
        subscribe_count: 0
      }
    },
    props: {id: '',},
    created() {
      this.init();
      Event.on('login', this.init);
      Event.on('comment-change', this.init)
    },
    watch: {
      id(newId) {
        this.id = newId;
        this.init()
      }
    },
    methods: {
      init() {
        this.getCount();
        this.getReply();
        this.getStarState();
        this.getSubscribe();
      },
      scrollToTop() {
        $('html, body').animate({scrollTop: 0}, 'fast');
      },
      scrollToButton() {
        $('html, body').animate({scrollTop: 100000}, 'fast');
      },

      getStarState() {
        if (!Login.isLogin) {
          this.star_state = undefined;
          return
        }
        Net.get({url: Config.URL.flower.article_star.format(this.id)}, (resp) => this.star_state = resp.has_star)
      },
      getCount() {
        Net.get({
          url: Config.URL.flower.article_count,
          condition: {ids: this.id}
        }, (resp) => this.flowers = resp.data[this.id])
      },
      getReply() {
        Net.get({
          url: Config.URL.reply.count,
          condition: {id: this.id}
        }, (resp) => this.reply = resp.data[this.id])
      },
      getSubscribe() {
        Net.get({
          url: Config.URL.message.subscrib_count,
          condition: {ids: this.id}
        }, (resp) => this.subscribe_count = resp.count[0]);
        if (Login.isLogin) {
          Net.get({
            url: Config.URL.message.subscribe.format(this.id),
          }, (resp) => this.is_subscribe = resp.subscribe);
        } else {
          this.is_subscribe = false
        }
      },
      subscribe() {
        Login.require(() => {
          Net.post({
            url: Config.URL.message.subscribe.format(this.id)
          }, this.getSubscribe)
        });
      },
      unsubscribe() {
        Login.require(() => {
          Net.post({
            url: Config.URL.message.unsubscribe.format(this.id)
          }, this.getSubscribe)
        });
      },
      star() {
        Login.require(() => {
          Net.post({url: Config.URL.flower.article_star.format(this.id)}, () => {
            this.star_state = true;
            this.getCount()
          })
        })
      },
      unstar() {
        Login.require(() => {
          Net.post({url: Config.URL.flower.article_unstar.format(this.id)}, () => {
            this.star_state = false;
            this.getCount()
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .side-bar {
    border: 1px #f1f1f1 solid;
    border-radius: 10px;
    background-color: white;

    .side-content {
      font-size: 18px;
      padding: 20px;

      > span {
        margin-left: 3px;
        margin-right: 3px
      }
      .flower > i {
        cursor: pointer;
      }
      .reply {
        cursor: pointer;
      }
      .top {
        cursor: pointer;
      }
    }

    .subscribe {
      line-height: 38px;
      height: 38px;
      display: block;
      color: white;
      background: #2572e5;
      font-size: 16px;
      border-radius: 2px;
      margin: 0 15px 15px 15px;
      cursor: pointer;
    }
    .unsubscribe {
      line-height: 38px;
      height: 38px;
      display: block;
      color: white;
      background: darkgrey;
      font-size: 16px;
      border-radius: 2px;
      margin: 0 15px 15px 15px;
      cursor: pointer;
    }
    .social {
      cursor: pointer;
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 10px;
      padding-top: 10px;
    }
  }
</style>
