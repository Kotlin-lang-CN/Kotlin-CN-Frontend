<template>
  <div class="dialog" v-if="show">
    <div class="bg" v-on:click="doCancel"></div>
    <div class="dialog-content">
      <div class="content">
        <section class="user-base">
          <img class="logo" v-bind:src="logo" width="100" height="100"/>
          <h2>{{user.username}}</h2>
          <p><a :href="'mailto:'+user.email"><i class="fa fa-envelope" aria-hidden="true"></i></a>
            文章 {{articleCount}}, 回帖 {{replyCount}}
          </p>
        </section>
        <section class="active-info">
          <p>
            <strong>Blog: </strong>
            <i v-if="!profile.blog || profile.blog === ''">未公开</i>
            <a class="user-link" v-if="profile.blog && profile.blog !== ''" v-bind:href="profile.blog">{{ profile.blog
              }}</a>
          </p>
          <p>
            <strong>公司: </strong>
            <i v-if="!profile.company || profile.company === ''">未公开</i>
            <span v-if="profile.company && profile.company !== ''">{{ profile.company }}</span>
          </p>
          <p>
            <strong>教育: </strong>
            <i v-if="!profile.education || profile.education === ''">未公开</i>
            <span v-if="profile.education && profile.education !== ''">{{ profile.education }}</span>
          </p>
          <p>
            <strong>GitHub: </strong>
            <i v-if="!profile.github || profile.github === ''">未公开</i>
            <a class="user-link" v-if="profile.github && profile.github !== ''" v-bind:href="profile.github">
              {{ profile.github}}
            </a>
          </p>
          <p>
            <strong>地址: </strong>
            <i v-if="!profile.location || profile.location === ''">未公开</i>
            <span v-if="profile.location && profile.location !== ''">{{ profile.location }}</span>
          </p>
          <p>
            <strong>个人简介:</strong><br>
          </p>
          <p>
            <i v-if="!profile.description || profile.description === ''">没什么好说的...</i>
            <span v-if="profile.description && profile.description !== ''">{{ profile.description }}</span>
          </p>
          <a v-if="me.info().uid === user.uid" :href="userUrl + '/' + user.uid"><i class="fa fa-edit"></i></a>
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
  import md5 from 'md5';
  import UserBaseInfo from '../components/UserBaseInfo.vue';

  export default {
    components: {
      'user-base-info': UserBaseInfo
    },
    data() {
      return {
        show: false,
        me: LoginMgr,
        userUrl: Config.UI.user,
        user: {uid: '', logo: '', email: '', username: ''},
        articleCount: 0,
        replyCount: 0,
        profile: {
          blog: '',
          company: '',
          description: '',
          education: '',
          gender: 0,
          github: '',
          location: '',
        }
      }
    },
    created() {
      Event.on('name-card', (user) => {
        this.user = user;
        this.show = true;
        this.async();
      });
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
        });
        Net.get({
          url: Config.URL.account.profile,
          condition: {id: this.user.uid}
        }, (resp) => this.profile = resp.profile[0]);
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
    margin-left: calc(50% - 300px);
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
      width: 600px;
      margin-top: 200px;
      padding: 40px;
      box-sizing: border-box;
      background: white;
      color: #666;
      border: 1px #f1f1f1 solid;
      box-shadow: 0 0 3px #2572e5;

      .content {
        display: flex;

        .user-base {
          width: 180px;
          border-right: 1px #eee solid;

          .logo {
            width: 100px;
            height: 100px;
            margin-right: 120px;
          }
        }

        .active-info {
          margin-top: -10px;
          margin-left: 20px;
          width: 100%;
          i {
            text-align: right;
            width: 100%;
          }
          .user-link {
            color: #2b75e1;
          }
        }
        span {
          padding-bottom: 5px;
        }
      }

    }
  }
</style>
