<template>
  <div class="dialog" v-if="show">
    <div class="bg" v-on:click="doCancel"></div>
    <div class="dialog-content">
      <div class="content">
        <section>
          <img class="logo" v-bind:src="logo" style="width:150px;height:150px;" width="150" height="150"/>
          <h2>{{user.username}} <a :href="'mailto:'+user.email"><i
            class="email"></i></a></h2>
        </section>
        <section class="active-info">
          <a v-if="me.info().uid === user.uid" :href="userUrl + '/' + user.uid">
            <i class="fa fa-edit"></i>
          </a>
          <p>文章数：{{articleCount}}</p>
          <p>回帖数：{{replyCount}}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginMgr from '../assets/js/LoginMgr.js';
  import Config from '../assets/js/Config.js';
  import Event from '../assets/js/Event';
  import Net from "../assets/js/Net.js";
  import md5 from 'md5'

  export default {
    data() {
      return {
        show: false,
        me: LoginMgr,
        userUrl: Config.UI.user,
        user: {uid: '', logo: '', email: '', username: ''},
        articleCount: 0,
        replyCount: 0
      }
    },
    created() {
      Event.on('name-card', (user) => {
        this.user = user;
        this.show = true;
        this.async();
      })
    },
    methods: {
      doCancel() {
        this.show = false
      },
      async(){
        Net.get({
          url: Config.URL.creator.article_count,
          condition: {id: this.user.uid}
        }, (resp) => {
          this.articleCount = resp.result[this.user.uid];
        });
        Net.get({
          url: Config.URL.creator.reply_count,
          condition: {id: this.user.uid}
        }, (resp) => {
          this.replyCount = resp.result[this.user.uid];
        })
      }
    },
    computed: {
      logo() {
        if (this.user.logo === '' && this.user.email !== '') {
          return 'https://s.gravatar.com/avatar/' + md5(this.user.email)
        } else {
          return this.user.logo
        }
      }
    }
  }
</script>

<style scoped>
  .dialog .dialog-content {
    margin-left: calc(50% - 200px);
  }
</style>

<style scoped lang="less">
  .dialog {
    position: fixed;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .bg {
      position: absolute;
      background: #000000;
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      opacity: 0.5;
      width: 100%;
      height: 100%;
    }

    .dialog-content {
      position: absolute;
      width: 400px;
      margin-top: 200px;
      padding: 40px;
      box-sizing: border-box;
      background: white;
      color: #666;
      border: 1px #f1f1f1 solid;
      box-shadow: 0 0 3px #2572e5;

      .content {
        display: flex;
      }

      .active-info {
        margin-left: 20px;
        width: 100%;
        i {
          text-align: right;
          width: 100%;
        }
      }

      i.email {
        display: inline-block;
        width: 30px;
        height: 25px;
        vertical-align: top;
        margin-top: 3px;
        background: url(../assets/img/email.png) no-repeat;
      }
      span {
        padding-bottom: 5px;
      }
    }
  }
</style>
